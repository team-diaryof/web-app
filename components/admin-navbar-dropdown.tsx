// components/pages/(app)/admin/admin-navbar-dropdown.tsx
"use client"
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import Loading from '@/components/ui/loading';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AdminNavbarDropDown = () => {
    const [logoutLoading, setLogoutLoading] = useState(false)
    const { clearAuth } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        setLogoutLoading(true);
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setTimeout(() => {
                    clearAuth();
                    setLogoutLoading(false);
                    resolve();
                },500)

                router.replace("/");
                toast.success("Logged out successfully.");
            }, 1000);
        });
    };

    return (
        <Dropdown align='right' trigger={<MenuIcon className="w-6 h-6 cursor-pointer" aria-label="Open menu" />}>
            <div>
                <DropdownItem href='/dashboard' className='font-medium'>Dashboard</DropdownItem>
                <DropdownItem href='/profile' className='font-medium'>Profile</DropdownItem>
                <DropdownItem href='/settings' className='font-medium'>Setting</DropdownItem>
            </div>
            <DropdownItem
                className='bg-black text-white h-12'
                onClick={handleLogout}
                preventClose // keep dropdown open while logging out
            >
                <AnimatePresence mode="wait">
                    {
                        logoutLoading ?
                            <motion.div key="loading" className=' flex items-center gap-2' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                                Logging out <Loading dark size='sm' />
                            </motion.div>
                            :
                            <motion.span key="logout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                Logout
                            </motion.span>
                    }
                </AnimatePresence>
            </DropdownItem>
        </Dropdown>
    )
}

export default AdminNavbarDropDown