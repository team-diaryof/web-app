// components/pages/(app)/admin/admin-navbar.tsx
import Logo from "@/public/logo-landscape-white.png";
import Image from 'next/image';
import Link from 'next/link';
import AdminNavbarDropDown from "./admin-navbar-dropdown";

const AdminNavbar = () => {
    return (
        <div className='sticky top-0 left-0 z-40 bg-white'>
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                <Link href="/"> 
                    <Image src={Logo} className='h-12 md:h-14 w-fit' alt="Logo" width={1200} height={1200} />
                </Link>
                <AdminNavbarDropDown />
            </div>
        </div>
    )
}

export default AdminNavbar