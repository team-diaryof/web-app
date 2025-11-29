"use client";

import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
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

type DropdownAlignment = 
  | "bottom-left" 
  | "bottom-right" 
  | "bottom-center" 
  | "top-left" 
  | "top-right" 
  | "top-center";

interface DropdownProps {
  trigger: ReactNode;
  limitHeight?: boolean;
  children: ReactNode;
  position?: DropdownAlignment;
  className?: string;
  menuClassName?: string;
  mobileSlideFrom?: "left" | "right" | "bottom";
}

export function Dropdown({
  trigger,
  limitHeight = false,
  children,
  position = "bottom-left",
  className,
  menuClassName,
  mobileSlideFrom = "right",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if(typeof window === "undefined") return;
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

  const positionClasses: Record<DropdownAlignment, string> = {
    "bottom-left": "top-full mt-2 right-0 ",
    "bottom-right": "top-full mt-2 left-0 ",
    "bottom-center": "top-full mt-2 left-1/2 -translate-x-1/2 origin-top",
    "top-left": "bottom-full mb-2 right-0",
    "top-right": "bottom-full mb-2 left-0",
    "top-center": "bottom-full mb-2 left-1/2 -translate-x-1/2 origin-bottom",
  };

  const isTopAligned = position.startsWith("top");

  // Mobile Animation
  const mobileAnim =
    mobileSlideFrom === "bottom"
      ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { opacity: 0 } }
      : {
          initial: { x: mobileSlideFrom === "left" ? "-100%" : "100%" },
          animate: { x: 0 },
          exit: { opacity: 0 },
        };

  const desktopAnim = {
    initial: { opacity: 0, y: isTopAligned ? 6 : -6, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: isTopAligned ? 6 : -6, scale: 0.98 },
  };

  const animation = isMobile ? mobileAnim : desktopAnim;

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-block",
        className,
        isOpen ? "z-50" : "z-auto"
      )}
    >
      <div
        onClick={() => setIsOpen((v) => !v)}
        className={cn("cursor-pointer", isOpen && "opacity-100")}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[60]"
            onClick={close}
          />
        )}

        {isOpen && (
          <motion.div
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              isMobile
                ? `fixed ${
                    mobileSlideFrom === "bottom"
                      ? "bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh]"
                      : "top-0 bottom-0 " +
                        (mobileSlideFrom === "left" ? "left-0" : "right-0") +
                        " h-full"
                  } w-full bg-white z-[70] overflow-hidden flex flex-col`
                : cn(
                    "absolute z-[1000] min-w-[220px] bg-white rounded-xl border border-zinc-200",
                    positionClasses[position]
                  ),
              menuClassName,
              limitHeight && "md:max-h-[35vh]",
              "overflow-y-auto"
            )}
          >
            {isMobile && (
              <div
                className="flex items-center justify-center pt-3 pb-2 flex-shrink-0 cursor-pointer"
                onClick={close}
              >
                {mobileSlideFrom === "bottom" ? (
                  <div className="w-12 h-1.5 bg-zinc-200 rounded-full" />
                ) : (
                  <div className="w-full flex justify-end px-4 pt-2">
                    <X size={24} />
                  </div>
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