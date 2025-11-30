// app/layout.tsx
import ThemeInitializer from "@/components/providers/theme-initializer";
import UserAuthStatusCheck from "@/components/user-auth-status-check";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      <ThemeInitializer />
      <body
        className={`${geistSans.variable} ${geistMono.variable} selection:bg-amber-100 bg-white dark:text-white dark:bg-black animate-theme antialiased font-sans font-medium tracking-wider `}
      >
        <UserAuthStatusCheck />
        {children}
      </body>
    </html>
  );
}
