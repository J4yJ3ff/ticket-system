import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <section className="my-auto h-[75vh] absolute top-0 flex items-center justify-center  text-secondary-100">
      <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          About Katine&apos;s Cultural Show
        </h1>
        <p className="max-w-3xl leading-normal text-secondary-400 sm:text-xl sm:leading-8">
          We invite you for an unforgettable cultural experience at the 2024
          Katine Cultural Show! Immerse yourself in a celebration of diversity,
          featuring vibrant performances, delicious cuisine, and captivating
          artistry. Don&apos;t miss out – buy your ticket now!
        </p>
      </div>
    </section>
  );
};

export default page;
