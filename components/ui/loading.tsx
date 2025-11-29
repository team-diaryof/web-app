// components/ui/loading.tsx
"use client";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface LoadingProps {
  dark?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const sizeStyles = {
  xs: "size-4 border-[3px] md:size-3 md:border-2",
  sm: "size-4 border-[3px]",
  md: "size-6 border-[4px]",
  lg: "size-8 border-[6px]",
};

const Loading = ({
  dark = false,
  size = "md",
  text,
  className,
}: LoadingProps) => {
  return (
    <div className="flex items-center gap-3 justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
        }}
        className={cn(
          className,
          "rounded-full border-solid border-inherit",
          dark ? "border-t-zinc-500" : "border-t-zinc-400 ",
          sizeStyles[size],
        )}
      />
      {text && <span className="font-playfair text-base">{text}</span>}
    </div>
  );
};

export default Loading;
