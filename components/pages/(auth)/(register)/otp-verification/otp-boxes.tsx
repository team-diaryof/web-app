// components/pages/(auth)/otp-verification/otp-boxes.tsx
"use client";

import { useRef, useState } from "react";

interface OTPBoxesProps {
  length?: number;
  onChange: (val: string) => void;
}

export default function OTPBoxes({ length = 6, onChange }: OTPBoxesProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (value !== "" && !Number.isInteger(Number(value))) return;

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
    const paste = e.clipboardData.getData("text");
    if (!paste) return;

    const digits: string[] = [];
    for (let i = 0; i < paste.length; i++) {
      const code = paste.charCodeAt(i);
      if (code >= 48 && code <= 57) {
        digits.push(paste[i]);
        if (digits.length >= length) break;
      }
    }

    if (digits.length === 0) return;

    const newValues = [...values];
    for (let i = 0; i < digits.length; i++) {
      newValues[i] = digits[i];
    }

    setValues(newValues);
    onChange(newValues.join(""));

    inputsRef.current[Math.min(digits.length, length - 1)]?.focus();
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
          className="size-15 md:size-13 text-center text-2xl border rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      ))}
    </div>
  );
}
