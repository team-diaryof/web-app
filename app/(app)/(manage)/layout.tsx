import { Book, ChevronLeft, CreditCard, LayoutGrid, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

// Shared config so we can use it in the Navbar too if needed
export const SETTINGS_NAV_ITEMS = [
    { label: "General", icon: User, href: "/settings" },
    { label: "Profile", icon: User, href: "/settings/profile" },
    { label: "Security", icon: Lock, href: "/settings/password" },
    { label: "Notifications", icon: Mail, href: "/settings/notifications" },
    { label: "Billing", icon: CreditCard, href: "/settings/billing" },
    { label: "Integrations", icon: LayoutGrid, href: "/settings/integrations" },
];

export default function ManageLayout({ children }: { children: ReactNode }) {
    const activePath = "/settings"; // Placeholder for demo

    return (
        <div className="text-zinc-900 dark:text-zinc-100 font-sans">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 md:px-12">

                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Sidebar: HIDDEN on mobile (hidden), visible on large screens (lg:block) */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <nav className="flex flex-col space-y-1 sticky top-[115px]">
                            <div className="mb-8">
                                <Link href="/dashboard" className="inline-flex items-center text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-2">
                                    <ChevronLeft size={16} className="mr-1" /> Back to Dashboard
                                </Link>
                            </div>
                            
                            {SETTINGS_NAV_ITEMS.map((item) => {
                                const isActive = activePath === item.href;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                                            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            }`}
                                    >
                                        <span className={isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"}>
                                            <item.icon size={18} />
                                        </span>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 min-w-0 max-w-3xl">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}