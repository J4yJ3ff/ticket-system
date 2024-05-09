// pages/api/example.js

import { NextResponse } from "next/server";

// pages/api/stkPushCallback.js

export async function POST(req: any, res: any) {
  const data = await req.json();
  console.log(data);
  return NextResponse.json({ message: "This is a POST Request" });
}
