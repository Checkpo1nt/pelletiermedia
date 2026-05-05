"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers3 } from "lucide-react";
import { HeroNodeGraph } from "@/components/HeroNodeGraph";
import { Reveal } from "@/components/Reveal";
import { buttonPress } from "@/lib/animations";

export function Hero() {
  return (
    <section id="top" className="container-shell grid gap-10 pb-20 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-28 lg:pt-20">
      <div>
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/75 bg-white/50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-electric shadow-inset">
            <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
            Independent Automation Operator & Builder
          </p>
        </Reveal>
        <Reveal className="mb-5">
          <p className="headline text-3xl leading-none text-ink/90 sm:text-4xl">
            Gavin Pelletier
          </p>
        </Reveal>
        <Reveal as="h1" className="headline max-w-4xl text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
          Automation systems for people who move faster than their operations.
        </Reveal>
        <Reveal className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          I use OpenClaw to connect agents, tools, workflows, data, and decision logic into systems that remove manual work, route decisions, and push execution forward.
        </Reveal>
        <Reveal className="mt-8 flex flex-wrap gap-3">
          <motion.a
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-blue-electric px-5 py-3 text-sm font-semibold text-white shadow-blue transition-colors hover:bg-ink"
            href="#systems"
            whileTap={buttonPress}
          >
            View Systems
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </motion.a>
          <motion.a
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/64 px-5 py-3 text-sm font-semibold text-ink shadow-tactile transition-colors hover:text-blue-electric"
            href="#openclaw"
            whileTap={buttonPress}
          >
            See OpenClaw
          </motion.a>
        </Reveal>
      </div>
      <HeroNodeGraph />
    </section>
  );
}
