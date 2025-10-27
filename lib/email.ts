import nodemailer from "nodemailer";
import crypto from "crypto";

// Configure nodemailer transporter for Gmail SMTP.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// OTP expiration time: 1 minute in development, 5 minutes in production.
export const OTP_EXPIRATION_TIME = process.env.NODE_ENV === "development" ?  60 * 1000 : 5 * 60 * 1000;

// Function to generate a 6-digit OTP.
export function generateOTP(): number {
  return crypto.randomInt(100000, 1000000);
}

// Send verification email with OTP.
export async function sendVerificationEmail(
  email: string,
  otp: number
): Promise<{ success: boolean; error?: any }> {
  const mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: "Verify Your Diaryof Account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hey there,</h2>
        <p>Here is a one-time verification code for your use.</p>
        <div style="background-color: #307A59; color: #ffffff; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
          <strong>${otp}</strong>
        </div>
        <p><strong>Important:</strong>
        This code expires in 1 minute
        </p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">This is an automated message, please do not reply.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error };
  }
}
