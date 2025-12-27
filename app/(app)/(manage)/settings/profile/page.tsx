import React from 'react';
import { MapPin, Calendar, Share2, Link as LinkIcon, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100">Public Profile</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">This is how your diary profile looks to others.</p>
            </div>
             <Link href="/settings/profile/edit" className="hidden md:flex items-center gap-2 text-sm font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-100">
                <Edit3 size={16} /> Edit Profile
            </Link>
        </div>

        {/* Profile Preview Card */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-sm">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] dark:opacity-[0.05] pointer-events-none text-zinc-900 dark:text-zinc-100">
                <span className="font-serif text-9xl">"</span>
            </div>

            <div className="flex justify-between items-start mb-6">
                 <div className="h-24 w-24 rounded-2xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-serif text-3xl shadow-sm">
                    SA
                 </div>
                 <div className="flex gap-2">
                     <button className="flex items-center gap-2 text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-transparent">
                        <Share2 size={14} /> Share
                     </button>
                      {/* Mobile Edit Button */}
                     <Link href="/settings/profile/edit" className="md:hidden flex items-center gap-2 text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-transparent">
                        <Edit3 size={14} /> Edit
                     </Link>
                 </div>
            </div>

            <h1 className="text-3xl font-serif text-zinc-900 dark:text-zinc-100 mb-1">Saquib Ali</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">@saquib_ali</p>

            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg mb-8 font-light">
                Documenting the journey of building software and living intentionally. 
                Building "Diary Of" to help others keep their memories safe. 
                Lover of coffee, code, and minimalist design.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                <div className="flex items-center gap-2">
                    <MapPin size={16} /> Patna, India
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} /> Joined Nov 2025
                </div>
                <div className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer">
                    <LinkIcon size={16} /> diaryof.com/saquib
                </div>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
            <StatBox label="Entries" value="142" />
            <StatBox label="Streak" value="12 Days" />
            <StatBox label="Words" value="45k" />
        </div>
    </div>
  );
}

const StatBox = ({ label, value }: { label: string, value: string }) => (
    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-center">
        <div className="text-xl font-serif text-zinc-900 dark:text-zinc-100 mb-1">{value}</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{label}</div>
    </div>
);