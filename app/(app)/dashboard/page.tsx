"use client";
import AppLeftSidebar from "@/components/app-left-sidebar";
import AppRightSidebar from "@/components/app-right-sidebar";
import TodayNotes from "@/components/today-notes";
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <AppLeftSidebar />
            </div>
          </aside>

          {/* Main Feed */}
          <main className="flex-1 min-w-0">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight">Today&apos;s Entries</h1>
              <p className="text-zinc-500 mt-1">Capture your moments as they happen.</p>
            </div>
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
    </div>
  );
}