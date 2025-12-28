"use client";

import { ArrowUpRight, Calendar, CheckCircle2, Clock, Plus } from 'lucide-react';

const AppRightSidebar = () => {
    const quickActions = [
        { label: 'New Entry', icon: Plus, desc: 'Write about today' },
        { label: 'Review Day', icon: CheckCircle2, desc: 'Complete daily check-in' },
        { label: 'Memories', icon: Clock, desc: 'On this day last year' },
    ];

    return (
        <div className="space-y-6">

            {/* Quick Actions Card */}
            <div className="rounded-2xl border-zinc-200 dark:border-zinc-900 ">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.label}
                            className="w-full flex items-center gap-3 p-3 cursor-pointer rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left group"
                        >
                            <div className="h-10 w-10 shrink-0 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700 border border-transparent transition-all">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{action.label}</div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{action.desc}</div>
                            </div>
                            <ArrowUpRight size={14} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors shrink-0" />
                        </button>
                    );
                })}
            </div>

            {/* Recent Activity / Stats */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Activity Log</h3>
                    <button className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">View All</button>
                </div>

                <div className="space-y-4">
                    {[
                        { label: 'Morning Entry', time: '08:30 AM', status: 'done' },
                        { label: 'Work Log', time: '02:15 PM', status: 'done' },
                        { label: 'Evening Reflection', time: 'Pending', status: 'pending' },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className={`h-2 w-2 shrink-0 rounded-full ${item.status === 'done' ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">{item.label}</p>
                            </div>
                            <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">{item.time}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs">
                        <Calendar size={14} />
                        <span>3 Day Streak</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppRightSidebar;