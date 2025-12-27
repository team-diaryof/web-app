"use client";

import { useState } from "react";
import AppLeftSidebar from "@/components/app-left-sidebar";
import AppRightSidebar from "@/components/app-right-sidebar";
import TodayNotes from "@/components/today-notes";
import NewEntryModal from "@/components/new-entry-modal";
import { PenLine } from "lucide-react";
import { motion } from "framer-motion";
import AnimatePageWrapper from "@/components/animations/animate-page-wrapper";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AnimatePageWrapper className="">
      <NewEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="hidden lg:block w-64 h-[calc(100vh-65px)] sticky top-[65px] shrink-0">
            <AppLeftSidebar />
          </aside>

          <main className="flex-1 min-w-0">

            <motion.div
              layoutId="new-entry-card"
              onClick={() => setIsModalOpen(true)}
              className="mb-8 group cursor-text sticky top-[65px] bg-white dark:bg-black border-b md:pt-3 border-zinc-200 dark:border-zinc-800 z-10"
              initial={{ opacity: 1 }}
            >
              <div className="rounded-2xl p-4 transition-all duration-200 flex items-center gap-4">
                <motion.div layoutId="new-entry-icon"
                  className="h-10 w-10 rounded-full border border-zinc-100 dark:border-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
                >
                  <PenLine size={18} />
                </motion.div>
                <div className="flex-1">
                  <motion.span layoutId="new-entry-placeholder" className="text-zinc-400 dark:text-zinc-500 text-lg group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors">
                    Write something for today...
                  </motion.span>
                </div>
              </div>
            </motion.div>

            <TodayNotes />
          </main>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-80 shrink-0">
            <div className="sticky top-24">
              <AppRightSidebar />
            </div>
          </aside>

        </div>
      </div>
    </AnimatePageWrapper>
  );
}