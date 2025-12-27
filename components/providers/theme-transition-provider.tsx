"use client";

import { createContext, useContext, ReactNode } from "react";
import { Theme, useThemeStore } from "@/store/theme";

interface ThemeTransitionContextType {
  changeTheme: (newTheme: Theme) => void;
  isTransitioning: boolean;
  currentTheme: Theme;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(undefined);

export const useThemeTransition = () => {
  const context = useContext(ThemeTransitionContext);
  if (!context) throw new Error("useThemeTransition must be used within a ThemeTransitionProvider");
  return context;
};

export default function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  const changeTheme = (newTheme: Theme) => {
    // Simply update the store. The ThemeInitializer will handle the class switching.
    setTheme(newTheme);
  };

  return (
    <ThemeTransitionContext.Provider 
        // We hardcode isTransitioning to false since there is no animation
        value={{ changeTheme, isTransitioning: false, currentTheme: theme }}
    >
      {children}
    </ThemeTransitionContext.Provider>
  );
}