"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import googleImage from "@/public/google.png";
import { authServices } from "@/services/auth";
import { useAuthStore } from "@/store";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

// IMPORT THIS
import { signIn } from "next-auth/react"; 

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading">("idle");
    const { setAuth } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const response = await authServices.login(email, password);

        if (response.success === false) {
            setStatus("idle");
            toast.error(response.message || "Login failed. Please try again.");
            return;
        }
        
        // Ensure response.data is defined before accessing it
        if (response.data) {
            const { token, user } = response.data;
            setAuth(token, user);

            toast.success("Welcome back! Redirecting to dashboard...");

            setTimeout(() => {
                setStatus("idle");
                user.role === "admin" ? router.push("/admin/dashboard") : router.push("/dashboard");
            }, 1000);
        }
    };

    // UPDATED FUNCTION
    const handleGoogleSignIn = async () => {
        setStatus("loading"); // Optional: show loading state while redirecting
        try {
            await signIn("google", { 
                callbackUrl: "/dashboard", // Where to go after login
                redirect: true 
            });
        } catch (error) {
            setStatus("idle");
            toast.error("Something went wrong with Google Login");
        }
    };

    return (
        <>
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
                <Button variant="link" href={`/forgot-password`} className="text-xs ml-auto mr-2 mt-1">
                    Forgot Password ?
                </Button>

                <Button
                    variant="primary"
                    className="disabled:cursor-not-allowed w-full h-12 justify-center mt-6 cursor-pointer"
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
                            {status === "loading" ? <Loading dark size="sm" /> : "Login"}
                        </motion.span>
                    </AnimatePresence>
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-300 dark:border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-blacked animate-mode text-gray-400">Or continue with</span>
                </div>
            </div>

            <Button
                variant="secondary"
                className="w-full flex items-center h-12 justify-center gap-3"
                onClick={handleGoogleSignIn}
                disabled={status === "loading"}
                type="button" // Important so it doesn't submit the form
            >
                <Image src={googleImage} className="size-8" alt="google-image" />
                Sign in with Google
            </Button>
        </>
    );
}