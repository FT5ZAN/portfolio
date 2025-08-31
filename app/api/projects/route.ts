import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const items = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const created = await Project.create(body);
  return NextResponse.json(created, { status: 201 });
}
