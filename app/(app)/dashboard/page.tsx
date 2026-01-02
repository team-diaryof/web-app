"use client";

// ... imports remain the same
import { useState, useEffect, useCallback } from "react";
import AppLeftSidebar from "@/components/app/app-left-sidebar";
import AppRightSidebar from "@/components/app/app-right-sidebar";
import TodayNotes from "@/components/app/today-notes";
import NewEntryModal from "@/components/app/new-entry-modal";
import DeleteConfirmModal from "@/components/app/delete-confirm-modal";
import { PenLine } from "lucide-react";
import { motion } from "framer-motion";
import AnimatePageWrapper from "@/components/animations/animate-page-wrapper";
import { taskServices, Task } from "@/services/task";
import { toast } from "sonner";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit/Delete States
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- FIX: Dynamic Layout ID Calculation ---
  // If editing, use the note's ID. If creating, use the static bar ID.
  const activeLayoutId = taskToEdit ? `note-${taskToEdit.id}` : "new-entry-card";

  const fetchNotes = useCallback(async () => {
    try {
      const response = await taskServices.getAll({});
      if (response.success && response.data) {
        setNotes(response.data);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleRefresh = async () => {
    await fetchNotes();
  };

  const openCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (taskId: string) => {
    setDeleteId(taskId);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const response = await taskServices.delete(deleteId);
    
    if (response.success) {
      toast.success("Note deleted");
      setNotes((prev) => prev.filter((n) => n.id !== deleteId));
      setDeleteId(null);
    } else {
      toast.error("Failed to delete note");
    }
    setIsDeleting(false);
  };

  return (
    <AnimatePageWrapper className="">
      
      {/* FIX: 'key' prop forces React to remount the component 
         when we switch between 'new' and 'edit' modes.
         This ensures 'useState' runs again with the new props, 
         solving the "setState in useEffect" error completely.
      */}
      <NewEntryModal
        key={taskToEdit ? taskToEdit.id : 'create-new'} 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleRefresh}
        taskToEdit={taskToEdit}
        layoutId={activeLayoutId} // Pass the dynamic ID
      />

      <DeleteConfirmModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />

      <div className="max-w-7xl mx-auto">
        {/* ... Rest of Dashboard Layout (same as before) ... */}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 h-[calc(100vh-65px)] sticky top-[65px] shrink-0">
             <AppLeftSidebar />
          </aside>

          <main className="flex-1 min-w-0">
             {/* Create Trigger 
                 Ensure this ID matches the 'new-entry-card' fallback
             */}
             <motion.div
               layoutId="new-entry-card"
               onClick={openCreateModal}
               className="mb-8 group cursor-text sticky top-[65px] bg-white dark:bg-blacked border-b md:pt-3 border-zinc-200 dark:border-zinc-800 z-10"
               initial={{ opacity: 1 }}
             >
               <div className="rounded-2xl p-4 transition-all duration-200 flex items-center gap-4">
                 <motion.div layoutId="new-entry-icon" className="h-10 w-10 rounded-full border border-zinc-100 dark:border-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                   <PenLine size={18} />
                 </motion.div>
                 <div className="flex-1">
                   <motion.span layoutId="new-entry-placeholder" className="text-zinc-400 dark:text-zinc-500 text-lg group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors">
                     Write something for today...
                   </motion.span>
                 </div>
               </div>
             </motion.div>

             <TodayNotes 
                 notes={notes} 
                 isLoading={isLoading} 
                 onEdit={handleEditClick}
                 onDelete={handleDeleteClick}
             />
          </main>

          <aside className="hidden xl:block w-80 shrink-0">
             <div className="sticky top-24">
               <AppRightSidebar />
             </div>
          </aside>
        </div>
      </div>
    </AnimatePageWrapper>
  );
}