"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SectionBadge } from "@/components/SectionBadge";
import { revealVariants, staggerContainer } from "@/lib/animations";

const timeline = [
  {
    date: "2024-Now",
    title: "Independent Automation Work",
    copy: "Building OpenClaw-powered workflows, agent systems, lead flows, sourcing checks, reporting loops, and execution automations.",
  },
  {
    date: "2024",
    title: "AI + Trading Experiments",
    copy: "Tested AI-assisted research, signal tracking, decision logging, and fast feedback systems for market ideas.",
  },
  {
    date: "2023",
    title: "Smoke & Slice Commerce Systems",
    copy: "Built product research, sourcing, positioning, content, and operational processes for a physical product brand.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="container-shell py-20" id="process">
      <Reveal>
        <SectionBadge>Process</SectionBadge>
        <h2 className="headline max-w-3xl text-4xl leading-tight text-ink sm:text-5xl">
          Built through execution, not theory.
        </h2>
      </Reveal>
      <motion.div
        className="mt-10 grid gap-5 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {timeline.map((item) => (
          <motion.article
            key={item.title}
            className="tactile rounded-[1.5rem] p-6"
            variants={revealVariants}
            whileHover={{ y: -4 }}
          >
            <p className="text-sm font-semibold text-blue-electric">{item.date}</p>
            <h3 className="mt-4 text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 leading-7 text-muted">{item.copy}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
