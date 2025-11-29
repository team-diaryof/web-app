import React from 'react';
import { Camera } from 'lucide-react';

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-serif text-zinc-900">General Information</h2>
        <p className="text-zinc-500 mt-1">Manage your personal details and workspace preferences.</p>
      </div>

      <div className="h-px w-full bg-zinc-100" />

      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="relative group cursor-pointer w-fit">
          <div className="h-24 w-24 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 font-serif text-3xl overflow-hidden">
             SA
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={24} className="text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium text-zinc-900">Profile Photo</h3>
          <p className="text-sm text-zinc-500 mb-4 max-w-xs">This image will be displayed on your public profile and shared entries.</p>
          <div className="flex gap-3">
             <button className="text-xs font-medium text-zinc-900 bg-white border border-zinc-200 px-4 py-2 rounded-lg hover:bg-zinc-50 transition-colors">Change Photo</button>
             <button className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">Remove</button>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-zinc-100" />

      {/* Form Fields */}
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="First Name" defaultValue="Saquib" />
          <InputGroup label="Last Name" defaultValue="Ali" />
        </div>

        <InputGroup 
          label="Email Address" 
          defaultValue="saquib@diaryof.com" 
          disabled 
          helper="Contact support to change your email."
        />

        <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Bio</label>
            <textarea 
                className="w-full min-h-[120px] rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all resize-none"
                placeholder="Write a few sentences about yourself..."
                defaultValue="I'm a software engineer based in India. I love building minimal web applications."
            />
            <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Markdown supported</span>
                <span>0 / 240</span>
            </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-4">
            <button type="button" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 px-4 py-2">Cancel</button>
            <button type="submit" className="bg-zinc-900 hover:bg-black text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all hover:translate-y-px">
                Save Changes
            </button>
        </div>
      </form>
    </div>
  );
}

// Reusable Input Component
const InputGroup = ({ label, defaultValue, type = "text", disabled = false, helper }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-zinc-700">{label}</label>
    <input
      type={type}
      defaultValue={defaultValue}
      disabled={disabled}
      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all 
        ${disabled 
            ? 'bg-zinc-50/50 text-zinc-500 border-zinc-200 cursor-not-allowed' 
            : 'bg-white border-zinc-200 text-zinc-900 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100'
        }`}
    />
    {helper && <p className="text-xs text-zinc-500">{helper}</p>}
  </div>
);