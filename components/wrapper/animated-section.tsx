"use client"
import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  staggerChildren?: number
  once?: boolean
  amount?: number
}

/**
 * Reusable animated section wrapper with viewport detection
 * Follows DRY principle by centralizing animation logic
 */
export const AnimatedSection = ({
  children,
  className = '',
  variants,
  delay = 0,
  staggerChildren = 0.25,
  once = true,
  amount = 0.3,
}: AnimatedSectionProps) => {
  const defaultVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants || defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedItemProps {
  children: ReactNode
  className?: string
  variants?: Variants
  fadeOnly?: boolean
}

/**
 * Reusable animated item component
 * Can be used within AnimatedSection for staggered animations
 */
export const AnimatedItem = ({
  children,
  className = '',
  variants,
  fadeOnly = false,
}: AnimatedItemProps) => {
  const defaultVariants: Variants = fadeOnly
    ? {
        hidden: {
          opacity: 0,
          filter: "blur(5px)",
        },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        },
      }
    : {
        hidden: {
          opacity: 0,
          y: 20,
          filter: "blur(5px)",
        },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        },
      }

  return (
    <motion.div className={className} variants={variants || defaultVariants}>
      {children}
    </motion.div>
  )
}
