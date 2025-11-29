"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/ui/loading";
import { format } from "date-fns";

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function SubscribersPage() {
  const [data, setData] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/admin/newsletter/subscribers");
        setData(res.data.data);
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-zinc-900">Subscribers</h1>
        <div className="text-sm text-zinc-500">Total: <span className="font-bold text-zinc-900">{data.length}</span></div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider text-xs font-medium">
            <tr>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {data.map((sub) => (
              <tr key={sub._id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">{sub.email}</td>
                <td className="px-6 py-4 text-zinc-500">{format(new Date(sub.createdAt), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-zinc-400 hover:text-red-500 font-medium">Remove</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
               <tr>
                 <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">No subscribers found.</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}