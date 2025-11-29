"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { authServices } from "@/services/auth";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Step = "EMAIL" | "OTP" | "NEW_PASSWORD";

export default function ForgotPasswordWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // State
  const [step, setStep] = useState<Step>("EMAIL");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- Handlers ---

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await authServices.forgotPassword(email);
    setLoading(false);

    if (res.success !== false) {
      toast.success("OTP sent to your email!");
      setStep("OTP");
    } else {
      toast.error(res.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await authServices.verifyResetOtp(email, otp);
    setLoading(false);

    if (res.success !== false) {
      toast.success("OTP Verified");
      setStep("NEW_PASSWORD");
    } else {
      toast.error(res.message || "Invalid OTP");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const res = await authServices.resetPassword(email, newPassword);
    setLoading(false);

    if (res.success !== false) {
      toast.success("Password reset successfully! Please login.");
      router.push(`/login?email=${email}`);
    } else {
      toast.error(res.message || "Failed to reset password");
    }
  };

  // --- Render Steps ---

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: ENTER EMAIL */}
        {step === "EMAIL" && (
          <motion.form
            key="step-email"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSendOtp}
            className="flex flex-col gap-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-serif">Forgot Password?</h2>
              <p className="text-gray-500 text-sm">Enter your email to receive a reset code.</p>
            </div>
            
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              disabled={loading}
            />
            
            <Button variant="primary" className="w-full h-12 justify-center" disabled={loading}>
              {loading ? <Loading size="sm" dark /> : "Send OTP"}
            </Button>
          </motion.form>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === "OTP" && (
          <motion.form
            key="step-otp"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleVerifyOtp}
            className="flex flex-col gap-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-serif">Check your Inbox</h2>
              <p className="text-gray-500 text-sm">We sent a code to <span className="font-semibold">{email}</span></p>
            </div>

            <Input
              label="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="text-center tracking-widest text-lg"
              required
              disabled={loading}
            />

            <Button variant="primary" className="w-full h-12 justify-center" disabled={loading}>
               {loading ? <Loading size="sm" dark /> : "Verify Code"}
            </Button>
            
            <button 
              type="button"
              onClick={() => setStep("EMAIL")}
              className="text-sm text-gray-500 hover:text-black underline mt-2 mx-auto"
            >
              Change Email
            </button>
          </motion.form>
        )}

        {/* STEP 3: NEW PASSWORD */}
        {step === "NEW_PASSWORD" && (
          <motion.form
            key="step-password"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleResetPassword}
            className="flex flex-col gap-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-serif">Reset Password</h2>
              <p className="text-gray-500 text-sm">Create a strong new password.</p>
            </div>

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />

            <Button variant="primary" className="w-full h-12 justify-center" disabled={loading}>
               {loading ? <Loading size="sm" dark /> : "Update Password"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}