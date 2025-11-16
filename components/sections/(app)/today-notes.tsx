
import { todayNotes, TodayNote } from "@/lib/today-notes";
import React from "react";

const formatTime = (timestamp: string) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const TodayNotes: React.FC = () => {

    return (
        <div className="px-6 py-8 overflow-y-auto">
            <div className="relative max-w-xl mx-auto">
                <div className="flex flex-col gap-6">
                    {todayNotes.map((note: TodayNote,index:number) => (
                        <div
                            key={note.id+index}
                            className={`${index%2!==0 ? "ml-auto":"mr-auto"} w-[80%] bg-white/80 backdrop-blur p-5`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-medium text-slate-800 text-lg">{note.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{note.content}</p>
                                </div>
                                <span className="shrink-0 text-xs font-mono text-slate-600 bg-slate-100 rounded px-2 py-1">
                                    {formatTime(note.timestamp)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* EXTENSIBILITY: Replace static data with fetched notes (e.g. /api/v1/notes).
                    Path re-computes on resize; move logic into a hook if reused. */}
        </div>
    );
};

export default TodayNotes;