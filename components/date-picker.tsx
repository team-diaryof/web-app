"use client";

import Button from "@/components/ui/button";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const DatePicker = () => {
    const [current, setCurrent] = useState(dayjs()); 
    const [selected, setSelected] = useState(dayjs()); 
    const [isOpen, setIsOpen] = useState(false); 
    const isSelectedDateToday = selected.isSame(dayjs(), "day");

    const monthDays = current.daysInMonth();
    const firstDayIndex = dayjs(current).startOf("month").day(); 

    const prevMonth = () => setCurrent(current.subtract(1, "month"));
    const nextMonth = () => setCurrent(current.add(1, "month"));
    const goToToday = () => {
        const today = dayjs();
        setSelected(today);
        setCurrent(today);
    };

    const weeks = ["S", "M", "T", "W", "T", "F", "S"];

    const calendarUI = (
        <div className="max-md:p-2 select-none w-full">
            <div className="flex flex-col gap-4 mb-4">
                
                {/* Control Bar */}
                <div className="flex items-center justify-between h-8 relative">
                    <div className="text-zinc-900 font-semibold text-sm pl-2">
                        {current.format("MMMM YYYY")}
                    </div>

                    <div className="absolute right-0">
                        {/* Always show Today info if not selected, otherwise show selected date */}
                        <AnimatePresence mode="wait">
                            {!isSelectedDateToday ? (
                                <motion.button
                                    key="reset-btn"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    onClick={goToToday}
                                    className="text-[10px] font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-full transition-colors"
                                >
                                    Go to Today
                                </motion.button>
                            ) : (
                                <motion.span
                                    key="today-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-zinc-400 font-medium px-2"
                                >
                                    {selected.format("ddd, MMM DD")}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex justify-between items-center px-1">
                    <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                {weeks.map((d, i) => <div key={i}>{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-sm">
                {Array.from({ length: firstDayIndex }).map((_, i) => <div key={`empty-${i}`} />)}

                {Array.from({ length: monthDays }).map((_, index) => {
                    const day = index + 1;
                    const dateObj = current.date(day);
                    const isSelected = selected.isSame(dateObj, "day");
                    const isToday = dayjs().isSame(dateObj, "day");

                    return (
                        <div key={day} className="flex justify-center items-center aspect-square">
                            <button
                                onClick={() => {
                                    setSelected(dateObj);
                                    setIsOpen(false);
                                }}
                                className={`size-8 flex items-center justify-center rounded-full transition-all text-sm relative
                                    ${isSelected ? "bg-zinc-900 text-white font-medium shadow-sm scale-100" : "hover:bg-zinc-100 text-zinc-700 scale-95 hover:scale-100"}
                                    ${!isSelected && isToday ? "text-zinc-900 font-bold" : ""}
                                `}
                            >
                                {day}
                                {/* Small dot for today if not selected */}
                                {!isSelected && isToday && (
                                    <div className="absolute -bottom-1 size-1 bg-zinc-900 rounded-full" />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="select-none z-30 w-full">
            {/* Hidden on mobile because it's now inside the Navbar modal */}
            <div className="hidden md:block">{calendarUI}</div>
            
            {/* Mobile View - Only used when passed explicitly or handled via parent (Navbar handles this now) */}
            <div className="md:hidden block">
                 {calendarUI}
            </div>
        </div>
    );
};

export default DatePicker;