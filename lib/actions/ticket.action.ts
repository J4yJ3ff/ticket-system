"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

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
