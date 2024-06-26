"use client";
import Image from "next/image";
import React from "react";
import Logo from "../../public/Logo.svg";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link, index) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        const isHome = link.label.includes("Home");
        console.log(isHome);

        return (
          <SheetClose asChild key={index}>
            <Link
              href={link.route}
              className={`${
                isActive
                  ? "bg-primary-base rounded-lg font-bold"
                  : "text-gray-300"
              } w-full py-2 px-4 items-center justify-center flex my-8`}
            >
              {link.label}
            </Link>
          </SheetClose>
        );
      })}
    </>
  );
};

const Navbar = () => {
  return (
    <nav className="flex relative items-center my-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -my-6 max-md:left-[60px]">
        <Link href="/">
          <Image src={Logo} width={48} height={48} alt="Logo" />
        </Link>
      </div>
      <div className="absolute top-0 right-1/2 translate-x-1/2 -my-6 md:hidden max-md:right-[60px]">
        <Sheet>
          <SheetTrigger>
            <Menu height={48} width={48} className="text-primary-base" />
          </SheetTrigger>
          <SheetContent
            side="top"
            className="rounded-b-[30px] bg-primary-500 border-none flex flex-1 items-center justify-center"
          >
            <SheetClose>
              <NavContent />
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
