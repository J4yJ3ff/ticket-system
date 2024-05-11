// pages/api/example.js

import { getUserInfo } from "@/lib/actions/ticket.action";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// pages/api/stkPushCallback.js

export async function POST(req: any, res: any) {
  const data = await req.json();

  const callbackData = data.Body.stkCallback.CallbackMetadata;

  const result_code = callbackData.Body.stkCallback.ResultCode;

  const phoneObj = callbackData.Item.find(
    (obj: any) => obj.Name === "PhoneNumber"
  );
  const phone: string = phoneObj.Value;

  if (result_code !== 0) {
    // If the result code is not 0, there was an error
    const error_message = callbackData.Body.stkCallback.ResultDesc;
    const response_data = {
      ResultCode: result_code,
      ResultDesc: error_message,
    };
    return res.json(response_data);
  }

  // const userInfo = await getUserInfo(phone);

  // console.log(userInfo);

  // if (result_code === 0) {
  //   if (userInfo && typeof userInfo.email === "string") {
  //     const email = userInfo.user.email;
  //     const { data, error } = await resend.emails.send({
  //       from: "Acme <onboarding@resend.dev>",
  //       to: [{ email }],
  //       subject: "Cultural Show Ticket",
  //       html: "<strong>it works!</strong>",
  //     });

  //     if (error) {
  //       return res.status(400).json(error);
  //     }

  //     res.status(200).json(data);
  //   }
  // }

  return NextResponse.json({ message: "Successful Payment" });
}
