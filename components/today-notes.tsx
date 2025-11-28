import { todayNotes, TodayNote } from "@/mocks/today-notes";
import React from "react";
import { Edit3, MoreHorizontal, Clock } from "lucide-react";

const formatTime = (timestamp: string) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const TodayNotes: React.FC = () => {
    return (
        <div className="space-y-6 pb-12">
            {/* Minimal Input */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 flex gap-4 items-center cursor-pointer hover:border-zinc-300 transition-colors shadow-sm">
                <div className="size-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400">
                    <Edit3 size={18} />
                </div>
                <span className="text-zinc-400 font-medium text-sm">Write something for today...</span>
            </div>

            {/* Simple List Feed - No lines, no dots */}
            <div className="flex flex-col gap-4">
                {todayNotes.map((note: TodayNote, index: number) => (
                    <div 
                        key={note.id + index} 
                        className="bg-white rounded-2xl border border-zinc-200 p-5 hover:border-zinc-300 transition-colors group"
                    >
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="space-y-1">
                                <h3 className="font-semibold text-lg text-zinc-900 leading-tight">{note.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Clock size={12} />
                                    <span>{formatTime(note.timestamp)}</span>
                                </div>
                            </div>
                            <button className="text-zinc-300 hover:text-zinc-600 transition-colors p-1 opacity-0 group-hover:opacity-100">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                        
                        <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-wrap">
                            {note.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodayNotes;