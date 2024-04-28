import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thoughts be Things",
  description: "Ticketing app for the 2024 Katine Cultural show",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-primary-500 text-gray-300 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
