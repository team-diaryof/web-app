"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../../public/logo-landscape-transparent.png";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      <div className="hidden md:flex md:w-1/2 h-screen flex-col justify-center items-center bg-gray-100 p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-center"
        >
          <Image
            src={logo}
            alt="Logo"
            width={1200}
            className="mb-4 w-[400px] mx-auto"
            priority
          />
          <h1 className="text-4xl text-black font-serif mb-4">Welcome Back!</h1>
          <p className="text-gray-800 max-w-md text-center">
            Sign in or create an account to stay updated with our latest stories,
            events, and curated wine journeys.
          </p>
        </motion.div>
      </div>

      <div className="flex-col flex-1 flex md:items-center md:justify-center w-full px-8 py-10 md:py-16">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={1200}
            className="mb-8 md:hidden w-[200px] mx-auto"
            priority
          />
        </Link>
        <div
          className="w-full max-w-md"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
