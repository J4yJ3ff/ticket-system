// pages/api/example.js

import { getUserInfo } from "@/lib/actions/ticket.action";
import { formatMobileNumber } from "@/lib/utils";
import { NextResponse } from "next/server";
import qr from "qrcode";
import nodemailer from "nodemailer";

export async function POST(req: any, res: any) {
  const data = await req.json();
  console.log("data:", data);

  const callbackMetadata = data.Body.stkCallback.CallbackMetadata;
  console.log("Metadata:", callbackMetadata);
  const phoneObj = callbackMetadata.Item.find(
    (obj: any) => obj.Name === "PhoneNumber"
  );

  const result_code = callbackMetadata.Body.stkCallback.ResultCode;
  // const phoneObj = { Name: "PhoneNumber", Value: 254797919705 };
  console.log("PhoneObj:", phoneObj);

  const formattedPhone = formatMobileNumber(phoneObj);
  console.log("formattedPhone:", formattedPhone);

  const userInfo = await getUserInfo(formattedPhone);
  const { email, name }: { email: string; name: string } = userInfo;

  console.log(email, name);
  ////////////////////Email Payload////////////////////////////
  const payload = {
    phoneNumber: phoneObj.Value,
    email: email,
    name: name,
  };
  const jsonString = JSON.stringify(payload);
  // const encoded_data = btoa(jsonString);
  //////////////////////QR CODE/////////////////////////////////

  if (result_code === "0") {
    qr.toDataURL(
      jsonString,
      { errorCorrectionLevel: "H" },
      async (err, url) => {
        if (err) {
          console.log(err);
          return;
        }

        /////////////////////////Email -> NODEMAILER/////////////////////////

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PASS,
          },
        });

        let mailOptions = {
          from: {
            name: "Thought Be Things",
            address: "gaspergvj@gmail.com",
          },
          to: email,
          subject: "QR Code",
          text: "Thank you for purchasing the ticket. The attached qr will be used for you verification at the entrance",
          attachments: [
            {
              filename: "qrcode.png",
              content: url.split("base64,")[1],
              encoding: "base64",
            },
          ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log("Email sent: " + info.response);
        });
      }
    );
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
