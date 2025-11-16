"use client";

import LeftSidebar from "@/components/sections/(app)/left-sidebar";
import RightSidebar from "@/components/sections/(app)/right-sidebar";
import TodayNotes from "@/components/sections/(app)/today-notes";
import AnimatePageWrapper from "@/components/wrapper/animate-page-wrapper";

export default function Dashboard() {


  return (
    <AnimatePageWrapper className="relative">
      <div className="max-w-7xl relative z-20 flex max-md:flex-col mx-auto md:px-2 px-6">
        <LeftSidebar />
        <div className=" w-full md:w-[75%]">
          <TodayNotes />
        </div>
        <RightSidebar />

      </div>


    </AnimatePageWrapper>
  );
}