"use client";

import Button from "@/components/ui/button";
import Logo from "@/public/logo-landscape-transparent.png";
import { useAuthStore } from "@/store/auth";
import { useThemeStore } from "@/store/theme";
import { AnimatePresence, motion } from "framer-motion";
import { X as CloseIcon, Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useThemeTransition } from "./providers/theme-transition-provider";

const navLinks = [
    { name: "Newsletter", href: "/newsletter" },
    { name: "Download", href: "/download" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    const { status } = useAuthStore();
    const { theme } = useThemeStore(); // Keep theme for icon display
    const { triggerThemeSwitch, isTransitioning } = useThemeTransition(); // Use the transition hook

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isAuthScreens = ["/login", "/register"].includes(pathname);

    // ... (Keep your useEffects for scroll handling exactly as they were) ...
    // Note: I'm omitting the full repetition of useEffects to save space, 
    // but keep your existing scroll/hash logic here.

    useEffect(() => {
        const handleNavigationScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                setTimeout(() => {
                    const id = hash.replace('#', '');
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            } else {
                window.scrollTo(0, 0);
            }
        };
        handleNavigationScroll();
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    }, [mobileOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    // Handle Mobile Menu Logo Click
    const handleLogoClick = (e: React.MouseEvent) => {
        setMobileOpen(false);
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] flex items-center ${scrolled
                        ? "py-3 bg-white dark:bg-black backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50"
                        : "py-8 bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full flex items-center justify-between">

                    <Link href="/" onClick={handleLogoClick} className="relative z-50 flex items-center">
                        <Image
                            src={Logo}
                            alt="Logo"
                            className="h-8 md:h-10 dark:brightness-0 dark:invert w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-2" />

                        {/* UPDATED THEME BUTTON */}
                        <button
                            onClick={triggerThemeSwitch} // Use the new trigger
                            disabled={isTransitioning}   // Prevent double clicks
                            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors relative"
                        >
                            {/* We keep the icon based on current theme, it will flip when the overlay lifts */}
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {!isAuthScreens && (
                            <div className="flex items-center gap-3 pl-2">
                                {status === "authenticated" ? (
                                    <Button href="/dashboard" variant="secondary" size="sm" className="h-9 px-5">Dashboard</Button>
                                ) : (
                                    <>
                                        <Button variant="ghost" href="/login" size="sm" className="h-9">Log In</Button>
                                        <Button href="/register" size="sm" className="h-9 px-5">Get Started</Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex md:hidden items-center gap-3">
                        {!isAuthScreens && (
                            status === "authenticated" ? (
                                <Button href="/dashboard" size="xs" className="h-8 px-4 text-xs">Dashboard</Button>
                            ) : (
                                <Button href="/login" size="xs" className="h-8 px-4 text-xs">Log In</Button>
                            )
                        )}
                        <button onClick={() => setMobileOpen(true)} className="text-zinc-900 dark:text-white p-1 ml-1">
                            <Menu size={24} />
                        </button>
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
                        transition={{ type: "tween", ease: [0.32, 0.72, 0.2, 1], duration: 1 }}
                        className="fixed inset-0 bg-white dark:bg-black z-[100] flex flex-col p-6 md:hidden"
                    >
                        <div className="flex justify-between items-center mb-10 h-10">
                            <Link href="/" onClick={handleLogoClick}>
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    className="h-8 dark:brightness-0 dark:invert w-auto object-contain"
                                />
                            </Link>
                            <button onClick={() => setMobileOpen(false)} className="p-2 -mr-2 text-zinc-900 dark:text-white">
                                <CloseIcon size={28} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-2xl font-medium text-zinc-900 dark:text-white"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="mt-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                {/* UPDATED MOBILE THEME BUTTON */}
                                <button
                                    onClick={() => {
                                        triggerThemeSwitch();
                                        // Optional: Keep menu open or close it? usually keep it open to see effect
                                        // setMobileOpen(false); 
                                    }}
                                    disabled={isTransitioning}
                                    className="flex items-center gap-3 text-zinc-500 font-medium"
                                >
                                    {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;