"use client";

import { useThemeStore } from "@/store/theme";
import { useEffect } from "react";

export default function ThemeInitializer() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Initial sync
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []); // Only run once on mount

  // We do NOT want a useEffect dependent on [theme] here that force updates 
  // immediately, because our TransitionProvider handles the specific timing 
  // during the animation.
  
  return null;
}