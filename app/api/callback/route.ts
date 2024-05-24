import { createUser } from "@/lib/actions/ticket.action";
import { NextResponse } from "next/server";
import qr from "qrcode";
import nodemailer from "nodemailer";
import SendMail from "../../(root)/send-email/page";

export async function POST(req: any, res: any) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const name = "J4y J3ff";
  console.log(email);

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const callbackData = await req.json();
  console.log("data:", callbackData);

  const body = callbackData.Body.stkCallback.CallbackMetadata;
  console.log("Metadata:", body);
  const phoneObj = body.Item.find((obj: any) => obj.Name === "PhoneNumber");

  const result_code = callbackData.Body.stkCallback.ResultCode;
  console.log("result_code", result_code);

  const phone = phoneObj.Value;

  if (result_code === 0) {
    const user = await createUser({
      name,
      email,
      phone,
    });

    const { email: userEmail, name: userName } = user;
    console.log(`User created: ${userName}, ${userEmail}`);

    ////////////////////Email Payload////////////////////////////
    //////////////////////QR CODE/////////////////////////////////
    SendMail({ phone, userEmail, userName });

    return NextResponse.redirect(
      "https://ticket-system-orpin.vercel.app/thank-you"
    );
  }

  return NextResponse.json({ message: ".This is a POST Request." });
}
