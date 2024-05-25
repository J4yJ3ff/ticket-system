"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import nodemailer from "nodemailer";
import qr from "qrcode";

interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export async function getUserInfo(params: string) {
  try {
    connectToDatabase();

    const userPhone = params;

    const user = await User.findOne({ phone: userPhone });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();

    const userData = {
      name: params.name,
      email: params.email,
      phone: params.phone,
    };

    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { phone: userData.phone }],
    });

    if (existingUser) {
      console.log("User already exists");
      return existingUser;
    }

    ////////////////Create User////////////////
    const newUser = await User.create(userData);

    // if (newUser) {
    //   console.log("User created successfully", newUser);
    // }

    return {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function SendMail({
  phone,
  userEmail,
  userName,
}: {
  phone: string;
  userEmail: string;
  userName: string;
}) {
  console.log("Sending email to:", { phone, userEmail, userName });

  const payload = {
    phoneNumber: phone,
    email: userEmail,
    name: userName,
  };
  const jsonString = JSON.stringify(payload);
  console.log(jsonString);

  try {
    // Generate QR code
    const url = await qr.toDataURL(jsonString, { errorCorrectionLevel: "H" });
    console.log("QR Code generated");

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    const mailOptions = {
      from: {
        name: "Cultural Show",
        address: "info@nohoaxx.com",
      },
      to: userEmail,
      subject: "QR Code",
      text: "Thank you for purchasing the ticket. The attached QR code will be used for your verification at the entrance.",
      attachments: [
        {
          filename: "qrcode.png",
          content: url.split("base64,")[1],
          encoding: "base64",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
