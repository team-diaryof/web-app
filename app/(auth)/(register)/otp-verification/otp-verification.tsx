// components/pages/(auth)/otp-verification/otp-verification-screen.tsx
"use client";

import Button from "@/components/ui/button";
import ErrorPage from "@/components/ui/error-page";
import { authServices } from "@/services/auth";
import { useAuthStore } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import OTPBoxes from "../../../../components/otp-boxes";
import Loading from "@/components/ui/loading";
import { AnimatePresence, motion } from "framer-motion";

export default function OTPVerificationScreen() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAuth } = useAuthStore();

    const email = useMemo(() => searchParams.get("email") || "", [searchParams]);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);

        try {
            const result = await authServices.verifyOTP(email, otp);

            if (result.success && result.data?.token && result.data.user) {
                setAuth(result.data.token, result.data.user);
                toast.success("Account verified successfully!");
                router.push("/dashboard");
            } else {
                toast.error(result.message || "Invalid OTP. Please try again.");
            }
        } catch {
            toast.error("An error occurred during verification");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);

        try {
            const result = await authServices.resendOTP(email);

            if (result.success) {
                toast.success(result.message || "OTP resent successfully");
            } else {
                toast.error(result.message || "Failed to resend OTP");
            }
        } catch {
            toast.error("An error occurred while resending OTP");
        } finally {
            setResendLoading(false);
        }
    };

    if (!email) {
        toast.error("Email not found. Please register again.");
        return <ErrorPage badRequest title="No email found" />;
    }

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Verify Your Email</h2>
                <p className="mt-2 text-sm text-gray-600">
                    We sent a 6-digit code to <strong className="underline">{email}</strong>
                </p>
            </div>

            <form onSubmit={handleVerify} className="mt-8 space-y-6">
                <OTPBoxes length={6} onChange={(val) => setOtp(val)} />

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                </Button>

                <div className="text-center">
                    <p className="text-sm text-gray-800">
                        Didn&apos;t receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={resendLoading}
                            className="underline pl-1 w-24 hover:underline"
                        >
                            <AnimatePresence mode="wait">
                                {resendLoading ? (
                                    <motion.span
                                        key="sending"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center gap-2"
                                    >
                                        Sending <Loading size="xs" />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="resend"
                                        className="cursor-pointer hover:text-black transition-all"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Resend OTP
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </p>
                </div>

                <p className="text-center text-sm text-gray-600">
                    <Button variant="link" href="/register" className="w-full h-12 justify-center">
                        Back to Register
                    </Button>
                </p>
            </form>
        </div>
    );
}
