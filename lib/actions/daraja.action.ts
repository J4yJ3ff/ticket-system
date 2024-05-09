"use server";

import axios from "axios";
import { createTimestamp, formatPhoneNumber } from "../utils";
import ngrok from "ngrok";
interface accessProps {
  access: string;
  phone: string;
}

export async function accessToken() {
  const auth = Buffer.from(
    `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////STK Push/////////////////////////////

export async function express(data: accessProps) {
  const { access, phone } = data;

  const formattedNumber = formatPhoneNumber(phone);

  const headers = {
    Authorization: `Bearer ${access}`,
  };

  const timestamp = createTimestamp();

  const password = Buffer.from(
    "174379" +
      "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
      timestamp
  ).toString("base64");

  // const CallBackUrl = await ngrok.connect(3000);
  // console.log(CallBackUrl);

  //////////////////////Payment data////////////////////////////
  const paymentData = {
    BusinessShortCode: "174379",
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: "1",
    PartyA: formattedNumber,
    PartyB: "174379",
    PhoneNumber: formattedNumber,
    CallBackURL: `https://ticket-system-orpin.vercel.app/api/callback`,
    AccountReference: "TBT",
    TransactionDesc: "Cultural Show",
  };
  //////////////////////////Try Catch Block/////////////////////////

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      paymentData,
      { headers }
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.log("Request failed");
      return { status: 400, data: { message: "Request failed" } };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: "Internal server error" } };
  }
}
