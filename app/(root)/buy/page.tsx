"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { accessToken, express } from "@/lib/actions/daraja.action";
import { createUser } from "@/lib/actions/ticket.action";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  phone: number;
};

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, phone } = data;

    const access = await accessToken();
    const payment = await express({ access, phone });

    if (payment) {
      try {
        const user = await createUser({
          name,
          email,
          phone,
        });
        return NextResponse.json({ message: "User Created" });
      } catch (error: any) {
        throw new error();
      }
    }
  };

  return (
    <section className=" h-[75vh] flex gap-10 flex-col justify-center items-center">
      <h1 className="text-center text-2xl sm:text-3xl md:text-3xl lg:text-5xl">
        Fill in your Information to buy Ticket
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-8 bg-primary-500 rounded-lg text-primary-500"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <Input
          type="text"
          placeholder="Your Name"
          {...register("name", { required: true })}
          className="bg-slate-300"
        />

        {/* include validation with required or other standard HTML validation rules */}
        <Input
          type="email"
          placeholder="Your Email Address"
          {...register("email", { required: true })}
          className="bg-slate-300"
        />

        {/* errors will return when field validation fails  */}
        {errors.email && <span>This field is required</span>}

        <Input
          type="tel"
          placeholder="Phone Number"
          {...register("phone", { required: true })}
          className="bg-slate-300 text-primary-100"
        />

        <Button
          type="submit"
          className="bg-primary-base hover:bg-gray-800 text-gray-200"
        >
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Page;
