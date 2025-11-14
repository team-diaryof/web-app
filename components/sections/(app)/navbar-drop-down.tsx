import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import Loading from '@/components/ui/loading';
import { useAuthStore } from '@/store/user';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NavbarDropDown = () => {
    const [logoutLoading, setLogoutLoading] = useState(false)
    const { clearAuth } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        setLogoutLoading(true);
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                clearAuth();
                setLogoutLoading(false);
                router.push("/");
                resolve();
            }, 1000);
        });
    };

    return (
        <Dropdown align='right' trigger={<MenuIcon className="w-6 h-6 cursor-pointer" />}>
            <DropdownItem href='/profile'>
                Profile
            </DropdownItem>
            <DropdownItem href='/settings'>
                Setting
            </DropdownItem>
            <DropdownItem className='bg-black text-white h-12' onClick={handleLogout}>
                <AnimatePresence mode="wait">
                    {
                        logoutLoading ?
                            <motion.div key="loading" className=' flex items-center gap-2' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                                Logging out <Loading size='xs' />
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

export default NavbarDropDown