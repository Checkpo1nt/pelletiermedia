// Lightweight interactions: first-load intro, menu toggle, reveal-on-scroll,
// typing loop, and subtle terminal/node motion.
document.documentElement.classList.add('js');

const nav = document.querySelector('.top-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const yearEl = document.getElementById('year');
const reveals = document.querySelectorAll('.reveal');
const typedLine = document.querySelector('.typed-line');
const nodes = document.querySelectorAll('.node');
const heroVisual = document.querySelector('.hero-visual');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobileViewport = window.matchMedia('(max-width: 980px)');

const initWaterCursor = () => {
  const supportsFinePointer =
    window.matchMedia('(pointer:fine)').matches || window.matchMedia('(any-pointer:fine)').matches;
  const supportsHover =
    window.matchMedia('(hover:hover)').matches || window.matchMedia('(any-hover:hover)').matches;
  if (!(supportsFinePointer && supportsHover)) return;

  const wrap = document.createElement('div');
  wrap.className = 'water-cursor-wrap';
  const cursor = document.createElement('div');
  cursor.className = 'water-cursor';
  cursor.innerHTML = `
    <div class="water-cursor-refract-bands"></div>
    <div class="water-cursor-top-meniscus"></div>
    <div class="water-cursor-inner-clear"></div>
    <div class="water-cursor-inner-ring"></div>
  `;
  const rippleLayer = document.createElement('div');
  rippleLayer.className = 'water-cursor-ripple-layer';

  wrap.appendChild(cursor);
  document.body.appendChild(wrap);
  document.body.appendChild(rippleLayer);

  const html = document.documentElement;
  const body = document.body;
  const previousHtmlCursor = html.style.cursor;
  const previousBodyCursor = body.style.cursor;
  html.style.cursor = 'none';
  body.style.cursor = 'none';

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let x = mouseX;
  let y = mouseY;
  let prevX = x;
  let prevY = y;

  let hovering = false;
  let pressed = false;
  let raf = 0;

  let currentAngle = 0;
  let currentScaleX = 1;
  let currentScaleY = 1;
  let currentSkew = 0;

  const baseSize = 46;
  const hoverSize = 66;
  const spring = 0.18;
  const hoverSelector =
    "a, button, [data-cursor-hover], input, textarea, select, [role='button'], .project-card, .system-card, .meter-item, .repo-tile, .timeline-row, .signal-card";

  const lerp = (a, b, t) => a + (b - a) * t;

  const createRipple = (rx, ry) => {
    const ripple = document.createElement('div');
    ripple.className = 'water-cursor-ripple';
    ripple.style.left = `${rx}px`;
    ripple.style.top = `${ry}px`;
    rippleLayer.appendChild(ripple);
    ripple.addEventListener(
      'animationend',
      () => {
        ripple.remove();
      },
      { once: true }
    );
  };

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const onMouseDown = (e) => {
    pressed = true;
    createRipple(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    pressed = false;
  };

  const onMouseLeaveWindow = () => {
    wrap.style.opacity = '0';
  };

  const onMouseEnterWindow = () => {
    wrap.style.opacity = '1';
  };

  let cleanupHoverListeners = null;

  const attachHoverListeners = () => {
    if (cleanupHoverListeners) cleanupHoverListeners();

    const targets = Array.from(document.querySelectorAll(hoverSelector));

    const enter = () => {
      hovering = true;
      cursor.classList.add('is-hovering');
    };

    const leave = () => {
      hovering = false;
      cursor.classList.remove('is-hovering');
    };

    targets.forEach((el) => {
      el.style.cursor = 'none';
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    cleanupHoverListeners = () => {
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  };

  attachHoverListeners();

  const animate = () => {
    x = lerp(x, mouseX, spring);
    y = lerp(y, mouseY, spring);

    const vx = x - prevX;
    const vy = y - prevY;
    const speed = Math.min(Math.hypot(vx, vy), 30);

    const targetAngle = (Math.atan2(vy, vx) * 180) / Math.PI;
    currentAngle = lerp(currentAngle, targetAngle, 0.16);

    const targetScaleX = 1 + speed * 0.022;
    const targetScaleY = Math.max(0.78, 1 - speed * 0.012);
    currentScaleX = lerp(currentScaleX, targetScaleX, 0.13);
    currentScaleY = lerp(currentScaleY, targetScaleY, 0.13);

    const motionSkewTarget = Math.max(-7, Math.min(7, vx * 0.35));
    currentSkew = lerp(currentSkew, motionSkewTarget, 0.14);

    const size = hovering ? hoverSize : baseSize;
    const pressScale = pressed ? 0.95 : 1;

    wrap.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
    cursor.style.transform = `rotate(${currentAngle}deg) scale(${currentScaleX * pressScale}, ${currentScaleY * pressScale})`;

    const refractAlpha = Math.min(0.18, 0.07 + speed * 0.0042);
    const edgeAlpha = Math.min(0.28, 0.16 + speed * 0.0035);
    const ringAlpha = Math.min(0.22, 0.11 + speed * 0.0026);
    const shellAlpha = Math.min(0.16, 0.07 + speed * 0.0028);
    const meniscusAlpha = Math.min(0.16, 0.08 + speed * 0.0028);

    cursor.style.setProperty('--refract-alpha', refractAlpha.toFixed(3));
    cursor.style.setProperty('--edge-alpha', edgeAlpha.toFixed(3));
    cursor.style.setProperty('--ring-alpha', ringAlpha.toFixed(3));
    cursor.style.setProperty('--shell-alpha', shellAlpha.toFixed(3));
    cursor.style.setProperty('--meniscus-alpha', meniscusAlpha.toFixed(3));
    cursor.style.setProperty('--motion-skew', `${currentSkew.toFixed(2)}deg`);

    const topFocus = Math.max(12, Math.min(24, 16 - vy * 0.22));
    cursor.style.setProperty('--top-focus', `${topFocus}%`);

    prevX = x;
    prevY = y;
    raf = window.requestAnimationFrame(animate);
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('mouseleave', onMouseLeaveWindow);
  window.addEventListener('mouseenter', onMouseEnterWindow);
  raf = window.requestAnimationFrame(animate);

  const observer = new MutationObserver(() => {
    attachHoverListeners();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener(
    'beforeunload',
    () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      if (cleanupHoverListeners) cleanupHoverListeners();
      html.style.cursor = previousHtmlCursor;
      body.style.cursor = previousBodyCursor;
    },
    { once: true }
  );
};

initWaterCursor();

window.addEventListener('load', () => {
  window.requestAnimationFrame(() => {
    document.body.classList.add('is-ready');
  });
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const closeNavMenu = () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  window.addEventListener('resize', closeNavMenu);
  window.addEventListener('orientationchange', closeNavMenu);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.14,
    }
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

if (typedLine) {
  const lines = JSON.parse(typedLine.dataset.lines || '[]');
  let lineIndex = 0;
  let charIndex = 0;
  let erasing = false;

  const tick = () => {
    if (!lines.length) return;

    const current = lines[lineIndex];

    if (!erasing) {
      typedLine.textContent = current.slice(0, charIndex + 1);
      charIndex += 1;

      if (charIndex === current.length) {
        erasing = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      typedLine.textContent = current.slice(0, charIndex - 1);
      charIndex -= 1;

      if (charIndex === 0) {
        erasing = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }

    setTimeout(tick, erasing ? 18 : 32);
  };

  tick();
}

if (nodes.length && !prefersReducedMotion) {
  setInterval(() => {
    nodes.forEach((node) => node.classList.remove('active'));

    const randomIndex = Math.floor(Math.random() * nodes.length);
    const siblingIndex = (randomIndex + 1) % nodes.length;

    nodes[randomIndex].classList.add('active');
    nodes[siblingIndex].classList.add('active');
  }, 1150);
}

const heatCells = document.querySelectorAll('.heatmap-cell');
if (heatCells.length && !prefersReducedMotion) {
  let glowCursor = 0;
  setInterval(() => {
    heatCells.forEach((cell) => cell.classList.remove('is-glow'));
    for (let i = 0; i < 3; i += 1) {
      heatCells[(glowCursor + i) % heatCells.length].classList.add('is-glow');
    }
    glowCursor = (glowCursor + 1) % heatCells.length;
  }, 180);
}

if (window.gsap && !prefersReducedMotion && !mobileViewport.matches) {
  const gsap = window.gsap;

  const setAgentState = (chip, state, label) => {
    chip.dataset.state = state;
    chip.textContent = label;
  };

  const agentRows = gsap.utils.toArray('.ai-demo .agent-row');
  agentRows.forEach((row, idx) => {
    const chip = row.querySelector('.status-value');
    const fill = row.querySelector('.progress-fill');
    if (!chip || !fill) return;

    const tl = gsap.timeline({ repeat: -1, delay: idx * 0.4 });
    tl.set(fill, { width: '0%' })
      .call(() => setAgentState(chip, 'queued', 'Queued'))
      .to({}, { duration: 0.35 })
      .call(() => setAgentState(chip, 'running', 'Running'))
      .to(fill, { width: '76%', duration: 1.25, ease: 'power2.out' })
      .to(fill, { width: '100%', duration: 0.78, ease: 'power1.inOut' })
      .call(() => setAgentState(chip, 'done', 'Done'))
      .to({}, { duration: 0.95 });
  });

  const flowDot = document.querySelector('.flow-dot');
  if (flowDot) {
    gsap.set(flowDot, { x: 0, opacity: 0 });
    gsap.timeline({ repeat: -1 })
      .to(flowDot, { opacity: 1, duration: 0.15 })
      .to(flowDot, { x: 265, duration: 1.7, ease: 'power1.inOut' })
      .to('.pipeline-node.n5', { opacity: 0.32, duration: 0.5 }, '<')
      .to(flowDot, { x: 545, duration: 1.4, ease: 'power1.inOut' })
      .to('.pipeline-node.n4, .pipeline-node.n6', { borderColor: '#caa1a1', duration: 0.35 }, '<')
      .to(flowDot, { opacity: 0, duration: 0.2 })
      .to('.pipeline-node.n4, .pipeline-node.n6', { borderColor: '#d2d9e7', duration: 0.35 }, '<')
      .to('.pipeline-node.n5', { opacity: 0.54, duration: 0.4 }, '<');
  }

  const logStreams = gsap.utils.toArray('.log-stream');
  logStreams.forEach((stream) => {
    const track = stream.querySelector('.log-stream-track');
    if (!track) return;

    const clone = track.cloneNode(true);
    clone.classList.add('log-stream-track-clone');
    stream.appendChild(clone);

    const trackHeight = track.offsetHeight;
    gsap.set(track, { y: 0 });
    gsap.set(clone, { y: trackHeight });

    gsap.to([track, clone], {
      y: `-=${trackHeight}`,
      duration: 8.2,
      ease: 'none',
      repeat: -1,
    });
  });

  gsap.to('.mini-chart span', {
    scaleY: 1.14,
    transformOrigin: '50% 100%',
    duration: 0.85,
    yoyo: true,
    repeat: -1,
    stagger: 0.12,
    ease: 'sine.inOut',
  });

  gsap.timeline({ repeat: -1 })
    .to('.metric-card.alerting', { borderColor: '#d7a3a3', boxShadow: '0 0 0 1px rgba(196, 61, 61, 0.18), 0 0 14px rgba(196, 61, 61, 0.2)', duration: 0.5 })
    .to('.metric-card.alerting', { borderColor: '#dce2ed', boxShadow: 'none', duration: 0.6 })
    .to({}, { duration: 1.1 });

  const actionCounters = gsap.utils.toArray('.action-counter');
  if (actionCounters.length) {
    let value = 48;
    gsap.timeline({ repeat: -1 })
      .call(() => {
        value = value >= 56 ? 48 : value + 1;
        actionCounters.forEach((counter) => {
          counter.textContent = String(value);
        });
      })
      .to({}, { duration: 1.35 });
  }

  const opsDemos = gsap.utils.toArray('.ops-demo');
  opsDemos.forEach((demo) => {
    const opsStatuses = demo.querySelectorAll('.ops-status');
    const opsTracks = demo.querySelectorAll('.ops-track');
    const opsCard = demo.querySelector('.ops-card');
    const labels = demo.querySelectorAll('.ops-columns span');
    if (!opsCard || labels.length < 4 || !opsStatuses.length || !opsTracks.length) return;

    const labelRects = Array.from(labels).map((label) => ({
      left: label.offsetLeft,
      width: label.offsetWidth,
    }));
    const baseLeft = labelRects[0].left;
    const xPositions = labelRects.map((rect) => rect.left - baseLeft);

    gsap.set(opsCard, { width: labelRects[0].width, x: xPositions[0] });

    const stages = [
      { text: 'Stage: Inbox received', color: '#5f6878', active: 1, x: xPositions[0] },
      { text: 'Stage: Enriched', color: '#2b4f7d', active: 2, x: xPositions[1] },
      { text: 'Stage: Validated', color: '#7c5a2e', active: 3, x: xPositions[2] },
      { text: 'Stage: Ready to send', color: '#2f724c', active: 4, x: xPositions[3] },
    ];

    const applyOpsStage = (stage) => {
      opsStatuses.forEach((status) => {
        status.textContent = stage.text;
        status.style.color = stage.color;
      });
      opsTracks.forEach((track) => {
        const dots = track.querySelectorAll('.stage-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i < stage.active);
        });
      });
    };

    const opsTl = gsap.timeline({ repeat: -1 });
    stages.forEach((stage, i) => {
      opsTl.call(() => applyOpsStage(stage))
        .to(opsCard, { x: stage.x, duration: 0.78, ease: 'power2.inOut' })
        .to({}, { duration: i === stages.length - 1 ? 0.9 : 0.45 });
    });
    opsTl.to(opsCard, { x: xPositions[0], duration: 0.78, ease: 'power2.inOut' });
  });

  gsap.to('.openclaw-visual .oc-node.route', {
    y: -3,
    duration: 2.6,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });

  gsap.to('.openclaw-visual .oc-sidepanel', {
    y: 2,
    duration: 3.2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });

  gsap.to('.smoke-visual .wood-stack span', {
    x: 2,
    duration: 3.4,
    yoyo: true,
    repeat: -1,
    stagger: 0.2,
    ease: 'sine.inOut',
  });

  gsap.to('.smoke-visual .heat-pill', {
    opacity: 0.75,
    duration: 1.6,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });

  gsap.to('.labs-visual .lab-ticket', {
    y: -2,
    duration: 2.5,
    yoyo: true,
    repeat: -1,
    stagger: 0.18,
    ease: 'sine.inOut',
  });
}

if (
  heroVisual &&
  !prefersReducedMotion &&
  !mobileViewport.matches &&
  window.matchMedia('(pointer:fine)').matches
) {
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;

    heroVisual.style.transform = `translate3d(${x * -1}px, ${y * -1}px, 0)`;
  });
}
