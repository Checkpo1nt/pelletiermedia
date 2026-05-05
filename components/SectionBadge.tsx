import type { ReactNode } from "react";

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center rounded-full border border-blue-electric/15 bg-white/58 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-electric shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      {children}
    </p>
  );
}
