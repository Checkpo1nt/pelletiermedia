"use client";

import { motion } from "framer-motion";
import { GitBranch, LockKeyhole, Radio } from "lucide-react";
import { CommitRow, type Commit } from "@/components/CommitRow";
import { Reveal } from "@/components/Reveal";
import { SectionBadge } from "@/components/SectionBadge";
import { revealVariants, staggerContainer } from "@/lib/animations";

const commits: Commit[] = [
  {
    title: "Added lead routing logic for inbound opportunities",
    category: "Automation",
    status: "shipped",
    timestamp: "2h ago",
    hash: "9f21c7a",
    description:
      "Routes incoming leads by source, urgency, and next action so follow-up does not depend on memory.",
    files: ["lead-router.ts", "follow-up-rules.json", "crm-sync.ts"],
  },
  {
    title: "Built sourcing check workflow for supplier decisions",
    category: "Sourcing",
    status: "testing",
    timestamp: "1d ago",
    hash: "c14a8bd",
    description:
      "Turns supplier quotes, freight notes, and margin assumptions into a faster go/no-go review loop.",
    files: ["supplier-check.ts", "margin-model.ts", "vendor-notes.md"],
  },
  {
    title: "Connected daily reporting loop to operator dashboard",
    category: "Reporting",
    status: "automated",
    timestamp: "3d ago",
    hash: "71de30f",
    description:
      "Summarizes activity, flags stuck items, and pushes the next actions into a single operator view.",
    files: ["daily-summary.ts", "operator-dashboard.tsx", "alerts.ts"],
  },
  {
    title: "Refined OpenClaw agent memory structure",
    category: "OpenClaw",
    status: "refining",
    timestamp: "5d ago",
    hash: "a81f2cc",
    description:
      "Improves how recurring context, procedures, and decisions are stored for later agent execution.",
    files: ["agent-memory.ts", "procedure-map.json", "execution-context.ts"],
  },
  {
    title: "Tested rapid revenue loop for commerce experiments",
    category: "Execution Lab",
    status: "testing",
    timestamp: "1w ago",
    hash: "48bb7d1",
    description:
      "Structured a fast test cycle for sourcing, listing, pricing, margin checks, and follow-up.",
    files: ["revenue-loop.md", "pricing-check.ts", "experiment-log.md"],
  },
  {
    title: "Created follow-up orchestration for stale tasks",
    category: "Workflow",
    status: "shipped",
    timestamp: "1w ago",
    hash: "d03e6ae",
    description:
      "Finds tasks with no movement, decides the next message or action, and queues the follow-up.",
    files: ["stale-task-agent.ts", "message-queue.ts", "next-action-rules.json"],
  },
];

export function CommitActivity() {
  return (
    <section className="container-shell py-20" id="activity">
      <Reveal>
        <SectionBadge>Activity</SectionBadge>
        <h2 className="headline max-w-3xl text-4xl leading-tight text-ink sm:text-5xl">
          Build log
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          A running record of systems, experiments, automations, and execution loops.
        </p>
      </Reveal>

      <Reveal className="mt-10 overflow-hidden rounded-[1.7rem] tactile">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/70 bg-white/42 px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              repo: gavinpelletier / execution-systems
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/62 px-3 py-1.5 text-xs font-semibold text-muted shadow-sm">
              <GitBranch className="h-3.5 w-3.5 text-blue-electric" aria-hidden="true" />
              branch: main
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-electric">
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            active operating log
          </span>
        </div>
        <motion.div
          className="relative px-4 py-6 before:absolute before:left-[27px] before:top-8 before:h-[calc(100%-4rem)] before:w-px before:bg-blue-electric/22 sm:px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
        >
          {commits.map((commit) => (
            <CommitRow key={commit.hash} commit={commit} />
          ))}
          <motion.div variants={revealVariants} className="pl-10 pt-4 text-sm font-medium text-muted">
            Practical systems, still moving.
          </motion.div>
        </motion.div>
      </Reveal>
    </section>
  );
}
