"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  tel: number;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("name")); // watch input value by passing the name of it

  return (
    <section className=" h-[75vh] flex gap-10 flex-col justify-center items-center">
      <h1 className="text-center text-2xl sm:text-3xl md:text-3xl lg:text-5xl">
        Fill in your Information to buy Ticket
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-8 bg-primary-500 rounded-lg"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <Input
          type="text"
          placeholder="Your Name"
          {...register("name")}
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
          {...register("tel", { required: true })}
          className="bg-slate-300"
        />

        <Button type="submit" className="bg-primary-base hover:bg-gray-800">
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Page;
