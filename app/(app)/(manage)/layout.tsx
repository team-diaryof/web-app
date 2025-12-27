import React, { ReactNode } from "react";
import Link from "next/link";
import { CreditCard, LayoutGrid, Lock, Mail, User, Book, ChevronLeft } from "lucide-react";

// You can use usePathname from next/navigation in a real client component
// import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { label: "General", icon: User, href: "/settings" },
    { label: "Profile", icon: User, href: "/settings/profile" }, // Moved under settings for structure
    { label: "Security", icon: Lock, href: "/settings/password" },
    { label: "Notifications", icon: Mail, href: "/settings/notifications" },
    { label: "Billing", icon: CreditCard, href: "/settings/billing" },
    { label: "Integrations", icon: LayoutGrid, href: "/settings/integrations" },
];

export default function ManageLayout({ children }: { children: ReactNode }) {
    // const pathname = usePathname(); 
    const activePath = "/settings"; // Placeholder for demo

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-yellow-100 dark:selection:bg-yellow-900/30">
            <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 md:px-12">

                {/* Global Breadcrumb / Back Link */}

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <nav className="flex flex-col space-y-1 sticky top-[115px]">
                            <div className="mb-8">
                                <Link href="/dashboard" className="inline-flex items-center text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-2">
                                    <ChevronLeft size={16} className="mr-1" /> Back to Dashboard
                                </Link>
                            </div>
                            {NAV_ITEMS.map((item) => {
                                const isActive = activePath === item.href;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                                ? "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200/60 dark:border-zinc-800"
                                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            }`}
                                    >
                                        <span className={isActive ? "text-yellow-600 dark:text-yellow-500" : "text-zinc-400 dark:text-zinc-500"}>
                                            <item.icon size={18} />
                                        </span>
                                        {item.label}
                                    </Link>
                                );
                            })}

                            {/* Separator */}
                            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2 mx-2" />

                            <Link href="/your-diary" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                                <span className="text-zinc-400 dark:text-zinc-500"><Book size={18} /></span>
                                Your Diary
                            </Link>
                        </nav>
                    </aside>

                    {/* Content Area - Enforcing max-width for readability */}
                    <main className="flex-1 min-w-0 max-w-3xl">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}