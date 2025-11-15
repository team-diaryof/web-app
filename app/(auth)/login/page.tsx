"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import AnimatePageWrapper from "@/components/wrapper/animate-page-wrapper";
import googleImage from "@/public/google.png";
import { authServices } from "@/services/auth";
import { useAuthStore } from "@/store/user";
import { useNotificationStore } from "@/store/in-app-notification";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const { setAuth } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { success, token, user } = await authServices.login(email, password);

    if (!success || !token || !user) {
      setStatus("idle");
      addNotification({
        type: "error",
        message: "Invalid credentials. Please try again.",
        duration: 3000,
      });
      return;
    }

    // Set cookie for middleware
    setAuth(token, user);
    document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60}`; // 1 hour

    addNotification({
      type: "success",
      message: "Welcome back! Redirecting to dashboard...",
      duration: 3000,
    });

    setTimeout(() => {
      setStatus("idle");
      router.push("/dashboard");
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth flow
    window.location.href = "/api/v1/auth/google";
  };

  return (
    <AnimatePageWrapper className="">
      <motion.header className="flex items-center flex-col">
        <h1 className="text-3xl font-serif mb-4">Welcome Back</h1>
        <p className="text-gray-600 mb-2">Log in to your account</p>
      </motion.header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={status === "loading"}
        />

        <Button
          variant="primary"
          className="w-full h-12 justify-center mt-6"
          disabled={status === "loading"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block"
            >
              {status === "loading" ? <Loading size="sm" /> : "Login"}
            </motion.span>
          </AnimatePresence>
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button
        variant="secondary"
        className="w-full flex items-center h-12 justify-center gap-3"
        onClick={handleGoogleSignIn}
        disabled={status === "loading"}
      >
        <Image src={googleImage} className="size-8" alt="google-image" />
        Sign in with Google
      </Button>

      <p className="mt-6 text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline hover:text-black">
          Register
        </Link>
      </p>
    </AnimatePageWrapper>
  );
}
