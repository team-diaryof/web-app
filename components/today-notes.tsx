"use client";
import { todayNotes } from "@/mocks";
import { Clock } from "lucide-react";

export default function TodayNotes() {

  /*
  id: "n1",
    title: "Morning Reflection",
    content: "Outlined the day's focus areas and reviewed ongoing tasks.",
    timestamp: new Date().setHours(8, 5, 0, 0).toString(),
  */
  return (
    <div className="space-y-4 max-md:px-4">
      {/* Note Card 1 */}
      {
        todayNotes.map((note) => (
          <div key={note.id} className="bg-white dark:bg-black border dark:border-zinc-800 border-zinc-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">

              <h3 className="text-lg font-serif font-medium text-zinc-900">{note.title}</h3>

              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 flex items-center gap-1">
                <Clock size={10} /> {new Date(parseInt(note.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-zinc-600 leading-relaxed text-sm">
              {note.content}
            </p>
          </div>
        ))
      }

    </div>
  );
}