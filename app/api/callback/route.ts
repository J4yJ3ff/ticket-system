// pages/api/example.js

import { getUserInfo } from "@/lib/actions/ticket.action";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// pages/api/stkPushCallback.js

export async function POST(req: any, res: any) {
  const data = await req.json();

  const callbackData = data.Body.stkCallback.CallbackMetadata;

  const result_code = callbackData.Body.stkCallback.ResultCode;
  console.log(result_code);

  const phoneObj = callbackData.Item.find(
    (obj: any) => obj.Name === "PhoneNumber"
  );
  const phone: string = phoneObj.Value;
  console.log(phone);

  if (result_code !== 0) {
    // If the result code is not 0, there was an error
    const error_message = callbackData.Body.stkCallback.ResultDesc;
    const response_data = {
      ResultCode: result_code,
      ResultDesc: error_message,
    };
    return NextResponse.json(response_data);
  }

  if (result_code === 0) {
    const userInfo = await getUserInfo(phone);

    console.log(userInfo);
  }
  return NextResponse.json({ message: "Successful Payment" });
}
