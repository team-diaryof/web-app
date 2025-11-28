"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const TextSwitcher = ({ words }: { words: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentWord = words[index];

    // Subtle container staggering
    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.04, // Fast stagger for a flow effect, not a wave
            }
        },
        exit: {
            transition: {
                staggerChildren: 0.03,
                staggerDirection: 1
            }
        }
    };

    // Clean, linear fade with slight movement
    const letterVariants = {
        hidden: {
            y: 10, // Reduced from 20 to 10 for subtlety
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4
            }
        },
        exit: {
            y: -10, // Reduced from -20
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <span className="inline-block relative min-w-[300px] text-amber-500 font-serif italic h-[1.2em]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentWord}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="inline-block absolute left-0 top-0 whitespace-nowrap"
                >
                    {currentWord.split("").map((char, i) => (
                        <motion.span
                            key={`${currentWord}-${i}`}
                            className="inline-block whitespace-pre"
                            variants={letterVariants}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
            {/* Invisible spacer to maintain layout width */}
            <span className="invisible">{currentWord}</span>
        </span>
    );
};

export default TextSwitcher;