import { createUser } from "@/lib/actions/ticket.action";
import { NextResponse } from "next/server";
import qr from "qrcode";
import nodemailer from "nodemailer";

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
    const payload = {
      phoneNumber: phone,
      email: email,
      name: name,
    };
    const jsonString = JSON.stringify(payload);
    // const encoded_data = btoa(jsonString);

    //////////////////////QR CODE/////////////////////////////////

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

    return NextResponse.redirect(
      `/thank-you?email=${encodeURIComponent(email)}&name=${encodeURIComponent(
        name
      )}`
    );
  }

  return NextResponse.json({ message: ".This is a POST Request." });
}
