"use client";

import Button from "@/components/ui/button";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, PanelBottomCloseIcon, XIcon } from "lucide-react";
import { useState } from "react";

const DatePicker = () => {
    const [current, setCurrent] = useState(dayjs()); // calendar month
    const [selected, setSelected] = useState(dayjs()); // selected date
    const [isOpen, setIsOpen] = useState(false); // mobile modal open
    const isSelectedDateToday = selected.isSame(dayjs(), "day");

    const monthDays = current.daysInMonth();
    const firstDayIndex = dayjs(current).startOf("month").day(); // 0-6

    const prevMonth = () => setCurrent(current.subtract(1, "month"));
    const nextMonth = () => setCurrent(current.add(1, "month"));
    const goToToday = () => {
        setSelected(dayjs());
        setCurrent(dayjs());
    };

    const weeks = ["S", "M", "T", "W", "T", "F", "S"];

    const calendarUI = (
        <div className="max-md:p-2 select-none">
            <Button size="sm" variant={`${!isSelectedDateToday ? "primary" : "secondary"}`} className="h-9 flex justify-self-end md:mt-6 mb-4" onClick={goToToday}>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={isSelectedDateToday ? "today" : "go-to-today"}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm h-full flex justify-end mb-4"
                    >
                        {!isSelectedDateToday
                            ? "Go to Today"
                            : `Today : ${selected.format("ddd, MMM DD")}`}
                    </motion.p>
                </AnimatePresence>

            </Button>

            <div className="flex justify-between items-center mb-2 px-1">
                <button
                    onClick={prevMonth}
                    className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
                    aria-label="Previous month"
                >
                    <ChevronLeftIcon />
                </button>

                <div className="text-gray-700 font-medium">
                    {current.format("MMMM YYYY")}
                </div>

                <button
                    onClick={nextMonth}
                    className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
                    aria-label="Next month"
                >
                    <ChevronRightIcon />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center text-sm text-gray-500 mt-2 mb-1">
                {weeks.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 text-center text-md">
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={i}></div>
                ))}

                {Array.from({ length: monthDays }).map((_, index) => {
                    const day = index + 1;
                    const dateObj = current.date(day);
                    const isSelected = selected.isSame(dateObj, "day");

                    return (
                        <button
                            key={day}
                            onClick={() => {
                                setSelected(dateObj);
                                setIsOpen(false); // close modal on select (no-op on desktop)
                            }}
                            className={`w-10 h-10 flex cursor-pointer items-center justify-center mx-auto rounded-full transition ${isSelected ? "bg-black text-white" : "hover:bg-gray-100"
                                }`}
                            aria-current={isSelected ? "date" : undefined}
                            aria-label={dateObj.format("YYYY-MM-DD")}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="select-none z-30">
            {/* Mobile trigger: show selected date as button */}
            <div className="md:hidden flex max-md:justify-self-center mb-3">
                <Button
                    size="sm"
                    onClick={() => setIsOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    aria-controls="date-picker-modal"
                >
                    {selected.format("ddd, MMM DD")}
                </Button>
            </div>

            {/* Desktop inline calendar */}
            <div className="hidden md:block">{calendarUI}</div>

            {/* Mobile full-screen slide-in from right */}
            <AnimatePresence>
                {isOpen && (

                    <motion.div
                        className="fixed inset-0 bg-gray-100 rounded-t-4xl z-50 py-4"
                        initial={{ y: "100%" }}
                        animate={{ y: "30vh" }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    >
                        <div className="flex items-center justify-end p-3">
                            <button
                                className="text-sm text-gray-600 hover:text-black"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                            >
                                <XIcon />
                            </button>
                        </div>
                        <div className="p-3">{calendarUI}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DatePicker;
