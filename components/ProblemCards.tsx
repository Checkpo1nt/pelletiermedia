"use client";

import { motion } from "framer-motion";
import { AlertCircle, GitPullRequestDraft, TimerReset } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionBadge } from "@/components/SectionBadge";
import { cardHover, revealVariants, staggerContainer } from "@/lib/animations";

const problems = [
  {
    title: "Scattered Inputs",
    copy: "Ideas, leads, messages, vendors, and tasks arrive from everywhere.",
    icon: GitPullRequestDraft,
  },
  {
    title: "Manual Decisions",
    copy: "Important work depends on someone remembering, checking, routing, and following up.",
    icon: AlertCircle,
  },
  {
    title: "Execution Drag",
    copy: "Progress slows because the system needs constant human babysitting.",
    icon: TimerReset,
  },
];

export function ProblemCards() {
  return (
    <section className="container-shell py-20" id="problem">
      <Reveal>
        <SectionBadge>Problem</SectionBadge>
        <h2 className="headline max-w-3xl text-4xl leading-tight text-ink sm:text-5xl">
          Moving fast breaks weak operations.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          When your ideas, leads, tasks, vendors, data, and follow-ups live in scattered places, speed turns into chaos. The goal is not more tools. The goal is a system that turns context into action.
        </p>
      </Reveal>
      <motion.div
        className="mt-10 grid gap-5 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {problems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              className="tactile rounded-[1.5rem] p-6"
              variants={revealVariants}
              whileHover={cardHover}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-electric shadow-inset">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 leading-7 text-muted">{item.copy}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
