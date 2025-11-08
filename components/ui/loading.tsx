"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const sizeStyles = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-[3px]",
};

const Loading = ({
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
          "rounded-full border-solid border-inherit border-t-transparent",
          sizeStyles[size],
          className
        )}
      />
      {text && <span className="font-playfair text-base">{text}</span>}
    </div>
  );
};

export default Loading;
