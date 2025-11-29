"use client";

import { Users, MessageSquare, TrendingUp, Calendar } from "lucide-react";

// Mock stats for the dashboard view
const stats = [
  { label: "Total Subscribers", value: "1,204", change: "+12%", icon: Users, color: "bg-blue-500" },
  { label: "New Messages", value: "18", change: "+4", icon: MessageSquare, color: "bg-emerald-500" },
  { label: "Active Readers", value: "842", change: "+8%", icon: TrendingUp, color: "bg-purple-500" },
  { label: "Scheduled Posts", value: "3", change: "0", icon: Calendar, color: "bg-amber-500" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Welcome back, Admin. Here is what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-zinc-900 mt-2">{stat.value}</h3>
              <span className="inline-block mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {stat.change} from last month
              </span>
            </div>
            <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg shadow-zinc-200`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Recent Activity Graph */}
      <div className="bg-white h-64 rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-400">
         [Graph Component Would Go Here]
      </div>
    </div>
  );
}