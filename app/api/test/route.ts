import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: "✅ MongoDB Connected" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "❌ Connection failed" }, { status: 500 });
  }
}
