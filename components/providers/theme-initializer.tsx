"use client";

import { useThemeStore } from "@/store/theme";
import { useEffect } from "react";

export default function ThemeInitializer() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isSystemDark = mediaQuery.matches;
      const isDark = theme === "dark" || (theme === "system" && isSystemDark);

      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    // Apply immediately
    applyTheme();

    // Listener for system changes (only active if theme is 'system')
    const handleSystemChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]); 

  return null;
}