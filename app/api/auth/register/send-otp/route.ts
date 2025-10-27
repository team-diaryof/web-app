// app/api/auth/send-otp/route.ts

import { generateOTP, OTP_EXPIRATION_TIME, sendVerificationEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user is already verified (assuming non-guest users without expiresAt are verified)
    if (user.role !== 'TEMP' && !user.expiresAt) {
      return NextResponse.json({ error: 'User is already verified' }, { status: 400 });
    }

    // Generate new OTP
    const otp = generateOTP();
    const now = new Date();

    // Upsert OTP in verificationToken table (create or update, ensuring one token per user)
    await prisma.verificationToken.upsert({
      where: { userId: user.id },
      create: {
        identifier: email,
        token: otp.toString(),
        expiresAt: new Date(now.getTime() + OTP_EXPIRATION_TIME),
        userId: user.id,
      },
      update: {
        token: otp.toString(),
        expiresAt: new Date(now.getTime() + OTP_EXPIRATION_TIME),
      },
    });

    // Send OTP via email
    const emailResult = await sendVerificationEmail(email, otp);
    if (!emailResult.success) {
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    // Schedule cleanup of expired token (use cron job in production)
    setTimeout(async () => {
      try {
        await prisma.verificationToken.deleteMany({
          where: {
            userId: user.id,
            expiresAt: { lte: new Date() },
          },
        });
      } catch (error) {
        console.error('Token cleanup error:', error);
      }
    }, OTP_EXPIRATION_TIME);

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
