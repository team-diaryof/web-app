import React from 'react';
import { Cloud, Music, Image as ImageIcon } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <div className="space-y-10">
        <div>
            <h2 className="text-2xl font-serif text-zinc-900">Integrations</h2>
            <p className="text-zinc-500 mt-1">Connect your diary with your favorite apps.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
            <IntegrationCard 
                icon={<Cloud size={24} />} 
                name="Google Drive" 
                desc="Back up your entries automatically to your personal drive."
                connected={true}
            />
            <IntegrationCard 
                icon={<Music size={24} />} 
                name="Spotify" 
                desc="Automatically add your 'Now Playing' song to your daily entry."
                connected={false}
            />
             <IntegrationCard 
                icon={<ImageIcon size={24} />} 
                name="Pinterest" 
                desc="Import pins to your inspiration board."
                connected={false}
            />
        </div>
    </div>
  );
}

const IntegrationCard = ({ icon, name, desc, connected }: any) => (
    <div className="flex items-center justify-between p-5 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors bg-white">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-zinc-50 rounded-lg text-zinc-600 border border-zinc-100">
                {icon}
            </div>
            <div>
                <h4 className="text-base font-medium text-zinc-900">{name}</h4>
                <p className="text-sm text-zinc-500 mt-0.5 max-w-sm">{desc}</p>
            </div>
        </div>
        <button className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
            connected 
            ? 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50' 
            : 'bg-zinc-900 border-transparent text-white hover:bg-black'
        }`}>
            {connected ? 'Manage' : 'Connect'}
        </button>
    </div>
)