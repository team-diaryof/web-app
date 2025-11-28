"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    name?: string;
    value?: string;
    onChange?: (value: string) => void;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    required,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null>(
        options.find((opt) => opt.value === value) || null
    );
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle outside click to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: Option) => {
        setSelected(option);
        setIsOpen(false);
        if (onChange) onChange(option.value);
    };

    return (
        <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
            {label && (
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">
                    {label} {required && <span className="text-amber-500">*</span>}
                </label>
            )}

            {/* Hidden input for form submission compatibility */}
            <input 
                type="hidden" 
                name={name} 
                value={selected?.value || ""} 
                required={required} 
            />

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex cursor-pointer items-center justify-between border border-zinc-100 rounded-xl px-4 py-3 text-sm transition-all outline-none",
                    isOpen ? "border-zinc-300" : "",
                    className
                )}
            >
                <span className={cn("block truncate", !selected && "text-zinc-400")}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown
                    size={16}
                    className={cn(
                        "text-zinc-400 transition-transform duration-300",
                        isOpen && "rotate-180 text-primary"
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-[calc(100%+2px)] left-0 w-full bg-white border border-zinc-300 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                        <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={cn(
                                        "w-full cursor-pointer text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors hover:bg-zinc-50",
                                        selected?.value === option.value
                                            ? "text-zinc-900 font-medium"
                                            : "text-zinc-600 hover:text-zinc-900"
                                    )}
                                >
                                    {option.label}
                                    {selected?.value === option.value && (
                                        <Check size={14} className="text-amber-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Select;