// app/(auth)/login/page.tsx

import AnimatePageWrapper from "@/components/animations/animate-page-wrapper";
import Link from "next/link";
import Login from "./login";

export const metadata = {
  title: "Login | Diaryof",
  description: "Log in to your Diaryof account and access your personal diary dashboard.",
  openGraph: {
    title: "Login | Diaryof",
    description: "Log in to your Diaryof account and access your personal diary dashboard.",
    url: "https://diaryof.com/login",
    siteName: "Diaryof",
    images: [
      {
        url: "https://diaryof.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diaryof Login Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Diaryof",
    description: "Log in to your Diaryof account and access your personal diary dashboard.",
    images: ["https://diaryof.com/og-image.png"],
    site: "@diaryofapp",
  },
};


export default function LoginPage() {
  return (
    <AnimatePageWrapper className="">
      <header className="flex items-center flex-col">
        <h1 className="text-3xl font-serif mb-4">Welcome Back</h1>
        <p className="text-gray-600 mb-2">Log in to your account</p>
      </header>
      <Login />
      <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-300">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline hover:text-black dark:hover:text-white">
          Register
        </Link>
      </p>
    </AnimatePageWrapper>
  );
}
