"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authServices } from "@/services/auth";
import Button from "@/components/ui/button";
import { useNotificationStore } from "@/store/in-app-notification";
import { useAuthStore } from "@/store/user";

function OTPBoxes({ length = 6, onChange }: { length: number; onChange: (val: string) => void }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);
    onChange(newValues.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;

    const digits = paste.slice(0, length).split("");
    const newValues = [...values];

    digits.forEach((d, i) => (newValues[i] = d));
    setValues(newValues);
    onChange(newValues.join(""));

    inputsRef.current[Math.min(digits.length - 1, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      ))}
    </div>
  );
}

function OTPVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addNotification } = useNotificationStore();
  const { setAuth } = useAuthStore();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (!emailParam) {
      addNotification({ message: "Email not found. Please register again.", type: "error" });
      return;
    }
    setEmail(emailParam);
  }, [searchParams, addNotification]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      addNotification({ message: "Please enter a valid 6-digit OTP", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const result = await authServices.verifyOTP(email, otp);

      if (result.success && result.token && result.user) {
        setAuth(result.token, result.user);
        addNotification({ message: "Account verified successfully!", type: "success" });
        router.push("/dashboard");
      } else {
        addNotification({ message: result.message || "Invalid OTP. Please try again.", type: "error" });
      }
    } catch {
      addNotification({ message: "An error occurred during verification", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);

    try {
      const result = await authServices.resendOTP(email);

      if (result.success) {
        addNotification({
          message: result.message || "OTP resent successfully",
          type: "success",
        });
      } else {
        addNotification({
          message: result.message || "Failed to resend OTP",
          type: "error",
        });
      }
    } catch {
      addNotification({
        message: "An error occurred while resending OTP",
        type: "error",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We sent a 6-digit code to <strong>{email}</strong>
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <OTPBoxes length={6} onChange={(val) => setOtp(val)} />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="font-medium text-blue-600 hover:underline disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            </p>
          </div>

          <p className="text-center text-sm text-gray-600">
            <a href="/register" className="font-medium text-blue-600 hover:underline">
              Back to Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function OTPVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPVerificationContent />
    </Suspense>
  );
}
