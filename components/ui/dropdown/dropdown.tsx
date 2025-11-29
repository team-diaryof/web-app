"use client";

import { cn } from "@/lib/cn"; 
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
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
  mobileSlideFrom?: "left" | "right" | "bottom";
}

export function Dropdown({
  trigger,
  children,
  align = "left",
  className,
  menuClassName,
  mobileSlideFrom = "right", // Changed default to "right"
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    left: "left-0 origin-top-left",
    right: "right-0 origin-top-right",
    center: "left-1/2 -translate-x-1/2 origin-top",
  }[align];

  // Animation variants
  const mobileAnim = mobileSlideFrom === "bottom"
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { opacity: 0 } }
    : { 
        initial: { x: mobileSlideFrom === "left" ? "-100%" : "100%" }, 
        animate: { x: 0 }, 
        exit: { opacity: 0 } // Fades away directly without sliding back
      };

  const desktopAnim = {
    initial: { opacity: 0, y: -6, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.98 },
  };

  const animation = isMobile ? mobileAnim : desktopAnim;

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div
        onClick={() => setIsOpen((v) => !v)}
        className={cn("cursor-pointer", isOpen && "opacity-100")}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {/* Mobile Backdrop */}
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[60]"
            onClick={close}
          />
        )}

        {/* Dropdown Panel */}
        {isOpen && (
          <motion.div
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              isMobile
                ? `fixed ${mobileSlideFrom === "bottom" ? "bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh]" : "top-0 bottom-0 " + (mobileSlideFrom === "left" ? "left-0" : "right-0") + " h-full"} w-full bg-white shadow-2xl z-[70] overflow-hidden flex flex-col`
                : `absolute top-full mt-2 z-50 min-w-[220px] bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-zinc-200/60 ring-1 ring-black/5 ${alignment}`,
              menuClassName
            )}
          >
            {isMobile && (
              <div className="flex items-center justify-center pt-3 pb-2 flex-shrink-0 cursor-pointer" onClick={close}>
                 {mobileSlideFrom === "bottom" ? (
                    <div className="w-12 h-1.5 bg-zinc-200 rounded-full" />
                 ) : (
                    <div className="w-full flex justify-end px-4 pt-2"><X size={24} /></div>
                 )}
              </div>
            )}

            <DropdownContext.Provider value={{ close }}>
              <div className={isMobile ? "overflow-y-auto flex-1 pb-8" : ""}>
                {children}
              </div>
            </DropdownContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}