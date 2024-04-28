import React from "react";
import layout from "../layout";
import Navbar from "@/components/navbar/Navbar";
import LeftSideBar from "@/components/sidebar/LeftSideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="flex relative">
        <LeftSideBar />
        <section className="rounded-t-[30px] flex bg-primary-100 h-[82vh] flex-1 flex-col p-8 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
