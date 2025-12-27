import AnimatePageWrapper from "@/components/animations/animate-page-wrapper";
import ForgotPasswordWizard from "@/app/(auth)/forgot-password/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Diaryof",
  description: "Reset your Diaryof account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AnimatePageWrapper className="flex items-center flex-col px-4 min-h-[60vh]">
      <ForgotPasswordWizard />
    </AnimatePageWrapper>
  );
}