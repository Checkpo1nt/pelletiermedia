"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { revealVariants } from "@/lib/animations";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
} & MotionProps;

export function Reveal({
  as = "div",
  children,
  className,
  variants = revealVariants,
  ...props
}: RevealProps) {
  const MotionTag = motion.create(as);

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
