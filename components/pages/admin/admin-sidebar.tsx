"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/public/logo-landscape-transparent.png";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

const menuItems = [
  {
    category: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ]
  },
  {
    category: "Communication",
    items: [
      { name: "Subscribers", href: "/admin/subscribers", icon: Users },
      { name: "Messages", href: "/admin/contacts", icon: MessageSquare },
    ]
  },
  {
    category: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
];

function AdminSidebar() {
  const pathname = usePathname();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { clearAuth, updateStatus } = useAuthStore();
  const router = useRouter();

  const logoutAdmin = async () => {
    setLogoutLoading(true);
    updateStatus("loading");
    router.push("/");
    setTimeout(() => {
      clearAuth();
      setLogoutLoading(false);
      toast.success("Logged out successfully.");
    }, 500);
  };

  return (
    <aside className="w-64 border-r border-zinc-200 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="h-16 flex items-center px-6 border-b border-zinc-200">
        <Image src={logo} className="w-full" alt="Diaryof Logo" />
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 overflow-y-auto py-6">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 my-3 px-2">
              {group.category}
            </h3>
            <div className="">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 p-3 transition-all duration-200 group",
                      isActive 
                        ? "bg-zinc-200 text-zinc-900 font-medium" 
                        : "hover:bg-zinc-50"
                    )}
                  >
                    <item.icon size={18} className={cn(isActive ? "text-zinc-900" : "text-zinc-500")} />
                    <span className="flex-1">{item.name}</span>
                    {isActive && <ChevronRight size={14} />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-200">
        <button onClick={logoutAdmin} disabled={logoutLoading} className={cn(
          "flex items-center gap-3 w-full px-6 cursor-pointer py-4 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors",
          logoutLoading && "opacity-50 cursor-not-allowed"
        )}>
          <LogOut size={18} />
          <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;