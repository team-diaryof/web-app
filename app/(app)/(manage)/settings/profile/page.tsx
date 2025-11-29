import React from 'react';
import { MapPin, Calendar, Share2, Link as LinkIcon } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-serif text-zinc-900">Public Profile</h2>
            <p className="text-zinc-500 mt-1">This is how your diary profile looks to others.</p>
        </div>

        {/* Profile Preview Card */}
        <div className="border border-zinc-200 rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
                <span className="font-serif text-9xl">"</span>
            </div>

            <div className="flex justify-between items-start mb-6">
                 <div className="h-24 w-24 rounded-2xl bg-zinc-900 flex items-center justify-center text-white font-serif text-3xl shadow-sm">
                    SA
                 </div>
                 <button className="flex items-center gap-2 text-xs font-medium border border-zinc-200 rounded-lg px-3 py-1.5 hover:bg-zinc-50 transition-colors">
                    <Share2 size={14} /> Share
                 </button>
            </div>

            <h1 className="text-3xl font-serif text-zinc-900 mb-1">Saquib Ali</h1>
            <p className="text-zinc-500 text-sm mb-6">@saquib_ali</p>

            <p className="text-zinc-600 leading-relaxed max-w-lg mb-8 font-light">
                Documenting the journey of building software and living intentionally. 
                Building "Diary Of" to help others keep their memories safe. 
                Lover of coffee, code, and minimalist design.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-zinc-500 border-t border-zinc-100 pt-6">
                <div className="flex items-center gap-2">
                    <MapPin size={16} /> Patna, India
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} /> Joined Nov 2025
                </div>
                <div className="flex items-center gap-2">
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
    <div className="p-4 rounded-xl border border-zinc-100 text-center">
        <div className="text-xl font-serif text-zinc-900 mb-1">{value}</div>
        <div className="text-xs text-zinc-500 uppercase tracking-wider">{label}</div>
    </div>
);