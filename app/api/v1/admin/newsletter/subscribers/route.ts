import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

export const GET = async () => {
  try {
    await connectDB();
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: subscribers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching subscribers" }, { status: 500 });
  }
};