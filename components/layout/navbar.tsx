"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/public/logo-landscape-white.png";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
const navLinks = [
    { name: "Samples", href: "/" },
    { name: "Testimonials", href: "/" },
    { name: "Contacts", href: "/" },
    { name: "Log In", href: "/login" },
];

const navVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
        x: 0,
        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.4,
            staggerChildren: 0.25,
        },
    },
    exit: {
        x: "100%",
        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.4,
        },
    },
};

const linkVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleNavigation = (href: string) => {
        setIsOpen(false);
        // Navigate after animation completes (400ms as per navVariants exit duration)
        setTimeout(() => {
            router.push(href);
        }, 500);
    };

    return (
        <nav className="relative flex w-full justify-between items-center p-4 md:px-32">
            <Link href="/" className="w-fit max-md:w-[300px]">
                <Image src={Logo} alt="Logo" className="h-14 md:h-18 w-full" />
            </Link>

            <div className="w-full md:hidden flex justify-end z-50">
                {isOpen ? (
                    <XIcon size={28} onClick={() => setIsOpen(false)} className="cursor-pointer" />
                ) : (
                    <ListIcon size={28} onClick={() => setIsOpen(true)} className="cursor-pointer" />
                )}
            </div>

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
                <Button href="/register">
                    Try It Now
                </Button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 right-0 h-screen w-full bg-gray-100 text-black flex flex-col items-start pt-[100px] gap-4 px-4 z-40"
                    >
                        {[...navLinks, { name: "Register", href: "/register" }].map(
                            (item, index) => (
                                <motion.div
                                    key={index}
                                    variants={linkVariants}
                                >
                                    <button
                                        onClick={() => handleNavigation(item.href)}
                                        className="text-4xl font-medium hover:text-gray-500 transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </motion.div>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
