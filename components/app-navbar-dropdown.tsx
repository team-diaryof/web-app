"use client"
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import Loading from '@/components/ui/loading';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Settings, LogOut, LayoutDashboard, CreditCard, Book } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AppNavbarDropDown = () => {
    const [logoutLoading, setLogoutLoading] = useState(false)
    const { clearAuth, user,updateStatus } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        setLogoutLoading(true);
        updateStatus("loading");
        return new Promise<void>((resolve) => {
            
            router.push("/");
            setTimeout(() => {
                clearAuth();
                setLogoutLoading(false);
                toast.success("Logged out successfully.");
                resolve();
            }, 500);
        });
    };

    return (
        <Dropdown
            position='bottom-left'
            trigger={
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="size-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-medium">
                        {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                    </div>
                </div>
            }
            menuClassName=''
        >
            <div className="p-2 border-b border-zinc-100">
                <p className="text-sm font-medium text-zinc-900 truncate px-2">{user?.name || "User"}</p>
                <p className="text-xs text-zinc-500 truncate px-2">{user?.email}</p>
            </div>

            <DropdownItem href='/dashboard'>
                <div className="flex items-center gap-2">
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                </div>
            </DropdownItem>
            <DropdownItem href='/profile'>
                <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Profile</span>
                </div>
            </DropdownItem>
            <DropdownItem href='/diary'>
                <div className="flex items-center gap-2">
                    <Book size={16} />
                    <span>Your Diary</span>
                </div>
            </DropdownItem>
            <DropdownItem href='/subscription'>
                <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    <span>Subscription</span>
                </div>
            </DropdownItem>
            <DropdownItem href='/settings'>
                <div className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Settings</span>
                </div>
            </DropdownItem>

            <DropdownItem
                className='bg-red-500 md:rounded-b-md py-5 hover:bg-red-500 text-white'
                onClick={handleLogout}
                preventClose
            >
                <AnimatePresence mode="wait">
                    {logoutLoading ? (
                        <motion.div key="loading" className='flex items-center gap-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Loading size='xs' /> Logging out...
                        </motion.div>
                    ) : (
                        <motion.div key="logout" className="flex items-center gap-2">
                            <LogOut size={16} />
                            <span>Log out</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DropdownItem>
        </Dropdown>
    )
}

export default AppNavbarDropDown