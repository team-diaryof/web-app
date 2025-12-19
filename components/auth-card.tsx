"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function AuthCard({ children, title, subtitle, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Apple-like easing
      className={cn(
        "w-full max-w-[420px] mx-auto",
        "bg-white/80 dark:bg-black/80 backdrop-blur-md", // Glass effect
        "border border-zinc-200 dark:border-zinc-800",
        "rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500",
        "p-8",
        className
      )}
    >
      <div className="text-center mb-8 space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm text-zinc-500 dark:text-zinc-400"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
    </motion.div>
  );
}