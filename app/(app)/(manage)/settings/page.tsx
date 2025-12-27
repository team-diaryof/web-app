"use client";

import React from 'react';
import { Laptop, Moon, Sun, Globe, Clock } from 'lucide-react';
import { useThemeTransition } from '@/components/providers/theme-transition-provider';
import { Theme } from '@/store/theme';
import Select from '@/components/ui/select';

export default function GeneralSettingsPage() {
  const { changeTheme, currentTheme, isTransitioning } = useThemeTransition();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100">General Settings</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Customize the interface and regional preferences.</p>
      </div>

      <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

      {/* Redesigned Theme Selection */}
      <section className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">Interface Theme</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Select your preferred appearance mode.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ThemeCard 
            theme="light" 
            currentTheme={currentTheme} 
            onClick={() => changeTheme('light')} 
            disabled={isTransitioning}
            label="Light Mode"
            icon={<Sun size={18} />}
          >
             {/* Light Mode Abstract Preview */}
             <div className="w-full h-full bg-white border border-zinc-200 rounded-lg overflow-hidden flex shadow-sm">
                <div className="w-1/3 bg-zinc-50 border-r border-zinc-100 h-full p-2 space-y-2">
                    <div className="h-2 w-full bg-zinc-200/50 rounded-sm" />
                    <div className="h-2 w-2/3 bg-zinc-200/50 rounded-sm" />
                    <div className="h-2 w-3/4 bg-zinc-200/50 rounded-sm" />
                </div>
                <div className="flex-1 p-2 space-y-2">
                    <div className="h-8 w-full bg-zinc-50 rounded-md border border-zinc-100" />
                    <div className="flex gap-2">
                        <div className="h-16 w-1/2 bg-zinc-50 rounded-md border border-zinc-100" />
                        <div className="h-16 w-1/2 bg-zinc-50 rounded-md border border-zinc-100" />
                    </div>
                </div>
             </div>
          </ThemeCard>

          <ThemeCard 
            theme="dark" 
            currentTheme={currentTheme} 
            onClick={() => changeTheme('dark')} 
            disabled={isTransitioning}
            label="Dark Mode"
            icon={<Moon size={18} />}
          >
             {/* Dark Mode Abstract Preview */}
             <div className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex shadow-sm">
                <div className="w-1/3 bg-zinc-950 border-r border-zinc-800 h-full p-2 space-y-2">
                    <div className="h-2 w-full bg-zinc-800 rounded-sm" />
                    <div className="h-2 w-2/3 bg-zinc-800 rounded-sm" />
                    <div className="h-2 w-3/4 bg-zinc-800 rounded-sm" />
                </div>
                <div className="flex-1 p-2 space-y-2">
                    <div className="h-8 w-full bg-zinc-800/50 rounded-md border border-zinc-800" />
                    <div className="flex gap-2">
                        <div className="h-16 w-1/2 bg-zinc-800/50 rounded-md border border-zinc-800" />
                        <div className="h-16 w-1/2 bg-zinc-800/50 rounded-md border border-zinc-800" />
                    </div>
                </div>
             </div>
          </ThemeCard>

          <ThemeCard 
            theme="system" 
            currentTheme={currentTheme} 
            onClick={() => changeTheme('system')} 
            disabled={isTransitioning}
            label="System Default"
            icon={<Laptop size={18} />}
          >
             {/* System Abstract Preview */}
             <div className="w-full h-full bg-gradient-to-br from-white via-zinc-100 to-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center">
                 <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                    <Laptop size={24} className="text-zinc-900 dark:text-zinc-100" />
                 </div>
             </div>
          </ThemeCard>
        </div>
      </section>

      <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

      {/* Regional Preferences */}
      <section className="space-y-6 max-w-2xl">
         <div>
          <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">Regional Preferences</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Set your language and timezone formats.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <Globe size={14} /> Language
                </label>
                <Select 
                    options={[
                        { label: 'English (US)', value: 'en-us' },
                        { label: 'English (UK)', value: 'en-uk' },
                        { label: 'Spanish', value: 'es' },
                        { label: 'French', value: 'fr' },
                        { label: 'Hindi', value: 'hi' },
                    ]}
                    value="en-us"
                    className="bg-white dark:bg-zinc-900"
                />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <Clock size={14} /> Timezone
                </label>
                <Select 
                    options={[
                        { label: 'Pacific Time (PT)', value: 'pt' },
                        { label: 'Eastern Time (ET)', value: 'et' },
                        { label: 'Greenwich Mean Time (GMT)', value: 'gmt' },
                        { label: 'India Standard Time (IST)', value: 'ist' },
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

// Reusable Theme Card Component
interface ThemeCardProps {
    theme: Theme;
    currentTheme: Theme;
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    label: string;
    icon: React.ReactNode;
}

const ThemeCard = ({ theme, currentTheme, onClick, disabled, children, label, icon }: ThemeCardProps) => {
    const isActive = currentTheme === theme;
    
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`group relative flex flex-col gap-3 text-left outline-none transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <div className={`
                relative w-full aspect-[4/3] rounded-xl border-2 overflow-hidden transition-all duration-300 shadow-sm
                ${isActive 
                    ? 'border-yellow-500 ring-2 ring-yellow-500/20 dark:ring-yellow-500/10' 
                    : 'border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700'
                }
            `}>
                <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-900 p-3 pointer-events-none">
                    {children}
                </div>
                
                {/* Active Checkmark overlay */}
                {isActive && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-sm z-10 animate-in zoom-in duration-200">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                )}
            </div>

            <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'}`}>
                {icon}
                {label}
            </div>
        </button>
    )
}