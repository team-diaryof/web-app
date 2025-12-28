// components/ui/input.tsx
"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    icon?: React.ReactNode;
    variant?: "primary" | "secondary";
}

const variants = {
    "primary": "bg-white dark:bg-black border border-zinc-100 dark:border-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-600",
    "secondary": "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 focus:border-zinc-200 dark:focus:border-zinc-700",
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    type = "text",
    className,
    icon,
    variant="secondary",
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                    {label}
                </label>
            )}

            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-zinc-800 animate-theme">
                        {icon}
                    </div>
                )}

                <input
                    type={inputType}
                    className={cn(
                        variants[variant],
                        "w-full rounded-full border border-zinc-100 focus:bg-zinc-50 dark:focus:bg-zinc-950/50 dark:border-zinc-800 px-5 py-3 outline-none animate-theme",
                        "placeholder:text-zinc-400",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-red-300 focus:border-red-400",
                        icon && "pl-11",
                        className
                    )}
                    {...props}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-zinc-600 transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, y: -5 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -5 }}
                        className="text-xs text-red-500 ml-4 font-medium"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Input;