"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    try {
      await axios.post("/api/v1/auth/register", form);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Failed to register. Try again.");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-serif mb-6">Create Account</h1>
      <p className="text-gray-600 mb-8">Join our community today</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-gray-800 transition"
        />

        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-gray-800 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-gray-800 transition"
        />

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
                ? "Creating..."
                : status === "success"
                ? "Account Created!"
                : "Register"}
            </motion.span>
          </AnimatePresence>
        </button>

        {status === "error" && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-black">
          Login
        </Link>
      </p>
    </div>
  );
}
