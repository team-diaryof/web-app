// app/(auth)/(register)/otp-verification/page.tsx

import AnimatePageWrapper from "@/components/animations/animate-page-wrapper";
import OTPVerificationScreen from "@/app/(auth)/(register)/otp-verification/otp-verification";

export const metadata = {
  title: "Verify OTP | Diaryof",
  description: "Verify your email address to complete your Diaryof registration. Enter the OTP sent to your email.",
  openGraph: {
    title: "Verify OTP | Diaryof",
    description: "Verify your email address to complete your Diaryof registration. Enter the OTP sent to your email.",
    url: "https://diaryof.com/otp-verification",
    siteName: "Diaryof",
    images: [
      {
        url: "https://diaryof.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diaryof Verify OTP Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify OTP | Diaryof",
    description: "Verify your email address to complete your Diaryof registration. Enter the OTP sent to your email.",
    images: ["https://diaryof.com/og-image.png"],
    site: "@diaryofapp",
  },
};

export default async function OTPVerificationPage() {
  return (
    <AnimatePageWrapper className="flex items-center flex-col justify-center px-4">
      <OTPVerificationScreen />
    </AnimatePageWrapper>
  );
}

