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
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    type = "text",
    className,
    icon,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700 ml-1">
                    {label}
                </label>
            )}

            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-800 transition-colors">
                        {icon}
                    </div>
                )}

                <input
                    type={inputType}
                    className={cn(
                        "w-full rounded-full border border-zinc-100 bg-white px-5 py-3 text-sm outline-none transition-all",
                        "placeholder:text-zinc-400",
                        "focus:border-zinc-300",
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
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
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