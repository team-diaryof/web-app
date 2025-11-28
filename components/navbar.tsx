"use client";

import Button from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import Logo from "@/public/logo-landscape-white.png";
import { useAuthStore } from "@/store/auth";
import { AnimatePresence, motion } from "framer-motion";
import { X as CloseIcon, Menu } from "lucide-react";
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isAuthScreens = pathname === "/login" || pathname === "/register";

    useEffect(() => {
        if (mobileOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
    }, [mobileOpen]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 inset-x-0 z-50 bg-white transition-all duration-300 border-b ${scrolled ? "border-zinc-100 py-1.5" : "border-transparent py-4"}`}>
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="relative z-50">
                        <Image
                            src={Logo}
                            alt="Logo"
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <motion.div
                        layout
                        className="hidden md:flex items-center gap-8"
                    >
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Auth Buttons Container */}
                        {
                            isAuthScreens ? null :
                                <motion.div
                                    layout
                                    className="pl-4 border-l border-zinc-200 flex items-center justify-end min-w-[140px]"
                                >
                                    <AnimatePresence mode="wait">
                                        {status === "loading" ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                layout="position"
                                                className="flex gap-3"
                                            >
                                                <Button className="w-20 opacity-70" variant="ghost" size="sm" disabled>
                                                    <Loading size="sm" dark />
                                                </Button>
                                                <Button className="w-24 opacity-70" size="sm" disabled>
                                                    <Loading size="sm" />
                                                </Button>
                                            </motion.div>
                                        ) : status === "authenticated" ? (
                                            <motion.div
                                                key="auth"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                layout="position"
                                                className="w-full flex justify-end"
                                            >
                                                <Button href={"/dashboard"} size="sm">
                                                    Dashboard
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="guest"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                layout="position"
                                                className="flex gap-3"
                                            >
                                                <Button variant="ghost" href="/login" size="sm">Log In</Button>
                                                <Button href="/register" size="sm">Get Started</Button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                        }
                    </motion.div>

                    {/* Mobile Toggle Button (Visible only when menu is CLOSED) */}
                    {!mobileOpen && (
                        <button
                            className="md:hidden z-50 p-2 -mr-2 text-zinc-900 relative"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile Menu - Bottom Slide-up Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ x: "100%" }} // Start from right
                        animate={{ x: 0 }}      // Slide in to cover screen
                        exit={{ x: "100%" }}    // Slide out to the right
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col px-6 md:hidden w-screen h-screen"
                    >
                        {/* Mobile Header (Inside Menu) - To contain close button and logo */}
                        <div className="flex items-center justify-between py-4 border-b border-transparent">
                            <Link href="/" onClick={() => setMobileOpen(false)}>
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    className="h-12 w-auto object-contain"
                                    priority
                                />
                            </Link>
                            <button
                                className="p-2 -mr-2 text-zinc-900"
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
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
                                    className="border-b border-zinc-100 pb-4"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto pb-12 flex flex-col gap-4">
                            {status === "loading" ? (
                                <div className="flex justify-center py-4">
                                    <Loading dark />
                                </div>
                            ) : status==="authenticated" ? (
                                <Button href="/dashboard" fullWidth size="lg">Dashboard</Button>
                            ) : (
                                <>
                                    <Button href="/login" variant="outline" fullWidth size="lg">Log In</Button>
                                    <Button href="/register" fullWidth size="lg">Get Started</Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;