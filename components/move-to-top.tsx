"use client"; // Ensure this is a client component as it likely needs interaction or window access

import { ArrowUp, ArrowDown } from 'lucide-react'; // Import both arrows
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const MoveToTop = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Show button when page is scrolled down
    const handleScroll = () => {
        if(typeof window === "undefined") return;
        
        if (window.scrollY > 300) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const scrollToTop = () => {
        if (typeof window === "undefined") return;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToContent = () => {
        if (typeof window === "undefined") return;
        // Scroll down a bit, e.g., to the next section or just a standard amount
        window.scrollTo({
            top: window.innerHeight, // Scroll one viewport height down
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AnimatePresence mode="wait"> {/* Use mode="wait" to ensure exit animation finishes before new one enters */}
            {!isScrolled ? (
                // Initial State: Center Bottom, Scroll Down
                <motion.div
                    key="scroll-down"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 cursor-pointer"
                    onClick={scrollToContent}
                >
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-zinc-200">
                        Scroll Down
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="p-3 bg-white text-zinc-900 rounded-full shadow-lg border border-zinc-100 hover:bg-zinc-50 transition-colors"
                    >
                        <ArrowDown size={24} />
                    </motion.div>
                </motion.div>
            ) : (
                // Scrolled State: Bottom Right, Scroll Up
                <motion.button
                    key="scroll-up"
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 bg-zinc-900 text-white rounded-full shadow-lg hover:bg-zinc-800 transition-colors group flex items-center gap-2 pr-4 pl-3"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                    <span className="text-xs font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
                        Top
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default MoveToTop;