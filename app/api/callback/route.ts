// pages/api/example.js

import { useGlobalContext } from "@/context/UserProvider";
import { getUserInfo } from "@/lib/actions/ticket.action";
import { formatMobileNumber } from "@/lib/utils";
import { NextResponse } from "next/server";
import { useEffect } from "react";
import { Resend } from "resend";

export async function POST(req: any, res: any) {
  const data = await req.json();
  console.log("data:", data);

  const callbackMetadata = data.Body.stkCallback.CallbackMetadata;
  console.log("Metadata:", callbackMetadata);
  const phoneObj = callbackMetadata.Item.find(
    (obj: any) => obj.Name === "PhoneNumber"
  );

  const result_code = callbackMetadata.Body.stkCallback.ResultCode;

  console.log("PhoneObj:", phoneObj);

  const formattedPhone = formatMobileNumber(phoneObj);
  console.log("formattedPhone:", formattedPhone);

  const userInfo = await getUserInfo(formattedPhone);
  const { email, name }: { email: string; name: string } = userInfo;

  console.log(email, name);
  ////////////////////Email Payload////////////////////////////
  //////////////////////Qr_Encode//////////////////////////////

  if (result_code) {
  }

  return NextResponse.json({ message: "This is a POST Request" });
}

// step 1 - extract the payment code from the json data, if successful, start building email payload,
// otherwise, return "Payment failed".

// if successful, fetch the name, phone number and email from the database.
// convert these three values into json string.
// encode these values into qr code,
// email the qr code to that user.

////////////////////////////////////////////////////////////////////

// const { userId, setUserId, data, setData } = useGlobalContext();

// useEffect(() => {
//   setUserId("2");
//   setData([
//     { firstName: "Tim" },
//     { firstName: "Michael" },
//     { firstName: "Kyle" },
//   ]);
// });

// <div className="flex">
//   <p>User ID: {userId}</p>
//   <p>
//     First Names:{" "}
//     {data.map((e: any, i: any) => (
//       <p key={i}>{e.firstName}</p>
//     ))}
//   </p>
// </div>;
