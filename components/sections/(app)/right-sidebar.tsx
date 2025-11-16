"use client";

import { ArrowUpRightIcon, CheckCircle2, Clock, Plus } from 'lucide-react';

const RightSidebar = () => {

    const quickActions = [
        { label: 'Create New Diary', icon: Plus, variant: 'secondary' as const },
        { label: 'Today\'s Diary', icon: CheckCircle2, variant: 'secondary' as const },
        { label: 'View Last Month', icon: Clock, variant: 'secondary' as const },
    ];

    return (
        <div className="w-full md:w-[25%] md:pl-4 mt-6 md:mt-0 space-y-4 h-fit md:sticky z-10 md:top-[88px]">

            <div className="p-4">
                <div className="">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={action.label}
                                className="group text-sm hover:bg-gray-100 cursor-pointer p-2 w-full gap-2 flex items-center justify-start"
                                onClick={() => {
                                    // Add your navigation/action logic here
                                    console.log(`${action.label} clicked`);
                                }}
                            >
                                <Icon className="size-4" />
                                {action.label}
                                <ArrowUpRightIcon className='size-4 ml-auto group-hover:opacity-100 opacity-0' />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="p-4 space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">Recent Activity</h3>
                <div className="space-y-3">
                    {[
                        { date: 'Today', time: '10:30 AM', status: 'completed' },
                        { date: 'Yesterday', time: '09:15 PM', status: 'completed' },
                        { date: 'Nov 14', time: '08:45 PM', status: 'pending' },
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                    }`} />
                                <span className="text-muted-foreground">{activity.date}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;