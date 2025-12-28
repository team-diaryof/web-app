import ThemeInitializer from "@/components/providers/theme-initializer";
import SessionProvider from "@/components/providers/session-provider";
import UserAuthStatusCheck from "@/components/user-auth-status-check";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeTransitionProvider from "@/components/providers/theme-transition-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DiaryOf",
  description: "A platform for sharing and discovering personal stories",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 1. Initializer sets the initial class to prevent FOUC */}
      <ThemeInitializer />

      <body
        className={`${geistSans.variable} ${geistMono.variable} selection:bg-amber-100 bg-white dark:text-white dark:bg-blacked animate-theme antialiased font-sans font-medium tracking-wider`}
      >
        <SessionProvider>
          {/* 2. Transition Provider wraps content to inject the Overlay */}
          <ThemeTransitionProvider>
            <UserAuthStatusCheck />
            {children}
          </ThemeTransitionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}