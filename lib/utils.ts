import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createTimestamp() {
  const now = new Date();
  const year = now.getFullYear().toString().padStart(4, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const date = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${year}${month}${date}${hours}${minutes}${seconds}`;
}

export function formatPhoneNumber(phoneNumber: string): string {
  phoneNumber = phoneNumber.replace(/\D/g, "");
  if (phoneNumber.startsWith("0")) {
    phoneNumber = "254" + phoneNumber.slice(1);
  }
  return phoneNumber;
}

export function formatMobileNumber(phoneObj: {
  Name: string;
  Value: number;
}): string {
  let phoneNumber = phoneObj.Value.toString(); // Convert the phone number to a string

  // Remove the country code '254' if it exists
  phoneNumber = phoneNumber.replace(/^254/, "");

  // Check if the number starts with '0' and remove it if it does
  if (!phoneNumber.startsWith("0")) {
    phoneNumber = "0" + phoneNumber;
  }

  return phoneNumber;
}
