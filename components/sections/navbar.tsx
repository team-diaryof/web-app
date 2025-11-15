"use client";

import Logo from "@/public/logo-landscape-white.png";
import { useAuthStore } from "@/store/user";
import { ListIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
const navLinks = [
    { name: "Newsletter", href: "/newsletter" },
    { name: "Contacts", href: "/contact" },
];
// Root marketing navbar. Mobile version now uses shared Dropdown slide menu.

const Navbar = () => {
    const { isAuthenticated } = useAuthStore();
    const allNavLinks = [
        ...navLinks,
        ...(isAuthenticated
            ? [{ name: "Dashboard", href: "/dashboard" }]
            : [
                { name: "Log In", href: "/login" },
                { name: "Register", href: "/register" }
            ])
    ];

    return (
        <nav className="relative flex w-full justify-between items-center p-4 md:px-32">
            <Link href="/" className="w-fit max-md:w-[300px]">
                <Image src={Logo} alt="Logo" className="h-14 md:h-18 w-full" />
            </Link>

            {/* Desktop links */}
            <div className="max-md:hidden flex gap-8 items-center">
                {navLinks.map((item, index) => (
                    <Link
                        href={item.href}
                        key={index}
                        className="hover:text-gray-500 transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
                {isAuthenticated ? (
                    <Button href="/dashboard">Dashboard</Button>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="hover:text-gray-500 transition-colors"
                        >
                            Log In
                        </Link>
                        <Button href="/register">Try It Now</Button>
                    </>
                )}
            </div>

            {/* Mobile dropdown */}
            <div className="md:hidden flex justify-end w-full z-50">
                <Dropdown
                    align="right"
                    mobileSlideFrom="right"
                    trigger={<ListIcon size={28} />}
                    menuClassName="bg-gray-100"
                >
                    {allNavLinks.map((item, index) => (
                        <DropdownItem
                            key={index}
                            href={item.href}
                            className="hover:bg-gray-200"
                        >
                            {item.name}
                        </DropdownItem>
                    ))}
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
