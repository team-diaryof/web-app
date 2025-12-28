"use client";
import { Clock } from "lucide-react";

const todayNotes = [
  {
    id: "n1",
    title: "Morning Reflection",
    content: "Outlined the day's focus areas and reviewed ongoing tasks.",
    timestamp: new Date().setHours(8, 5, 0, 0).toString(),
  },
  {
    id: "n2",
    title: "Deep Work Session",
    content: "Completed logic for session validation with iron-session and finalized API schema.",
    timestamp: new Date().setHours(8, 55, 0, 0).toString(),
  },
  {
    id: "n3",
    title: "Standup Summary",
    content: "Reported progress on authentication module and highlighted delays with email queue worker.",
    timestamp: new Date().setHours(9, 30, 0, 0).toString(),
  },
  {
    id: "n4",
    title: "UI Improvements",
    content: "Refined card layout for notes and applied subtle motion transitions using Framer Motion.",
    timestamp: new Date().setHours(10, 20, 0, 0).toString(),
  },
  {
    id: "n5",
    title: "Design Sketch",
    content: "Drafted UI flow for linking notes across days using curved connectors.",
    timestamp: new Date().setHours(11, 0, 0, 0).toString(),
  },
  {
    id: "n6",
    title: "Backend Cleanup",
    content: "Removed unused Postgres relations and optimized Prisma schema with proper indexing.",
    timestamp: new Date().setHours(12, 10, 0, 0).toString(),
  },
  {
    id: "n7",
    title: "Bug Fix",
    content: "Resolved Prisma connection retry race condition caused by stale pool state.",
    timestamp: new Date().setHours(13, 15, 0, 0).toString(),
  },
  {
    id: "n8",
    title: "Feature Implementation",
    content: "Added note tags with search and filtering integrated via TanStack Query.",
    timestamp: new Date().setHours(14, 40, 0, 0).toString(),
  },
  {
    id: "n9",
    title: "Code Review",
    content: "Reviewed chat app WebSocket handler; suggested improvements for reconnection logic.",
    timestamp: new Date().setHours(16, 10, 0, 0).toString(),
  },
  {
    id: "n10",
    title: "Evening Wrap-up",
    content: "Summarized completed items and prepared a draft for tomorrow's task list.",
    timestamp: new Date().setHours(17, 45, 0, 0).toString(),
  }
];

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
          <div key={note.id} className="bg-zinc-50 dark:bg-zinc-950/30 border dark:border-zinc-900 border-zinc-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">

              <h3 className="text-lg font-serif font-medium">{note.title}</h3>

              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-950 text-zinc-500 flex items-center gap-1">
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