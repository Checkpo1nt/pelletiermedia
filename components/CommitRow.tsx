"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDot, FlaskConical, RefreshCw } from "lucide-react";
import { cardHover, revealVariants } from "@/lib/animations";

export type Commit = {
  title: string;
  category: string;
  status: "shipped" | "testing" | "refining" | "automated";
  timestamp: string;
  hash: string;
  description: string;
  files: string[];
};

const statusIcon = {
  shipped: CheckCircle2,
  testing: FlaskConical,
  refining: RefreshCw,
  automated: CircleDot,
};

export function CommitRow({ commit }: { commit: Commit }) {
  const Icon = statusIcon[commit.status];

  return (
    <motion.article className="relative pl-10" variants={revealVariants}>
      <span className="absolute left-[7px] top-7 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-electric shadow-[0_0_0_6px_rgba(37,99,235,0.13)]" />
      <motion.div
        className="tactile rounded-[1.35rem] p-5"
        whileHover={cardHover}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-electric/10 px-2.5 py-1 text-xs font-semibold text-blue-electric">
            {commit.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/60 px-2.5 py-1 text-xs font-semibold text-muted">
            <Icon className="h-3.5 w-3.5 text-blue-electric" aria-hidden="true" />
            {commit.status}
          </span>
          <span className="ml-auto text-xs font-medium text-muted">{commit.timestamp}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink">{commit.title}</h3>
        <p className="mt-2 leading-7 text-muted">{commit.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <code className="rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] text-white">
            {commit.hash}
          </code>
          {commit.files.map((file) => (
            <code
              key={file}
              className="rounded-full border border-white/70 bg-white/62 px-2.5 py-1 font-mono text-[11px] text-muted shadow-sm"
            >
              {file}
            </code>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}
