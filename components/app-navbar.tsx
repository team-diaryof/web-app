"use client";

import Logo from "@/public/logo-landscape-white.png"; // Ensure this path is correct
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Search, X } from "lucide-react"; 
import AppNavbarDropDown from "./app-navbar-dropdown";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "@/components/date-picker";
import Clock from "@/components/clock";
import { Dropdown } from "@/components/ui/dropdown"; 
import Notifications from "@/components/notifications"; // Ensure import matches file location

const AppNavbar = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const updateTime = () => setCurrentTime(dayjs().format("ddd, MMM D"));
        updateTime();
        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    return (
        <>
            <div className='sticky top-0 left-0 z-40 bg-white border-b border-zinc-100'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 relative">
                    
                    {/* Logo Area */}
                    <div className={`flex items-center shrink-0 transition-opacity duration-200 ${showSearch ? 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'opacity-100'}`}>
                        <Link href="/"> 
                            <Image src={Logo} className='w-36' alt="The Diary Of" />
                        </Link>
                    </div>

                    {/* Center: Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-4">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search your memories..." 
                                className="w-full h-10 pl-10 pr-4 rounded-full border border-zinc-100 focus:border-zinc-300 text-sm focus:outline-none transition-all placeholder:text-zinc-400 bg-zinc-50/30 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Center Mobile: Search Overlay */}
                    <AnimatePresence>
                        {showSearch && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-0 bg-white z-50 flex items-center px-4 md:hidden"
                            >
                                <Search className="text-zinc-400 mr-3" size={20} />
                                <input 
                                    ref={searchInputRef}
                                    type="text" 
                                    placeholder="Search..." 
                                    className="flex-1 h-full bg-transparent outline-none text-base"
                                />
                                <button onClick={() => setShowSearch(false)} className="p-2 ml-2 text-zinc-500">
                                    <X size={20} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Center Mobile: Date Trigger */}
                    {!showSearch && (
                        <button 
                            onClick={() => setShowDateModal(true)}
                            className="md:hidden absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-zinc-600 bg-zinc-100/80 px-3 py-1.5 rounded-full border border-zinc-200 active:scale-95 transition-transform"
                        >
                            {currentTime}
                        </button>
                    )}
                    
                    {/* Right: Actions */}
                    <div className="flex items-center gap-1 md:gap-4 shrink-0">
                        <button 
                            className="md:hidden p-2 text-zinc-500 hover:bg-zinc-50 rounded-full"
                            onClick={() => setShowSearch(true)}
                        >
                            <Search size={20} />
                        </button>
                        
                        {/* Notifications Dropdown */}
                        <Dropdown
                            position="bottom-left"
                            className="flex items-center"
                            menuClassName="max-md:w-full w-auto p-0" // Let content define width, no padding on container
                            trigger={
                                <button className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors relative rounded-full hover:bg-zinc-50">
                                    <Bell size={20} strokeWidth={1.5} />
                                    <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                                </button>
                            }
                        >
                            <Notifications />
                        </Dropdown>

                        <div className="pl-2 md:pl-4 border-l border-zinc-200 ml-1">
                             <AppNavbarDropDown />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Date/Time Modal */}
            <AnimatePresence>
                {showDateModal && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
                            onClick={() => setShowDateModal(false)}
                        />
                        <motion.div 
                            initial={{ y: "100%" }} 
                            animate={{ y: 0 }} 
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 pb-8 md:hidden shadow-2xl max-h-[85vh] overflow-y-auto"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-12 h-1.5 bg-zinc-200 rounded-full" />
                            </div>
                            
                            <div className="space-y-8">
                                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center mb-2">Current Time</h3>
                                    <Clock />
                                </div>
                                <div className="bg-white">
                                    <DatePicker />
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setShowDateModal(false)}
                                className="w-full mt-8 py-3 bg-zinc-100 text-zinc-900 font-medium rounded-xl"
                            >
                                Close
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default AppNavbar;