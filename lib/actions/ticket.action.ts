"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export async function getUserByPhone(params: any) {
  try {
    connectToDatabase();

    const { userPhone } = params;

    const user = await User.findOne({ phone: userPhone });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
