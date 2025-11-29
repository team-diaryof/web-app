"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/ui/loading";
import { format } from "date-fns";
import { Mail, Phone, Calendar } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/admin/contact");
        setMessages(res.data.data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><Loading size="lg" /></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-zinc-900">Inbox</h1>

      <div className="grid gap-4">
        {messages.map((msg) => (
          <div key={msg._id} className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-bold text-lg text-zinc-900">{msg.name}</h3>
                <div className="flex items-center gap-4 text-sm text-zinc-500 mt-1">
                   <span className="flex items-center gap-1"><Mail size={14} /> {msg.email}</span>
                   {msg.phone && <span className="flex items-center gap-1"><Phone size={14} /> {msg.phone}</span>}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium uppercase tracking-wider bg-zinc-100 px-2 py-1 rounded text-zinc-600 mb-1">
                  {msg.interest}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  <Calendar size={12} /> {format(new Date(msg.createdAt), 'MMM dd, hh:mm a')}
                </span>
              </div>
            </div>
            
            <div className="bg-zinc-50 p-4 rounded-lg text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap">
              {msg.message}
            </div>
          </div>
        ))}

        {messages.length === 0 && (
             <div className="text-center py-20 bg-white rounded-xl border border-zinc-100 text-zinc-400">
                <Mail size={48} className="mx-auto mb-4 opacity-20" />
                <p>No messages received yet.</p>
             </div>
        )}
      </div>
    </div>
  );
}