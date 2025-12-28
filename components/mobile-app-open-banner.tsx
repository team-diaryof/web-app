// components/features/app-banner/app-open-banner.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/button";

const rePromptIntervalMs = 60 * 1000;

function isMobileUA(ua: string) {
  const r = /Android|iPhone|iPad|iPod|Mobile|BlackBerry|IEMobile|Opera Mini/i;
  return r.test(ua);
}

function isAndroid(ua: string) {
  return /Android/i.test(ua);
}

export default function MobileAppOpenBanner() {
  const [visible, setVisible] = useState(false);

  const appScheme = useMemo(() => "diaryofapp://", []);
  const androidPackage = useMemo(() => "com.sacube.diaryof", []);

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
        return;
      } else {
        localStorage.removeItem("app_open_banner_dismissed");
        localStorage.removeItem("app_open_banner_dismissed_at");
      }
    }

    setTimeout(() => setVisible(true), 0);
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem("app_open_banner_dismissed", "1");
      localStorage.setItem("app_open_banner_dismissed_at", Date.now().toString());
    } catch {}
    setVisible(false);
  };

  const buildAppUrl = () => appScheme;

  const handleOpenInApp = () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("app_open_banner_last_attempt_at", Date.now().toString());
    } catch {}

    const ua = navigator.userAgent || "";
    const appUrl = buildAppUrl();
    const siteFallback = `${window.location.origin}/download`;

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

    try {
      if (isAndroid(ua) && /Chrome/i.test(ua)) {
        const schemeNoSuffix = appScheme.replace("://", "");
        const intentUrl =
          `intent://` +
          `#Intent;scheme=${schemeNoSuffix};package=${androidPackage};S.browser_fallback_url=${encodeURIComponent(
            siteFallback
          )};end`;

        window.location.href = intentUrl;
      } else {
        window.location.href = appUrl;
      }
    } catch {}

    const timer = window.setTimeout(() => {
      if (!pageHidden) {
        window.location.assign(siteFallback);
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
