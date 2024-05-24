// pages/api/example.js

import { createUser } from "@/lib/actions/ticket.action";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const name = "J4y J3ff";
  console.log(email);

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const data = await req.json();
  console.log("data:", data);

  const callbackMetadata = data.Body.stkCallback.CallbackMetadata;
  console.log("Metadata:", callbackMetadata);
  const phoneObj = callbackMetadata.Item.find(
    (obj: any) => obj.Name === "PhoneNumber"
  );

  const result_code = callbackMetadata.Body.stkCallback.ResultCode;
  console.log("result_code", result_code);

  const phone = phoneObj.Value;

  ////////////////////Email Payload////////////////////////////

  //////////////////////QR CODE/////////////////////////////////

  if (result_code === 0) {
    const user = await createUser({
      name,
      email,
      phone,
    });

    const { email: userEmail, name: userName } = user;
    console.log(`User created: ${userName}, ${userEmail}`);
  }

  return NextResponse.json({ message: "This is a POST Request" });
}
