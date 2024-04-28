import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <section className="my-auto h-[75vh] flex items-center justify-center  text-secondary-100">
      <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to 2024 Katine{" "}
          <span className="text-primary-400">Cultural Show</span>
        </h1>
        <p className="max-w-3xl leading-normal text-secondary-400 sm:text-xl sm:leading-8">
          We invite you for an unforgettable cultural experience at the 2024
          Katine Cultural Show! Immerse yourself in a celebration of diversity,
          featuring vibrant performances, delicious cuisine, and captivating
          artistry. Don&apos;t miss out – buy your ticket now!
        </p>
        <div className="flex gap-4 pt-8">
          <Link href="/buy">
            <Button className="bg-primary-500 hover:bg-primary-100">
              Buy Ticket
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
