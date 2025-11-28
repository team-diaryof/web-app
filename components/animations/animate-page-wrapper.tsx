// components/animations/animate-page-wrapper.tsx
"use client"
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface AnimatePageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const AnimatePageWrapper: React.FC<AnimatePageWrapperProps> = ({ children, className }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatePageWrapper;