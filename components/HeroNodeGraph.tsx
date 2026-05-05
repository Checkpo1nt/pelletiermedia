"use client";

import { motion } from "framer-motion";
import { Cpu, Database, GitBranch, Workflow } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { calmEase, revealVariants, staggerContainer } from "@/lib/animations";

const systemNodes = [
  { label: "Agents", x: "50%", y: "14%" },
  { label: "Tools", x: "79%", y: "26%" },
  { label: "Memory", x: "83%", y: "58%" },
  { label: "Workflows", x: "62%", y: "80%" },
  { label: "Leads", x: "31%", y: "79%" },
  { label: "Sourcing", x: "13%", y: "58%" },
  { label: "Reports", x: "17%", y: "27%" },
  { label: "Execution", x: "50%", y: "53%" },
];

const surroundingLabels = [
  { label: "Ideas", x: "8%", y: "12%" },
  { label: "Tasks", x: "82%", y: "10%" },
  { label: "Leads", x: "5%", y: "82%" },
  { label: "Vendors", x: "83%", y: "85%" },
  { label: "Margins", x: "2%", y: "48%" },
  { label: "Reports", x: "86%", y: "45%" },
  { label: "Follow-Ups", x: "34%", y: "92%" },
  { label: "Decisions", x: "34%", y: "2%" },
];

export function HeroNodeGraph() {
  return (
    <Reveal className="relative min-h-[440px] overflow-hidden rounded-[2rem] p-5 tactile lg:min-h-[560px]">
      <div className="absolute inset-5 rounded-[1.5rem] inset-panel" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 600"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5aa7ff" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="190" fill="none" stroke="#dbe4f2" strokeWidth="1" />
        <circle cx="300" cy="300" r="132" fill="none" stroke="#cbd9ef" strokeWidth="1" strokeDasharray="7 10" />
        <circle cx="300" cy="300" r="96" fill="url(#hubGlow)" />
        {systemNodes.map((node) => {
          const x = parseFloat(node.x) * 6;
          const y = parseFloat(node.y) * 6;
          return (
            <motion.line
              key={node.label}
              x1="300"
              y1="300"
              x2={x}
              y2={y}
              stroke="#2563eb"
              strokeOpacity="0.28"
              strokeWidth="1.3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: calmEase }}
            />
          );
        })}
      </svg>

      <div className="absolute left-7 top-7 rounded-2xl border border-white/70 bg-white/54 px-3 py-2 text-xs font-semibold text-muted shadow-sm backdrop-blur">
        messy inputs
      </div>
      <div className="absolute bottom-7 right-7 rounded-2xl border border-white/70 bg-white/54 px-3 py-2 text-xs font-semibold text-muted shadow-sm backdrop-blur">
        clean execution
      </div>

      {surroundingLabels.map((item) => (
        <span
          key={item.label}
          className="absolute rounded-full border border-white/70 bg-white/45 px-2.5 py-1 text-[11px] font-semibold text-muted shadow-sm backdrop-blur"
          style={{ left: item.x, top: item.y }}
        >
          {item.label}
        </span>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-white/80 bg-[linear-gradient(145deg,#ffffff,#dfeaff)] text-center shadow-[0_26px_60px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-18px_35px_rgba(37,99,235,0.09)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={revealVariants}
      >
        <GitBranch className="mb-2 h-6 w-6 text-blue-electric" aria-hidden="true" />
        <strong className="headline text-2xl text-ink">OpenClaw</strong>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-electric">
          leverage hub
        </span>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {systemNodes.map((node, index) => {
          const Icon = index % 4 === 0 ? Cpu : index % 4 === 1 ? Workflow : index % 4 === 2 ? Database : GitBranch;
          return (
            <motion.div
              key={node.label}
              variants={revealVariants}
              className="absolute flex min-w-28 items-center gap-2 rounded-2xl border border-white/75 bg-[#f8f7f2] px-3 py-2 text-sm font-semibold text-ink shadow-tactile"
              style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
            >
              <Icon className="h-4 w-4 text-blue-electric" aria-hidden="true" />
              {node.label}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.span
        className="absolute left-[22%] top-[38%] h-2 w-2 rounded-full bg-blue-glow shadow-[0_0_18px_rgba(90,167,255,0.9)]"
        animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute bottom-[31%] right-[24%] h-2 w-2 rounded-full bg-blue-electric shadow-[0_0_18px_rgba(37,99,235,0.8)]"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </Reveal>
  );
}
