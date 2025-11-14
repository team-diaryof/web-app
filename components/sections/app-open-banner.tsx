"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/button";

const rePromptIntervalMs = 30 * 1000; // 1 minute
function isMobileUA(ua: string) {
    const r = /Android|iPhone|iPad|iPod|Mobile|BlackBerry|IEMobile|Opera Mini/i;
    return r.test(ua);
}

export default function AppOpenBanner() {
    const [visible, setVisible] = useState(false);

    const appScheme = useMemo(() => {
        return process.env.NEXT_PUBLIC_APP_SCHEME || "diaryof://";
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const ua = navigator.userAgent || "";
        if (!isMobileUA(ua)) return;

        const dismissedFlag = localStorage.getItem("app_open_banner_dismissed");
        const dismissedAtRaw = localStorage.getItem("app_open_banner_dismissed_at");

        if (dismissedFlag === "1") {
            const dismissedAt = dismissedAtRaw ? parseInt(dismissedAtRaw, 10) : 0;
            const now = Date.now();
            if (now - dismissedAt < rePromptIntervalMs) {
                // Still within cool-down, do not show.
                return;
            } else {
                // Cool-down expired, clear dismissal so we can show again.
                localStorage.removeItem("app_open_banner_dismissed");
                localStorage.removeItem("app_open_banner_dismissed_at");
            }
        }

        // Defer state update to avoid synchronous setState warning inside effect
        setTimeout(() => setVisible(true), 0);
    }, []);


    const handleDismiss = () => {
        try {
            localStorage.setItem("app_open_banner_dismissed", "1");
            localStorage.setItem("app_open_banner_dismissed_at", Date.now().toString());
        } catch { }
        setVisible(false);
    };

    const handleOpenInApp = () => {
        if (typeof window === "undefined") return;

        try {
            localStorage.setItem("app_open_banner_last_attempt_at", Date.now().toString());
        } catch { }
        let pageHidden = false;
        const onVisibility = () => {
            if (document.visibilityState === "hidden") {
                pageHidden = true;
                cleanup();
            }
        };
        const cleanup = () => {
            document.removeEventListener("visibilitychange", onVisibility);
            clearTimeout(timer);
        };
        document.addEventListener("visibilitychange", onVisibility);

        // Attempt to open the app via custom scheme
        try {
            window.location.href = appScheme;
        } catch { }

        // Fallback to download page if app doesn't open
        const timer = window.setTimeout(() => {
            if (!pageHidden) {
                window.location.assign("/download");
            }
            cleanup();
        }, 1500);
    };

    if (!visible) return null;

    return (
        <div className="fixed top-[60px] left-1/2 -translate-x-1/2 z-30 w-full backdrop-blur-sm bg-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <div className="text-sm font-semibold">Open in the App</div>
                    <div className="text-xs text-gray-600">Get the best experience in our mobile app.</div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="px-3! py-2!" onClick={handleDismiss}>
                        Not now
                    </Button>
                    <Button size="sm" className="px-3! py-2!" onClick={handleOpenInApp}>
                        Open app
                    </Button>
                </div>
            </div>
        </div>
    );
}
