"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useThemeStore } from "@/store/theme";

const letterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 }
  },
  exit: {
    opacity: 0,
    y: -80, // Increased travel distance for a smoother look
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } // Slowed text exit
  }
};

interface ThemeTransitionContextType {
  triggerThemeSwitch: () => void;
  isTransitioning: boolean;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(undefined);

export const useThemeTransition = () => {
  const context = useContext(ThemeTransitionContext);
  if (!context) throw new Error("useThemeTransition must be used within a ThemeTransitionProvider");
  return context;
};

type TransitionStage = 'idle' | 'covering' | 'textExit' | 'exiting';

export default function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useThemeStore();
  const [stage, setStage] = useState<TransitionStage>('idle');
  const [overlayColor, setOverlayColor] = useState<"black" | "white">("black");
  
  const displayModeText = overlayColor === "black" ? "DARK MODE" : "LIGHT MODE";

  const triggerThemeSwitch = () => {
    if (stage !== 'idle') return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setOverlayColor(nextTheme === "dark" ? "black" : "white");
    setStage('covering');
  };

  const slideVariants = {
    idle: { y: "100%" },
    covering: { y: "0%" },
    textExit: { y: "0%" },
    exiting: { y: "-100%" }
  };

  // Only "covering" renders text; all other stages exit the text
  const textAnimationState = stage === 'covering' ? "visible" : "exit";

  return (
    <ThemeTransitionContext.Provider value={{ triggerThemeSwitch, isTransitioning: stage !== 'idle' }}>
      {children}
      
      {stage !== 'idle' && (
        <motion.div
          key="theme-overlay"
          initial="idle"
          animate={stage}
          variants={slideVariants}
          // Slowed the transition duration to 1.1s for a more cinematic exit
          transition={{ 
            duration: stage === 'exiting' ? 1.1 : 0.85, 
            ease: [0.22, 1, 0.36, 1] 
          }} 
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${
            overlayColor === "black" ? "bg-black" : "bg-white"
          }`}
          onAnimationComplete={(definition) => {
            if (definition === "covering") {
              toggleTheme(); 
              const root = document.documentElement;
              if (theme === "light") root.classList.add("dark");
              else root.classList.remove("dark");

              // Hold "VISIBLE" state for 1 second
              setTimeout(() => {
                setStage('textExit');
              }, 1000); 
            }

            if (definition === "textExit") {
              // Wait for text to fully clear before starting overlay slide
              setTimeout(() => {
                setStage('exiting');
              }, 650);
            }

            if (definition === "exiting") {
              setStage('idle');
            }
          }}
        >
            <div className="overflow-hidden flex">
                <motion.div
                    initial="hidden"
                    animate={textAnimationState}
                    variants={{
                        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                        // Slowed stagger on exit
                        exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } }
                    }}
                    className="flex space-x-2 md:space-x-4"
                >
                    {displayModeText.split("").map((char, i) => (
                        <motion.span
                            key={`${overlayColor}-${i}`}
                            variants={letterVariants}
                            className={`text-[8vw] md:text-[6vw] font-black tracking-tighter leading-none ${
                                overlayColor === "black" ? "text-white" : "text-black"
                            }`}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
      )}
    </ThemeTransitionContext.Provider>
  );
}