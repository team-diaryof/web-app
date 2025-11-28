"use client";

import Button from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Calendar, MapPin, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        
        {/* Cover / Header */}
        <div className="h-32 bg-zinc-100 border-b border-zinc-100"></div>
        
        <div className="px-8 pb-8">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="relative">
              <div className="size-24 rounded-full bg-white p-1 border border-zinc-200">
                <div className="size-full rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  {/* Placeholder Avatar if no image */}
                  <User size={40} />
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit Profile</Button>
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">{user?.name || "User Name"}</h1>
            <p className="text-zinc-500">@{user?.email?.split('@')[0]}</p>
          </div>

          <div className="flex gap-6 mt-6 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Patna, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Joined {new Date().getFullYear()}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-8 border-t border-zinc-100 pt-8">
            {[
              { label: "Total Entries", value: "142" },
              { label: "Current Streak", value: "12 days" },
              { label: "Words Written", value: "45k" }
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 text-center">
                <div className="text-2xl font-semibold text-zinc-900">{stat.value}</div>
                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}