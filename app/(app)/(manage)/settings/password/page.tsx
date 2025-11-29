import React from 'react';
import { ShieldCheck, KeyRound } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="space-y-10">
        <div>
            <h2 className="text-2xl font-serif text-zinc-900">Security</h2>
            <p className="text-zinc-500 mt-1">Manage your password and authentication methods.</p>
        </div>

        <div className="h-px w-full bg-zinc-100" />

        <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-xl p-4 flex gap-4 items-start">
            <div className="p-2 bg-white rounded-lg border border-zinc-100 text-green-600">
                <ShieldCheck size={20} />
            </div>
            <div>
                <h4 className="text-sm font-medium text-zinc-900">Your account is secure</h4>
                <p className="text-sm text-zinc-500 mt-1">You last changed your password 3 months ago. No suspicious activity detected.</p>
            </div>
        </div>

        <form className="space-y-6 max-w-lg">
            <InputGroup label="Current Password" type="password" />
            <div className="h-4" />
            <InputGroup label="New Password" type="password" />
            <InputGroup label="Confirm New Password" type="password" />

            <div className="pt-4 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all">
                    <KeyRound size={16} /> Update Password
                </button>
            </div>
        </form>
    </div>
  );
}
// Reuse InputGroup from Settings Page
const InputGroup = ({ label, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-zinc-700">{label}</label>
    <input type={type} className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all" />
  </div>
);