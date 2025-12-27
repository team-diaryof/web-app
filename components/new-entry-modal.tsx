"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Smile, MoreHorizontal, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/button";

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewEntryModal({ isOpen, onClose }: NewEntryModalProps) {
  const [content, setContent] = useState("");

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Fades in separately */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm transition-colors"
          />

          {/* Modal Container Wrapper */}
          <div className="fixed inset-0 z-50 flex justify-center px-0 p-4 sm:p-6 pointer-events-none">

            {/* THE EXPANDING CARD */}
            <motion.div
              layoutId="new-entry-card"
              className="pointer-events-auto w-full max-w-2xl bg-white dark:bg-zinc-900 border dark:border-zinc-800 flex flex-col h-fit overflow-hidden rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50"
              transition={{
                layout: { type: "spring", bounce: 0.2, duration: 0.6 },
                opacity: { duration: 0.3 }
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-50 dark:border-zinc-800">
                <div className="flex items-center gap-4 text-zinc-400 dark:text-zinc-500 text-sm font-medium">
                  {/* Animating the icon from the trigger to here */}
                  <motion.div layoutId="new-entry-icon" className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-full text-zinc-400 dark:text-zinc-400">
                    <PenLine size={14} />
                  </motion.div>

                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Today</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              {/* Writing Area */}
              <div className="flex-1 overflow-y-auto p-8">
                <motion.input
                  layoutId="new-entry-placeholder" // Matches the trigger text logic loosely
                  type="text"
                  placeholder="Title"
                  className="w-full text-3xl font-serif font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border-none outline-none bg-transparent mb-6 p-0 focus:ring-0"
                  autoFocus
                />
                <motion.textarea
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?..."
                  className="w-full h-64 resize-none text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border-none outline-none bg-transparent text-lg leading-relaxed p-0 focus:ring-0"
                />
              </div>

              {/* Footer / Toolbar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="p-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800"
              >
                <div className="flex gap-1">
                  <ToolbarButton icon={<Smile size={18} />} label="Mood" />
                  <ToolbarButton icon={<MoreHorizontal size={18} />} label="Options" />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button>
                    Save Entry
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

const ToolbarButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button
    className="p-2.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-all"
    title={label}
  >
    {icon}
  </button>
);