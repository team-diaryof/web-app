// app/api/v1/newsletter/subscribe/route.ts
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { email } = await request.json();

  if (email === "saquibali353@gmail.com")
    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 }
    );

  return NextResponse.json(
    { message: "Subscription successful" },
    { status: 500 }
  );
};
