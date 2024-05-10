// pages/api/example.js

import { getUserByPhone } from "@/lib/actions/ticket.action";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// pages/api/stkPushCallback.js

export async function POST(req: any, res: any) {
  const data = await req.json();

  const callbackMetadata = data.Body.stkCallback.CallbackMetadata;
  console.log(callbackMetadata);

  const result_code = callbackMetadata.Body.stkCallback.ResultCode;
  const phoneObj = callbackMetadata.Item.find(
    (obj: any) => obj.Name === "PhoneNumber"
  );
  const phone = phoneObj.Value;

  if (result_code !== 0) {
    // If the result code is not 0, there was an error
    const error_message = callbackMetadata.Body.stkCallback.ResultDesc;
    const response_data = {
      ResultCode: result_code,
      ResultDesc: error_message,
    };
    return res.json(response_data);
  }

  if (result_code === 0) {
    const user: string = await getUserByPhone(phone);
    const email: string = user.email;

    if (user) {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [{ email }],
        subject: "Cultural Show Ticket",
        html: "<strong>it works!</strong>",
      });

      if (error) {
        return res.status(400).json(error);
      }

      res.status(200).json(data);
    }
  }

  return NextResponse.json({ message: "Successful Payment" });
}

// {
//     Body: {
//       stkCallback: {
//         MerchantRequestID: '7071-4170-a0e4-8345632bad44407220',
//         CheckoutRequestID: 'ws_CO_09052024123348699797919705',
//         ResultCode: 0,
//         ResultDesc: 'The service request is processed successfully.',
//         CallbackMetadata: [Object]
//       }
//     }
//   }

{
  Item: [
    { Name: "Amount", Value: 1 },
    { Name: "MpesaReceiptNumber", Value: "SEA1R4BQ67" },
    { Name: "Balance" },
    { Name: "TransactionDate", Value: 20240510022735 },
    { Name: "PhoneNumber", Value: 254797919705 },
  ];
}
