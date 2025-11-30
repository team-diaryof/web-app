"use client";

import { useThemeStore } from "@/store/theme";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function ThemeInitializer() {
    const { theme } = useThemeStore();

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove both to prevent conflicts
        root.classList.remove("light", "dark");

        // Add the current theme
        root.classList.add(theme);

        console.log("Theme updated to:", theme);
    }, [theme]);

    return (
        <Toaster swipeDirections={['right', 'top']} theme={theme} position="top-right" />

    );
}