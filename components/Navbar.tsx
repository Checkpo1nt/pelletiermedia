"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonPress } from "@/lib/animations";

const navLinks = [
  { label: "Systems", href: "#systems" },
  { label: "OpenClaw", href: "#openclaw" },
  { label: "Activity", href: "#activity" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="container-shell sticky top-3 z-50 pt-3">
      <nav
        aria-label="Main navigation"
        className="glass-panel flex items-center justify-between gap-4 rounded-2xl px-4 py-3"
      >
        <a className="focus-ring text-sm font-semibold text-ink" href="#top">
          Gavin Pelletier
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="focus-ring rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <motion.a
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-blue transition-colors hover:bg-blue-electric"
          href="#contact"
          whileTap={buttonPress}
        >
          Build With Me
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </motion.a>
      </nav>
    </header>
  );
}
