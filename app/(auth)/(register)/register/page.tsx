import AnimatePageWrapper from "@/components/animations/animate-page-wrapper";
import Register from "@/app/(auth)/(register)/register/register";
import Link from "next/link";

export const metadata = {
  title: "Create Account | Diaryof",
  description: "Register for Diaryof and join our community. Create your account to start your personal diary journey.",
  openGraph: {
    title: "Create Account | Diaryof",
    description: "Register for Diaryof and join our community. Create your account to start your personal diary journey.",
    url: "https://diaryof.com/register",
    siteName: "Diaryof",
    images: [
      {
        url: "https://diaryof.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Diaryof Register Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Account | Diaryof",
    description: "Register for Diaryof and join our community. Create your account to start your personal diary journey.",
    images: ["https://diaryof.com/logo.png"],
    site: "@diaryofapp",
  },
};

export default function RegisterPage() {
  return (
    <AnimatePageWrapper className="">
      <header className="flex items-center flex-col">
        <h1 className="text-3xl font-serif mb-4">Create Account</h1>
        <p className="text-gray-600 mb-2">Join our community today</p>
      </header>
      <Register />
      <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-300">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-black dark:hover:text-white">
          Login
        </Link>
      </p>
    </AnimatePageWrapper>
  );
}
