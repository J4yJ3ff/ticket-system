// pages/api/example.js

import { NextResponse } from "next/server";

// pages/api/stkPushCallback.js

export async function POST(req: any, res: any) {
  const data = await req.json();

  const callbackMetadata = data.Body.stkCallback.CallbackMetadata;
  console.log(callbackMetadata);
  return NextResponse.json({ message: "This is a POST Request" });
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
