"use client";

import { motion } from "framer-motion";
import {
  BellRing,
  Bot,
  ChartNoAxesCombined,
  DatabaseZap,
  GitBranch,
  Handshake,
  Route,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionBadge } from "@/components/SectionBadge";
import { cardHover, revealVariants, staggerContainer } from "@/lib/animations";

const systems = [
  ["Workflow Automation", "Replace repeated manual tasks with reliable execution flows.", Workflow],
  ["Delegated Agent Systems", "Use AI agents to monitor, summarize, route, decide, and trigger next steps.", Bot],
  ["Data-to-Action Loops", "Turn raw inputs into alerts, decisions, reports, and follow-up actions.", DatabaseZap],
  ["Lead Routing", "Capture, qualify, organize, and route leads before they go cold.", Route],
  ["Sourcing Checks", "Evaluate suppliers, quotes, freight, risks, margins, and viability faster.", Handshake],
  ["Margin Monitoring", "Track cost, price, fees, and profit changes before they become expensive.", ChartNoAxesCombined],
  ["Reporting Systems", "Turn activity into operator-ready summaries and dashboards.", GitBranch],
  ["Follow-Up Orchestration", "Keep prospects, vendors, customers, and internal work moving automatically.", BellRing],
] as const;

export function BuildSystemsGrid() {
  return (
    <section className="container-shell py-20" id="systems">
      <Reveal>
        <SectionBadge>Systems</SectionBadge>
        <h2 className="headline max-w-3xl text-4xl leading-tight text-ink sm:text-5xl">
          I build the systems that remove the drag.
        </h2>
      </Reveal>
      <motion.div
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {systems.map(([title, copy, Icon]) => (
          <motion.article
            key={title}
            className="tactile rounded-[1.35rem] p-5"
            variants={revealVariants}
            whileHover={cardHover}
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-electric shadow-inset">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
