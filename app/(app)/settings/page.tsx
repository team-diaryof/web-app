"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Bell, Lock, User, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <nav className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                activeTab === tab.id
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-white rounded-2xl border border-zinc-200 p-8">
            
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-zinc-900">Personal Information</h2>
                  <p className="text-sm text-zinc-500">Update your personal details.</p>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" defaultValue="Saquib" />
                    <Input label="Last Name" defaultValue="Ali" />
                  </div>
                  <Input label="Email" defaultValue="demo@example.com" disabled />
                  <Input label="Bio" placeholder="Tell us a little about yourself" />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium text-zinc-900">Notifications</h2>
                        <p className="text-sm text-zinc-500">Manage how you receive updates.</p>
                    </div>
                    <div className="space-y-4">
                        {["Daily Reminders", "Weekly Digest", "New Features", "Security Alerts"].map((item) => (
                            <div key={item} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
                                <span className="text-sm font-medium text-zinc-700">{item}</span>
                                <div className="h-6 w-11 bg-zinc-200 rounded-full relative cursor-pointer">
                                    <div className="absolute top-1 left-1 bg-white size-4 rounded-full shadow-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

             {activeTab === "security" && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium text-zinc-900">Security</h2>
                        <p className="text-sm text-zinc-500">Manage your password and security settings.</p>
                    </div>
                    <div className="space-y-4">
                        <Input type="password" label="Current Password" />
                        <Input type="password" label="New Password" />
                        <div className="pt-4 flex justify-end">
                            <Button>Update Password</Button>
                        </div>
                    </div>
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}