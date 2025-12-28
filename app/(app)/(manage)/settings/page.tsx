"use client";

import React from 'react';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useThemeTransition } from '@/components/providers/theme-transition-provider';
import Select from '@/components/ui/select';
import { motion } from 'framer-motion';

export default function GeneralSettingsPage() {
    const { changeTheme, currentTheme, isTransitioning } = useThemeTransition();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            
            {/* Header */}
            <div>
                <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">General</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your interface and regional preferences.</p>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800" />

            {/* Appearance Section */}
            <section className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Appearance</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Customize how the theme looks on your device.</p>
                    </div>
                    
                    {/* Animated Segmented Control */}
                    <div className="flex bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-full self-start md:self-auto relative isolate">
                        {[
                            { id: 'light', icon: Sun, label: 'Light' },
                            { id: 'dark', icon: Moon, label: 'Dark' },
                            { id: 'system', icon: Laptop, label: 'System' }
                        ].map((item) => {
                            const isActive = currentTheme === item.id;
                            const Icon = item.icon;
                            
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => changeTheme(item.id as 'light' | 'dark' | 'system')}
                                    disabled={isTransitioning}
                                    className={`
                                        relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400
                                        ${isActive 
                                            ? 'text-zinc-900 dark:text-zinc-100' 
                                            : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                        }
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="theme-active-indicator"
                                            className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-sm rounded-full -z-10"
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 500, 
                                                damping: 35 
                                            }}
                                        />
                                    )}

                                    {/* Content stays on top */}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Icon size={14} />
                                        <span>{item.label}</span>
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            <div className="border-t border-zinc-100 dark:border-zinc-800" />

            {/* Regional Section */}
            <section className="space-y-6">
                 <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Language & Region</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Set your preferred language and timezone.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 max-w-2xl">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Language</label>
                        <Select
                            options={[
                                { label: 'English (US)', value: 'en-us' },
                                { label: 'Hindi', value: 'hi' },
                                { label: 'French', value: 'fr' },
                            ]}
                            value="en-us"
                            className="bg-white dark:bg-zinc-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Timezone</label>
                        <Select
                            options={[
                                { label: 'Pacific Time (PT)', value: 'pt' },
                                { label: 'India Standard Time (IST)', value: 'ist' },
                                { label: 'Greenwich Mean Time (GMT)', value: 'gmt' },
                            ]}
                            value="ist"
                            className="bg-white dark:bg-zinc-900"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}