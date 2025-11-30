"use client"
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

interface StickyNoteProps {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    note: string
    className?: string;
}

const StickyNote = ({ left, top, right, bottom, note, className }: StickyNoteProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, rotate: left ? -10 : 10 }}
            animate={{ opacity: 1, rotate: left ? -6 : 6 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ left, top, right, bottom }}
            className="absolute z-20 hidden md:block"
        >
            <div className={cn("bg-amber-50 p-4 pt-6 pb-8 w-44 shadow-md border border-zinc-100/50", className)}>
                <p className="font-serif text-zinc-600 text-sm italic leading-relaxed">
                    &quot;{note}&quot;
                </p>
                <div className="mt-3 w-8 h-0.5 bg-zinc-200 rounded-full" />
            </div>
        </motion.div>
    )
}

export default StickyNote