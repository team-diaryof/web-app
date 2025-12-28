"use client";

import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import Loading from '@/components/ui/loading';
import { useAuthStore } from '@/store/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, LayoutDashboard, Book, User, Lock, Bell, CreditCard, LayoutGrid, X } from 'lucide-react';
import { useState } from 'react';
import { signOut } from "next-auth/react"; 

const SETTINGS_MENU = [
    { label: "General", icon: User, href: "/settings" },
    { label: "Security", icon: Lock, href: "/settings/password" },
    { label: "Billing", icon: CreditCard, href: "/settings/billing" },
    { label: "Profile", icon: User, href: "/settings/profile" },
];

const AppNavbarDropDown = () => {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const { clearAuth, user, updateStatus } = useAuthStore();

    const handleLogout = async () => {
        setLogoutLoading(true);
        updateStatus("loading");
        clearAuth();
        await signOut({ callbackUrl: "/", redirect: true });
    };

    return (
        <Dropdown
            position='bottom-left'
            trigger={
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="size-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-medium border border-zinc-200 dark:border-zinc-800">
                        {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                    </div>
                </div>
            }
            // MODIFIED: Forces full screen on mobile (max-md), standard width on desktop
            menuClassName='w-56 max-md:fixed max-md:inset-0 max-md:w-screen max-md:h-screen max-md:max-w-none max-md:rounded-none max-md:border-none max-md:bg-white dark:max-md:bg-blacked max-md:z-[100] max-md:flex max-md:flex-col'
        >


            {/* User Info (Desktop only or styled differently) */}
            <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 max-md:hidden">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">{user?.name || "User"}</p>
                <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>

            <div className="flex-1 overflow-y-auto max-md:p-4">
                <div className="p-1 space-y-1">
                    <DropdownItem href='/dashboard' className="max-md:py-3 max-md:text-base">
                        <div className="flex items-center gap-3 md:gap-2">
                            <LayoutDashboard size={18} className="md:w-4 md:h-4" />
                            <span>Dashboard</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem href='/diary' className="max-md:py-3 max-md:text-base">
                        <div className="flex items-center gap-3 md:gap-2">
                            <Book size={18} className="md:w-4 md:h-4" />
                            <span>Your Diary</span>
                        </div>
                    </DropdownItem>
                </div>

                {/* SETTINGS SUB-SECTION */}
                <div className="border-t border-zinc-100 dark:border-zinc-800 p-1 mt-2 space-y-1">
                    <div className="px-2 py-1.5 text-[10px] md:text-[10px] font-semibold text-zinc-400 uppercase tracking-wider max-md:mt-4 max-md:mb-2">
                        Settings
                    </div>
                    {SETTINGS_MENU.map((item) => (
                        <DropdownItem key={item.label} href={item.href} className="max-md:py-3 max-md:text-base">
                            <div className="flex items-center gap-3 md:gap-2">
                                <item.icon size={18} className="text-zinc-400 md:w-4 md:h-4" />
                                <span>{item.label}</span>
                            </div>
                        </DropdownItem>
                    ))}
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 p-1 mt-2">
                    <DropdownItem
                        className='text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 max-md:py-4 max-md:text-base'
                        onClick={handleLogout}
                        preventClose
                    >
                        <AnimatePresence mode="wait">
                            {logoutLoading ? (
                                <motion.div key="loading" className='flex items-center gap-3 md:gap-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <Loading size='xs' /> <span>Logging out...</span>
                                </motion.div>
                            ) : (
                                <motion.div key="logout" className="flex items-center gap-3 md:gap-2">
                                    <LogOut size={18} className="md:w-4 md:h-4" />
                                    <span>Log out</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </DropdownItem>
                </div>
            </div>
        </Dropdown>
    );
};

export default AppNavbarDropDown;