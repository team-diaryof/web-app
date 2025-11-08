import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { email } = await request.json();

  // Here you would typically add the email to your database or email service provider
  console.log(`New subscription request for email: ${email}`);
  return NextResponse.json(
    { message: "Subscription successful" },
    { status: 200 }
  );
};
