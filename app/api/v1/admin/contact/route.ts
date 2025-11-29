import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export const GET = async () => {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching messages" }, { status: 500 });
  }
};