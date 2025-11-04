import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// Simplified function - just sends the email
export default async function sendEmail(
  payload: EmailPayload
): Promise<{ success: boolean; error?: unknown }> {
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
    console.error(`Email sending error to ${payload.to}:`, error);
    return { success: false, error };
  }
}
