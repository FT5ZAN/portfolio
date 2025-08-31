import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Skill from "@/models/Skill";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  // const items = await Skill.find().sort({ name: 1 });
  const items = await Skill.find().sort({ createdAt: 1 }); // Sort by creation date
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const created = await Skill.create(body);
  return NextResponse.json(created, { status: 201 });
}
