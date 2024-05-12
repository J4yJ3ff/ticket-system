// pages/api/example.js

import { getUserInfo } from "@/lib/actions/ticket.action";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: any, res: any) {
  const data = await req.json();
  console.log(data);
  return NextResponse.json({ message: "This is a POST Request" });
}
