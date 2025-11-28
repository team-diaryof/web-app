


import React, { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
    label,
    error,
    className,
    ...props
}) => (
    <div className="flex flex-col gap-1.5 w-full">
        {label && (
            <label className="text-sm font-medium text-zinc-700 ml-1">
                {label}
                {props.required && <span className="text-amber-500">*</span>}
            </label>
        )}
        <textarea
            className={cn(
                "w-full h-[200px] resize-none rounded-xl border border-zinc-100 bg-white px-5 py-3 text-sm outline-none transition-all",
                "placeholder:text-zinc-400",
                "focus:border-zinc-300",
                "disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-300 focus:border-red-400",
                className
            )}
            rows={4}
            {...props}
        />
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

export default TextArea;