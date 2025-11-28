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
            <div className="bg-white rounded-2xl border border-zinc-200 p-2 shadow-sm">
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.label}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors text-left group"
                        >
                            <div className="size-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-zinc-200 transition-all">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-zinc-900">{action.label}</div>
                                <div className="text-xs text-zinc-500">{action.desc}</div>
                            </div>
                            <ArrowUpRight size={14} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                        </button>
                    );
                })}
            </div>

            {/* Recent Activity / Stats */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-900">Activity Log</h3>
                    <button className="text-xs text-zinc-500 hover:text-zinc-900">View All</button>
                </div>
                
                <div className="space-y-4">
                    {[
                        { label: 'Morning Entry', time: '08:30 AM', status: 'done' },
                        { label: 'Work Log', time: '02:15 PM', status: 'done' },
                        { label: 'Evening Reflection', time: 'Pending', status: 'pending' },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className={`size-2 rounded-full ${item.status === 'done' ? 'bg-green-500' : 'bg-zinc-300'}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-700 truncate">{item.label}</p>
                            </div>
                            <span className="text-xs text-zinc-400 whitespace-nowrap">{item.time}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                        <Calendar size={14} />
                        <span>3 Day Streak</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppRightSidebar;