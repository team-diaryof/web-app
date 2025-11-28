// lib/email.ts
import nodemailer from "nodemailer";

const EMAIL_CONFIG = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
} as const;

const transporter = nodemailer.createTransport({
  ...EMAIL_CONFIG,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

// Simplified function - just sends the email
export default async function sendEmail(
  payload: EmailPayload
): Promise<EmailResult> {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    console.log(`Email sent successfully to ${payload.to}: ${payload.subject}`);
    return { success: true };
  } catch (error) {
    console.error(`ERROR : could not send email to ${payload.to}:`, error);
    return { success: false, error: String(error) };
  }
}
