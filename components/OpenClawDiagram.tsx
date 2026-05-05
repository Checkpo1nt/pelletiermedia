"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckSquare, FileInput, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionBadge } from "@/components/SectionBadge";
import { cardHover, revealVariants, staggerContainer } from "@/lib/animations";

const layers = [
  {
    title: "Input Layer",
    icon: FileInput,
    items: ["Leads", "messages", "files", "vendor data", "task updates", "reports"],
  },
  {
    title: "Handling Layer",
    icon: CheckSquare,
    items: ["read", "check", "sort", "assign", "send", "record"],
    featured: true,
  },
  {
    title: "Output Layer",
    icon: Send,
    items: ["Alerts", "follow-ups", "dashboards", "decisions", "SOPs", "completed tasks"],
  },
];

export function OpenClawDiagram() {
  return (
    <section className="container-shell py-20" id="openclaw">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionBadge>OpenClaw</SectionBadge>
          <h2 className="headline max-w-3xl text-4xl leading-tight text-ink sm:text-5xl">
            OpenClaw moves work from input to output.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            OpenClaw keeps the boring office loop moving: read what came in, check what matters, choose the next step, and send it where it belongs.
          </p>
        </Reveal>

        <motion.div
          className="grid gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <motion.article
                key={layer.title}
                className={`relative rounded-[1.5rem] p-5 ${
                  layer.featured
                    ? "border border-blue-electric/20 bg-[linear-gradient(145deg,#ffffff,#e8f1ff)] shadow-blue"
                    : "tactile"
                }`}
                variants={revealVariants}
                whileHover={cardHover}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-electric shadow-inset">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{layer.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/70 bg-white/55 px-2.5 py-1 text-xs font-semibold text-muted shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {index < layers.length - 1 ? (
                  <div className="absolute -bottom-5 left-9 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-blue-electric text-white shadow-blue">
                    <ArrowRight className="h-3.5 w-3.5 rotate-90" aria-hidden="true" />
                  </div>
                ) : null}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
