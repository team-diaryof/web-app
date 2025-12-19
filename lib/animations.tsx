'use client'

import { Easing, Variants, motion } from "framer-motion";
import React from "react";

// =========================================
// LEGACY / EXISTING VARIANTS
// =========================================

const TIMING = {
  fast: 0.3,
  normal: 0.8,
  slow: 1.2,
  delay: 0.2,
  stagger: 0.25,
} as const;

export const EASE = [0.42, 0, 0.58, 1] as Easing;

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

export const staggerContainer = containerVariants;

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

export const letterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

// =========================================
// NEW STAGGER COMPONENTS (Smoother)
// =========================================

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  viewportAmount?: number;
  staggerDuration?: number;
  delay?: number;
}

export const StaggerSection = ({
  children,
  className = "",
  viewportAmount = 0.2,
  staggerDuration = 0.15,
  delay = 0,
}: SectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDuration,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  type?: "fadeInUp" | "fadeIn" | "scale";
}

export const StaggerItem = ({
  children,
  className = "",
  type = "fadeInUp", 
}: ItemProps) => {
  
  // Slower durations for smoother feel
  const variantsUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.2, 0.65, 0.3, 0.9] as Easing 
      }
    },
  };

  const variantsFade: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1] as Easing 
      }
    },
  };

  const variantsScale: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.2, 0.65, 0.3, 0.9] as Easing 
      }
    },
  };

  const getVariant = () => {
    switch(type) {
        case "fadeIn": return variantsFade;
        case "scale": return variantsScale;
        default: return variantsUp;
    }
  }

  return (
    <motion.div
      variants={getVariant()}
      className={className}
    >
      {children}
    </motion.div>
  );
};