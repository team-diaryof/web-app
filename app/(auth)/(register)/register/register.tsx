"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { authServices } from "@/services/auth";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import googleImage from "@/public/google.png";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const result = await authServices.register(
                formData.email,
                formData.password,
                formData.name || undefined
            );

            if (result.success) {
                await new Promise((r) => setTimeout(r, 900));
                setStatus("success");
                toast.success(result.message || "OTP sent to your email");

                // Redirect to OTP verification page
                setTimeout(() => {
                    router.push(`/otp-verification?email=${encodeURIComponent(formData.email)}`);
                }, 1000);
            } else {
                setStatus("error");
                toast.error(result.message || "Registration failed");
            }
        } catch (err) {
            setStatus("error");
            const errorMessage = axios.isAxiosError(err)
                ? err.response?.data?.message
                : "Failed to register. Try again.";
            toast.error(errorMessage || "Registration failed");
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
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Input
                    type="text"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={status === "loading"}
                />

                <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={status === "loading"}
                />

                <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
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
                                "Creating Account..."
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
                    {/* FIXED: Added border-zinc-300 and dark:border-zinc-800 */}
                    <div className="w-full border-t border-zinc-300 dark:border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    {/* FIXED: Added dark:bg-black and animate-mode */}
                    <span className="px-2 bg-white dark:bg-black animate-mode text-gray-500">Or continue with</span>
                </div>
            </div>

            <Button
                variant="secondary"
                className="w-full flex items-center h-12 justify-center gap-3"
                onClick={handleGoogleSignIn}
                disabled={status === "loading"}
                type="button" 
            >
                <Image src={googleImage} className="size-8" alt="google-image" />
                Sign up with Google
            </Button>
        </>
    );
}