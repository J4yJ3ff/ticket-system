"use server";

import axios from "axios";
import { NextResponse } from "next/server";
import { createTimestamp } from "../utils";

interface accessProps {
  access: string;
  phone: number;
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

export async function express(data: accessProps) {
  const { access, phone } = data;

  const headers = {
    Authorization: `Bearer ${access}`,
  };

  const timestamp = createTimestamp();

  const password = Buffer.from(
    "174379" +
      "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
      timestamp
  ).toString("base64");

  const paymentData = {
    BusinessShortCode: "174379",
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: "1",
    PartyA: "254708374149",
    PartyB: "174379",
    PhoneNumber: "254708374149",
    CallBackURL: "https://ticket-system-orpin.vercel.app/profile",
    AccountReference: "TBT",
    TransactionDesc: "Cultural Show",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      paymentData,
      { headers }
    );
    if (response.status === 200) {
      console.log("Payment successful");
      return {
        status: 200,
        data: { message: "OK, payment success" },
        response,
      };
    } else {
      console.log("Payment failed");
      return { status: 400, data: { message: "Payment failed" } };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: "Internal server error" } };
  }
}
