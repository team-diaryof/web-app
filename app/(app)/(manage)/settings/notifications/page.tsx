import React from 'react';

export default function NotificationsPage() {
  return (
    <div className="space-y-10">
        <div>
            <h2 className="text-2xl font-serif text-zinc-900">Notifications</h2>
            <p className="text-zinc-500 mt-1">Choose what we get in touch about.</p>
        </div>

        <div className="space-y-6">
            <NotificationSection title="Email Notifications">
                <ToggleItem label="Daily Reminder" desc="Get a nudge at 8 PM to write your daily entry." checked={true} />
                <ToggleItem label="Weekly Recap" desc="A summary of your writing stats every Sunday." checked={true} />
                <ToggleItem label="Product Updates" desc="New features and improvements to Diary Of." checked={false} />
            </NotificationSection>

            <div className="h-px w-full bg-zinc-100" />

            <NotificationSection title="Push Notifications">
                <ToggleItem label="Streak Alerts" desc="Get notified before you break your writing streak." checked={true} />
                <ToggleItem label="Memory Lane" desc="See what you wrote on this day years ago." checked={false} />
            </NotificationSection>
        </div>
    </div>
  );
}

const NotificationSection = ({ title, children }: any) => (
    <section>
        <h3 className="text-base font-medium text-zinc-900 mb-4">{title}</h3>
        <div className="space-y-5">
            {children}
        </div>
    </section>
)

const ToggleItem = ({ label, desc, checked }: any) => (
    <div className="flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-zinc-900">{label}</p>
            <p className="text-sm text-zinc-500">{desc}</p>
        </div>
        <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
)