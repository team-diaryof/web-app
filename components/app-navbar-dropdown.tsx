"use client"
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import Loading from '@/components/ui/loading';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AppNavbarDropDown = () => {
    const [logoutLoading, setLogoutLoading] = useState(false)
    const { clearAuth, user } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        setLogoutLoading(true);
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                clearAuth();
                setLogoutLoading(false);
                toast.success("Logged out successfully.");
                router.push("/");
                resolve();
            }, 1000);
        });
    };

    return (
        <Dropdown 
            align='right' 
            trigger={
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="size-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-medium">
                        {user?.name ? user.name.substring(0,2).toUpperCase() : "U"}
                    </div>
                </div>
            }
        >
            <div className="p-2 border-b border-zinc-100 mb-1">
                <p className="text-sm font-medium text-zinc-900 truncate px-2">{user?.name || "User"}</p>
                <p className="text-xs text-zinc-500 truncate px-2">{user?.email}</p>
            </div>
            
            <div className="py-1">
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
                <DropdownItem href='/settings'>
                    <div className="flex items-center gap-2">
                        <Settings size={16} />
                        <span>Settings</span>
                    </div>
                </DropdownItem>
            </div>

            <div className="pt-1 mt-1 border-t border-zinc-100">
                <DropdownItem
                    className='text-red-600 hover:bg-red-50 hover:text-red-700'
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
            </div>
        </Dropdown>
    )
}

export default AppNavbarDropDown