// components/ui/dropdown/dropdown.tsx
"use client";

import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

const DropdownContext = createContext<{ close: () => void } | null>(null);
export const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("useDropdown must be used inside <Dropdown>");
  return ctx;
};

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  menuClassName?: string;
  mobileSlideFrom?: "left" | "right";
}

export function Dropdown({
  trigger,
  children,
  align = "left",
  className,
  menuClassName,
  mobileSlideFrom = "right",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  // detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // outside click + escape + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && close();

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    if (isMobile) document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile, close]);

  const alignment = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  }[align];

  const mobileAnim =
    mobileSlideFrom === "left"
      ? { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } }
      : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  const desktopAnim = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const animation = isMobile ? mobileAnim : desktopAnim;

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div
        onClick={() => setIsOpen((v) => !v)}
        className={cn("cursor-pointer p-2", isOpen && "bg-gray-50")}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {/* backdrop */}
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={close}
          />
        )}

        {/* panel */}
        {isOpen && (
          <motion.div
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ duration: 0.3 }}
            className={cn(
              isMobile
                ? `fixed ${mobileSlideFrom}-0 top-0 bottom-0 w-full bg-white shadow-2xl z-50 overflow-y-auto`
                : `absolute z-50 mt-2 min-w-[200px] border bg-white shadow-lg ${alignment}`,
              menuClassName
            )}
          >
            {isMobile && (
              <div className="flex items-center justify-end p-4">
                <button
                  onClick={close}
                  aria-label="Close menu"
                  className="p-1 bg-gray-100 rounded"
                >
                  <XIcon />
                </button>
              </div>
            )}

            <DropdownContext.Provider value={{ close }}>
              <div>{children}</div>
            </DropdownContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
