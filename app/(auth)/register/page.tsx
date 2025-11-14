"use client";

import AnimatePageWrapper from "@/components/wrapper/animate-page-wrapper";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { useAuthStore } from "@/store/user";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import googleImage from "@/public/google.png";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    try {
      const response = await axios.post("https://diaryof-backend.onrender.com/auth/register", form);
      const { token, user } = response.data;
      
      // Store auth data
      setAuth(token, user);
      
      // Set cookie for middleware
      document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60}`
      
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      
      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setStatus("error");
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message 
        : "Failed to register. Try again.";
      setError(errorMessage);
    } finally {
      setTimeout(() => {
        if (status !== "success") {
          setStatus("idle");
        }
      }, 4000);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth flow
    window.location.href = "/api/v1/auth/google";
  };

  return (
    <AnimatePageWrapper className="">
      <motion.header layout className="flex items-center flex-col">
        <h1 className="text-3xl font-serif mb-4">Create Account</h1>
        <p className="text-gray-600 mb-2">Join our community today</p>
      </motion.header>

      <AnimatePresence mode="wait">
        {(status === "error" || status === "success") && (
          <motion.p
            key={status}
            initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 8, marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-sm text-center p-2 overflow-hidden ${
              status === "error" ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"
            }`}
          >
            {status === "error"
              ? error ?? "Something went wrong."
              : "Welcome! Check your inbox to verify your email."}
          </motion.p>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          disabled={status === "loading"}
        />

        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          disabled={status === "loading"}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
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
              {status === "loading" ? (
                <Loading size="sm" />
              ) : status === "success" ? (
                "Account Created!"
              ) : status === "error" ? (
                "Try again"
              ) : (
                "Register"
              )}
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
        Sign up with Google
      </Button>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-black">
          Login
        </Link>
      </p>
    </AnimatePageWrapper>
  );
}
