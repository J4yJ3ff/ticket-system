"use client";
import React from "react";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky gap-8 mr-5 flex w-fit flex-col overflow-y-auto max-md:hidden md:w-[150px] lg:w-[200px]">
      <div className="flex flex-1 flex-col gap-4 w-full h-screen">
        {navLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          const isHome = link.label.includes("Home");
          console.log(isHome);

          return (
            <div key={index}>
              <Link
                href={link.route}
                className={`${
                  isActive
                    ? "bg-red-500  rounded-lg font-bold"
                    : "text-gray-300"
                } ${
                  isHome && "rounded-tr-[30px]"
                } p-4 items-center justify-center flex`}
              >
                {link.label}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSideBar;
