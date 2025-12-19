// components/layouts/auth-layout.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AuthProvider from "../auth-provider";

// Assuming you have your logo available
// import logo from "@/public/logo.png"; 

export default function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: React.ReactNode }) {
    return (
        <AuthProvider blockAuthenticated>


            <div className="min-h-screen w-full bg-[#FAFAFA] relative flex flex-col items-center justify-center p-4">
                {/* Background Grid Pattern - distinct 'Diary' feel */}
                <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 w-full max-w-[420px]"
                >
                    <div className="mb-8 text-center flex flex-col items-center">
                        {/* Replace text with your Logo Image if needed */}
                        <Link href="/" className="text-xl font-serif font-bold tracking-tight mb-6 hover:opacity-70 transition-opacity">
                            The <span className="text-yellow-500">Diary</span> of
                        </Link>

                        <h1 className="text-4xl font-serif font-medium text-zinc-900 mb-3 tracking-tight">
                            {title}
                        </h1>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-[80%] mx-auto">
                            {subtitle}
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8">
                        {children}
                    </div>
                </motion.div>
            </div>
        </AuthProvider>

    );
}