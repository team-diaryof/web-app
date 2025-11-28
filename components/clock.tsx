"use client";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const hourRotation = useMotionValue(0);
    const minuteRotation = useMotionValue(0);
    const secondRotation = useMotionValue(0);

    useEffect(() => {
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();
        hourRotation.set((h % 12) * 30 + m * 0.5);
        minuteRotation.set(m * 6);
        secondRotation.set(s * 6);

        const interval = setInterval(() => {
            const t = new Date();
            setTime(t);
            const h = t.getHours();
            const m = t.getMinutes();
            const s = t.getSeconds();

            animate(hourRotation, (h % 12) * 30 + m * 0.5, { duration: 0.8, ease: "backOut" });
            animate(minuteRotation, m * 6, { duration: 0.4, ease: "backOut" });
            animate(secondRotation, s * 6, { duration: 0.2, ease: "linear" });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    return (
        <div className="relative flex items-center justify-center overflow-hidden w-full aspect-square max-w-[220px] mx-auto py-4">
            {/* Background Digital Time - Fully visible now */}
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-zinc-200/80 select-none pointer-events-none tracking-tighter">
                {formattedTime}
            </div>

            {/* Analog Clock Face - Transparent Background */}
            <div className="relative size-40 rounded-full border-2 border-zinc-200 bg-transparent flex items-center justify-center z-10">
                
                {/* Center Point */}
                <div className="absolute size-3 rounded-full bg-zinc-900 z-20 ring-4 ring-white" />

                {/* Hour Hand */}
                <motion.div
                    style={{ rotate: hourRotation }}
                    className="absolute w-1.5 h-10 bg-zinc-900 bottom-1/2 origin-bottom rounded-full z-10"
                />

                {/* Minute Hand */}
                <motion.div
                    style={{ rotate: minuteRotation }}
                    className="absolute w-1 h-14 bg-zinc-500 bottom-1/2 origin-bottom rounded-full z-10"
                />

                {/* Second Hand */}
                <motion.div
                    style={{ rotate: secondRotation }}
                    className="absolute w-0.5 h-16 bg-red-500 bottom-1/2 origin-bottom rounded-full z-10"
                />
                
                {/* Tick Marks */}
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`absolute w-0.5 top-0 origin-center rounded-full ${i % 3 === 0 ? "h-3 bg-zinc-400" : "h-1.5 bg-zinc-300"}`}
                        style={{ transform: `rotate(${i * 30}deg) translateY(4px)`, transformOrigin: "50% 80px" }} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Clock;