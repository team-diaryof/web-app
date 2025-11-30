"use client";

import Button from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import Logo from "@/public/logo-landscape-transparent.png";
import { useAuthStore } from "@/store/auth";
import { useThemeStore } from "@/store/theme";
import { AnimatePresence, motion } from "framer-motion";
import { X as CloseIcon, Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
    { name: "Newsletter", href: "/newsletter" },
    { name: "Download", href: "/#download" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    const { status } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isAuthScreens = pathname === "/login" || pathname === "/register";

    useEffect(() => {
        if (mobileOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
    }, [mobileOpen]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Helper to determine width based on status
    const getContainerWidth = () => {
        if (status === "loading") return 205; // Enough for 2 buttons + gap
        if (status === "authenticated") return 120; // Dashboard button only
        return 205; // Login + Register buttons
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={`fixed top-0 inset-x-0 z-50 bg-white dark:bg-black animate-theme border-b 
                ${scrolled
                        ? "border-zinc-200 dark:border-zinc-900 py-2"
                        : "border-transparent py-4"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="relative z-50">
                        <Image
                            src={Logo}
                            alt="Logo"
                            className="h-12 dark:brightness-0 dark:invert w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <motion.div className="hidden md:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <Button key={item.name} href={item.href} variant="empty" className="dark:text-zinc-300 dark:hover:text-white">
                                {item.name}
                            </Button>
                        ))}

                        {/* Theme Toggle Button (Desktop) */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full cursor-pointer text-zinc-500 group hover:text-black dark:hover:text-white animate-theme"
                        >
                            {theme === 'dark' ? <Sun size={20} className="group-active:animate-spin" /> : <Moon className="" size={20} />}
                        </button>

                        {/* Auth Buttons Container */}
                        {!isAuthScreens && (
                            <motion.div
                                initial={{ width: 195, opacity: 0 }}
                                animate={{
                                    width: getContainerWidth(),
                                    opacity: 1
                                }}
                                transition={{
                                    opacity: { duration: 0.2 }
                                }}
                                className="pl-4 border-l border-zinc-200 dark:border-zinc-800 animate-theme flex items-center justify-end overflow-hidden"
                            >
                                <AnimatePresence mode="wait">
                                    {status === "loading" ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex gap-3 w-full justify-end"
                                        >
                                            <Button className="w-[78px]" variant="secondary" href="/login" size="sm">
                                                <Loading size={"sm"} />
                                            </Button>
                                            <Button className="w-[100px]" href="/register" size="sm">
                                                <Loading dark size={"sm"} />
                                            </Button>
                                        </motion.div>
                                    ) : status === "authenticated" ? (
                                        <motion.div
                                            key="auth"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-full flex justify-end"
                                        >
                                            <Button href={"/dashboard"} size="sm">Dashboard</Button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="guest"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex gap-3 w-full justify-end"
                                        >
                                            <Button variant="secondary" href="/login" size="sm">Log In</Button>
                                            <Button href="/register" size="sm">Get Started</Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Mobile Actions (Theme Toggle + Menu) */}
                    <div className="flex md:hidden items-center gap-3">
                        {/* Mobile Auth Button Logic matches desktop but without width animation for simplicity on mobile header */}
                        <Button className="w-[96px]" size="sm" disabled={status == "loading"} href={status === "authenticated" ? "/dashboard" : "/register"}>
                            <AnimatePresence mode="wait">
                                {status === "loading" ? (
                                    <Loading size="xs" dark={theme === 'light'} />
                                ) : status === "authenticated" ?
                                    <motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>Dashboard</motion.span>
                                    :
                                    <motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>Login</motion.span>
                                }
                            </AnimatePresence>
                        </Button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-zinc-900 dark:text-white"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {!mobileOpen && (
                            <button
                                className="p-2 -mr-2 text-zinc-900 dark:text-white"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-zinc-950 flex flex-col px-6 md:hidden w-screen h-screen"
                    >
                        <div className="flex items-center justify-between py-4">
                            <Link href="/" onClick={() => setMobileOpen(false)}>
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    className="h-12 w-auto object-contain"
                                    priority
                                />
                            </Link>
                            <button
                                className="p-2 -mr-2 text-zinc-900 dark:text-white"
                                onClick={() => setMobileOpen(false)}
                            >
                                <CloseIcon size={28} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 text-2xl font-medium mt-8">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="border-b border-zinc-100 dark:border-zinc-800 pb-4 text-zinc-900 dark:text-zinc-100"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;