import { Easing, Variants } from "framer-motion";

const TIMING = {
  fast: 0.3,
  normal: 0.8,
  slow: 1.2,
  delay: 0.2,
  stagger: 0.25,
} as const;

export const EASE = [0.42, 0, 0.58, 1] as Easing ;// Editorial smooth ease

// --- Container Variants ---

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: TIMING.delay,
      staggerChildren: TIMING.stagger,
    },
  },
};

export const staggerContainer = containerVariants; // Alias for readability

// --- Item Variants ---

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASE,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: EASE,
      delay: 0.2,
    },
  },
};