"use client";

import { useThemeTransition } from "@/components/providers/theme-transition-provider";
import { Theme } from "@/store/theme";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Laptop, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ThemeDropdown() {
  const { changeTheme, currentTheme, isTransitioning } = useThemeTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { label: string; value: Theme; icon: React.ReactNode }[] = [
    { label: "Light", value: "light", icon: <Sun size={16} /> },
    { label: "Dark", value: "dark", icon: <Moon size={16} /> },
    { label: "System", value: "system", icon: <Laptop size={16} /> },
  ];

  const currentOption = options.find((opt) => opt.value === currentTheme) || options[2];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !isTransitioning && setIsOpen(!isOpen)}
        disabled={isTransitioning}
      className={`flex items-center gap-1 px-3 py-2 text-xs cursor-pointer text-black dark:text-white bg-white dark:bg-zinc-900 font-medium border-zinc-100 dark:border-zinc-800 transition-colors border rounded-full`}
      >
        <span>{currentOption.label}</span>
        <ChevronUp
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full right-0 mb-2 w-36 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden z-50"
          >
            <div className="p-1 flex flex-col gap-0.5">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    changeTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-xl cursor-pointer transition-colors
                    ${currentTheme === option.value
                      ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-medium"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}