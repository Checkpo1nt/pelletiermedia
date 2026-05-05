"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  Inbox,
  Mail,
  ReceiptText,
  Send,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { revealVariants, staggerContainer } from "@/lib/animations";

const inputs = [
  { title: "Email", detail: "new request", icon: Mail },
  { title: "Order", detail: "closed sale", icon: ReceiptText },
  { title: "Quote", detail: "supplier price", icon: FileText },
  { title: "Task", detail: "needs follow-up", icon: ClipboardList },
];

const outputs = [
  { title: "Reply", detail: "drafted or sent" },
  { title: "Task", detail: "assigned" },
  { title: "Report", detail: "updated" },
  { title: "Alert", detail: "flagged" },
];

const checks = ["sort", "check", "send"];

export function HeroNodeGraph() {
  return (
    <Reveal className="relative overflow-hidden rounded-[2rem] p-5 tactile">
      <div className="absolute inset-5 rounded-[1.5rem] inset-panel" />
      <div className="relative z-10 rounded-[1.35rem] border border-white/70 bg-white/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-electric">
              Office work, cleaned up
            </p>
            <p className="mt-1 text-sm text-muted">
              Inputs come in. The right next step goes out.
            </p>
          </div>
          <div className="rounded-xl border border-white/75 bg-white/58 px-3 py-2 text-xs font-semibold text-muted shadow-inset">
            OpenClaw
          </div>
        </div>

        <motion.div
          className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.section className="rounded-[1.25rem] p-4 inset-panel" variants={revealVariants}>
            <div className="mb-4 flex items-center gap-2">
              <Inbox className="h-4 w-4 text-blue-electric" aria-hidden="true" />
              <h3 className="text-base font-semibold text-ink">Inputs</h3>
            </div>
            <div className="grid gap-3">
              {inputs.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/58 p-3 shadow-sm"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-electric shadow-inset">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="text-xs text-muted">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="flex min-h-64 flex-col justify-center rounded-[1.35rem] border border-blue-electric/20 bg-[linear-gradient(145deg,#ffffff,#eaf2ff)] p-5 text-center shadow-blue lg:w-44"
            variants={revealVariants}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-electric shadow-inset">
              <ArrowRight className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="headline text-3xl leading-none text-ink">OpenClaw</p>
            <div className="mt-5 grid gap-2">
              {checks.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-sm font-semibold text-ink shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.section>

          <motion.section className="rounded-[1.25rem] p-4 inset-panel" variants={revealVariants}>
            <div className="mb-4 flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-electric" aria-hidden="true" />
              <h3 className="text-base font-semibold text-ink">Outputs</h3>
            </div>
            <div className="grid gap-3">
              {outputs.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/58 p-3 shadow-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-electric shadow-inset">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="text-xs text-muted">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </motion.div>

        <div className="mt-4 rounded-[1.2rem] border border-white/70 bg-white/46 p-4 shadow-inset">
          <p className="text-sm leading-6 text-muted">
            The work is not mysterious: collect the incoming item, decide what it needs, and push out the next action without waiting on someone to remember it.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
