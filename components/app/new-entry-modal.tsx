"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Smile, MoreHorizontal, PenLine, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/button";
import { taskServices, Task } from "@/services/task";
import { toast } from "sonner";

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  taskToEdit?: Task | null;
  layoutId?: string; // <--- ADD THIS
}

export default function NewEntryModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  taskToEdit, 
  layoutId = "new-entry-card" 
}: NewEntryModalProps) {
  
  // FIX 1: Initialize state directly from props. 
  // We will force this component to re-mount when opening via a 'key' in the parent,
  // so we don't need a useEffect to sync state anymore.
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [isLoading, setIsLoading] = useState(false);

  // FIX 2: Keep ONLY the scroll lock in useEffect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleClose = () => {
    // Optional: clear state on close if you want, 
    // but the parent 'key' strategy handles reset better.
    onClose();
  };

  const handleSave = async () => {
    if (!title.trim() && !description.trim()) {
      toast.error("Please add a title or description");
      return;
    }

    setIsLoading(true);

    let response;
    
    if (taskToEdit) {
      response = await taskServices.update(taskToEdit.id, {
        title,
        description,
      });
    } else {
      response = await taskServices.create({
        title,
        description,
        dayDate: new Date(),
        timestamp: new Date(),
      });
    }

    if (response.success) {
      toast.success(taskToEdit ? "Note updated" : "Note created");
      onSuccess();
      handleClose();
    } else {
      toast.error(response.message || "Operation failed");
    }
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-white dark:bg-blacked md:bg-white/20 md:dark:bg-blacked/20 backdrop-blur-xl"
          />

          <div className="fixed inset-0 z-50 flex justify-center px-0 p-4 sm:p-6 pointer-events-none">
            <motion.div
              // FIX 3: Use the dynamic layoutId passed from parent
              layoutId={layoutId} 
              className="pointer-events-auto w-full max-w-3xl bg-white dark:bg-blacked md:border border-zinc-200/50 dark:border-zinc-900 flex flex-col h-fit overflow-hidden rounded-4xl md:shadow-2xl"
              // Smooth spring transition
              transition={{ 
                layout: { type: "spring", bounce: 0.25, duration: 0.6 }, 
                opacity: { duration: 0.2 } 
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-50 dark:border-zinc-800">
                <div className="flex items-center gap-4 text-zinc-400 dark:text-zinc-500 text-sm font-medium">
                  {/* Icon animates from trigger */}
                  <div className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-full text-zinc-400">
                    <PenLine size={14} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="uppercase tracking-wide text-xs font-bold">
                        {taskToEdit ? "Editing Entry" : "New Entry"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Writing Area */}
              <div className="flex-1 overflow-y-auto p-8">
                 <motion.input
                  // Optional: layoutId for the title to morph text-to-text if you want
                  // layoutId={`${layoutId}-title`} 
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-3xl font-serif font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border-none outline-none bg-transparent mb-6 p-0 focus:ring-0"
                  autoFocus
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's on your mind?..."
                  className="w-full h-64 resize-none text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border-none outline-none bg-transparent text-lg leading-relaxed p-0 focus:ring-0"
                />
              </div>

              {/* Footer */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800"
              >
                <div className="flex gap-1">
                  <ToolbarButton icon={<Smile size={18} />} label="Mood" />
                  <ToolbarButton icon={<MoreHorizontal size={18} />} label="Options" />
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {taskToEdit ? "Update Entry" : "Save Entry"}
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
  <button className="p-2.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-all" title={label}>
    {icon}
  </button>
);