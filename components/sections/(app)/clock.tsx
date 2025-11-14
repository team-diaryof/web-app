"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    // Motion values for rotation
    const hourRotation = useMotionValue((hour % 12) * 30 + minute * 0.5);
    const minuteRotation = useMotionValue(minute * 6);
    const secondRotation = useMotionValue(second * 6);

    useEffect(() => {
        const interval = setInterval(() => {
            const t = new Date();
            setTime(t);
            const h = t.getHours();
            const m = t.getMinutes();
            const s = t.getSeconds();

            animate(hourRotation, (h % 12) * 30 + m * 0.5, { duration: 0.8 });
            animate(minuteRotation, m * 6, { duration: 0.4 });
            animate(secondRotation, s * 6, { duration: 0.2 });
        }, 1000);

        return () => clearInterval(interval);
    }, [hourRotation, minuteRotation, secondRotation]);

    const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    return (
        <div className="relative flex items-center justify-center overflow-hidden">
            {/* Background Time */}
            <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-black/20 select-none">
                {formattedTime}
            </div>

            <div className="absolute size-3 rounded-full bg-black z-10" />


            <div className="relative size-40 flex items-center justify-center">
                <motion.div
                    style={{ rotate: hourRotation }}
                    className="absolute w-1.5 h-12 bg-black bottom-1/2 origin-bottom"
                />

                <motion.div
                    style={{ rotate: minuteRotation }}
                    className="absolute w-1.5 h-16 bg-black bottom-1/2 origin-bottom"
                />

                <motion.div
                    style={{ rotate: secondRotation }}
                    className="absolute w-0.5 h-18 bg-red-500 bottom-1/2 origin-bottom"
                />
            </div>
        </div>
    );
};

export default Clock;
