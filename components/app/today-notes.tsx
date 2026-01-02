"use client";
import { Task } from "@/services/task";
import { Clock, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TodayNotesProps {
  notes: Task[];
  isLoading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TodayNotes({ notes, isLoading, onEdit, onDelete }: TodayNotesProps) {

  if (isLoading) {
    return (
      <div className="space-y-4 max-md:px-4 mt-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-400 dark:text-zinc-600">
        <p>No notes for today yet. Start writing!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-md:px-4 mt-8">
      {notes.map((note) => {
        const dateObj = note.timestamp ? new Date(note.timestamp) : new Date(note.createdAt);
        const timeStr = !isNaN(dateObj.getTime())
          ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : "--:--";

        return (
          <motion.div
            layoutId={`note-${note.id}`}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, y: 100 }}
            key={note.id}
            className="group relative bg-zinc-50 dark:bg-zinc-950/30 border dark:border-zinc-900 border-zinc-100 rounded-2xl p-6 transition-all"
          >
            {/* ACTION BUTTONS (Visible on Hover) */}
            <div className="absolute top-4 right-4 flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button
                onClick={() => onEdit(note)}
                className="cursor-pointer p-2 bg-white dark:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700 transition-colors"
                title="Edit Note"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="cursor-pointer p-2 bg-white dark:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-500 shadow-sm border border-zinc-200 dark:border-zinc-700 transition-colors"
                title="Delete Note"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-3 pr-16"> {/* pr-16 prevents text overlap with buttons */}
              <h3 className="text-lg font-serif font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {note.title || "Untitled Note"}
              </h3>

              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 flex items-center gap-1 shrink-0">
                <Clock size={10} />
                {timeStr}
              </span>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm whitespace-pre-wrap line-clamp-3">
              {note.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}