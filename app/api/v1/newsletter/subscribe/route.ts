import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    await connectDB();
    const isAlreadySubscribed = await Subscriber.findOne({ email });
    if (isAlreadySubscribed) {
      return NextResponse.json(
        { message: "Subscription successful" },
        { status: 200 }
      );
    }

    await Subscriber.create({ email });

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
