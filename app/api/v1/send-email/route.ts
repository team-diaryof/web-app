import sendEmail from '@/lib/email';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const secret = req.headers.get('authorization-token');

    if (secret !== process.env.EMAIL_API_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { to, subject, html } = await req.json();
    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const result = await sendEmail({ to, subject, html });

    return result.success
      ? NextResponse.json({ message: 'Email sent successfully' })
      : NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  } catch (err) {
    console.error('Send email error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}