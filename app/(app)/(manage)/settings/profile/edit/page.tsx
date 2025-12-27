"use client";

import React from 'react';
import Link from 'next/link';
import { Camera, ChevronLeft, Save } from 'lucide-react';

export default function EditProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        
        {/* Header with Back Navigation */}
        <div className="flex items-center justify-between">
            <div>
                <Link href="/settings/profile" className="inline-flex items-center text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                    <ChevronLeft size={14} className="mr-1" /> Back to Profile
                </Link>
                <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100">Edit Profile</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Update your personal information.</p>
            </div>
            
            <div className="hidden md:block">
                 <button className="bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-zinc-900 text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 flex items-center gap-2">
                    <Save size={16} /> Save Changes
                </button>
            </div>
        </div>

        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

        <form className="space-y-8 max-w-2xl">
             {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="relative group cursor-pointer w-fit shrink-0">
                    <div className="h-24 w-24 rounded-full bg-white dark:bg-zinc-800 border-4 border-white dark:border-zinc-800 shadow-sm flex items-center justify-center text-zinc-400 dark:text-zinc-500 font-serif text-3xl overflow-hidden">
                        SA
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={24} className="text-white" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Profile Photo</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 max-w-xs mt-1">
                        Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                    </p>
                    <div className="flex gap-3">
                        <button type="button" className="text-xs font-medium text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                            Upload New
                        </button>
                        <button type="button" className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-3 py-1.5 rounded-lg transition-colors">
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="First Name" defaultValue="Saquib" />
                    <InputGroup label="Last Name" defaultValue="Ali" />
                </div>

                <InputGroup 
                    label="Username" 
                    defaultValue="saquib_ali" 
                    prefix="diaryof.com/"
                />

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
                    <textarea 
                        className="w-full min-h-[120px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-800 transition-all resize-none"
                        placeholder="Write a few sentences about yourself..."
                        defaultValue="Documenting the journey of building software and living intentionally. Building 'Diary Of' to help others keep their memories safe."
                    />
                    <div className="flex justify-between items-center text-xs text-zinc-400 dark:text-zinc-500">
                        <span>Markdown supported</span>
                        <span>142 / 240</span>
                    </div>
                </div>

                <InputGroup 
                    label="Location" 
                    defaultValue="Patna, India" 
                    placeholder="e.g. New York, NY"
                />

                 <InputGroup 
                    label="Website" 
                    defaultValue="https://saquib.dev" 
                    placeholder="https://"
                />
            </div>
            
             <div className="pt-6 flex items-center gap-4 md:hidden">
                <button type="submit" className="w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-zinc-900 text-sm font-medium px-6 py-3 rounded-lg shadow-sm transition-all">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
  );
}

// Reusable Input Component
const InputGroup = ({ label, defaultValue, type = "text", disabled = false, helper, prefix, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
    <div className="relative flex items-center">
        {prefix && (
            <span className="absolute left-4 text-sm text-zinc-400 dark:text-zinc-500 select-none pointer-events-none">
                {prefix}
            </span>
        )}
        <input
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all 
            ${prefix ? 'pl-[105px]' : ''}
            ${disabled 
                ? 'bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 cursor-not-allowed' 
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-800'
            }`}
        />
    </div>
    {helper && <p className="text-xs text-zinc-500 dark:text-zinc-400">{helper}</p>}
  </div>
);