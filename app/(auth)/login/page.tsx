"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AnimatePageWrapper from "@/components/animations/animate-page-wrapper";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    try {
      await axios.post("/api/v1/auth/login", { email, password });
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Invalid credentials. Try again.");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <AnimatePageWrapper className="text-center">
      <h1 className="text-3xl font-serif mb-6">Welcome Back</h1>
      <p className="text-gray-600 mb-8">Log in to your account</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-gray-800 transition"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-gray-800 transition"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-black text-white py-3 font-medium transition hover:bg-gray-800"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {status === "loading"
                ? "Signing in..."
                : status === "success"
                ? "Success!"
                : "Login"}
            </motion.span>
          </AnimatePresence>
        </button>

        {status === "error" && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/register" className="underline hover:text-black">
          Register
        </Link>
      </p>
    </AnimatePageWrapper>
  );
}
