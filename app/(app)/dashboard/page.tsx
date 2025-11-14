"use client";

import LeftSidebar from "@/components/sections/(app)/left-sidebar";
import AdminNavbar from "@/components/sections/(app)/navbar";
import AnimatePageWrapper from "@/components/wrapper/animate-page-wrapper";

export default function Dashboard() {


  return (
    <AnimatePageWrapper className="relative">
      <AdminNavbar />
      <div className="max-w-7xl relative z-20 flex max-md:flex-col mx-auto md:px-2 px-6">
        <LeftSidebar />
        <div className=" w-full md:w-[75%]">
          <div className="bg-red-400 w-full h-screen" />
          <div className="bg-green-400 w-full h-screen" />
          <div className="bg-pink-400 w-full h-screen" />
          <div className="bg-purple-400 w-full h-screen" />

        </div>

      </div>


    </AnimatePageWrapper>
  );
}