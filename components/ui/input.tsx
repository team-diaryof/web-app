"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: React.ReactNode;
}

const variantStyles = {
    secondary:
    "border border-gray-300 focus:ring-1 focus:ring-gray-800 text-black placeholder-gray-400",
    primary:
    "border border-gray-200 bg-gray-100 focus:ring-1 focus:ring-gray-800 text-black placeholder-gray-500",
};

const Input: React.FC<InputProps> = ({
  label,
  error,
  type = "text",
  variant = "primary",
  className,
  icon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "w-full rounded-full px-5 py-3 outline-none transition",
            variantStyles[variant],
            error && "border-red-500 focus:ring-red-400",
            className
          )}
          {...props}
        />

        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            className="text-sm text-red-500 mt-1 ml-3"
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
