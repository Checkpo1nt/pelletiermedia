import type { Variants } from "framer-motion";

export const calmEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: calmEase,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const cardHover = {
  y: -4,
  transition: {
    duration: 0.35,
    ease: calmEase,
  },
};

export const buttonPress = {
  scale: 0.985,
};
