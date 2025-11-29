import React from 'react';
import { CheckCircle, Download, CreditCard, Clock } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="space-y-10">
       <div className="flex justify-between items-end">
            <div>
                <h2 className="text-2xl font-serif text-zinc-900">Billing & Plans</h2>
                <p className="text-zinc-500 mt-1">Manage your subscription and payment methods.</p>
            </div>
       </div>

       {/* Current Plan Card */}
       <div className="p-6 rounded-2xl border border-yellow-200 bg-white relative overflow-hidden">
            {/* Subtle Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold tracking-wider text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full uppercase">Current Plan</span>
                    </div>
                    <h3 className="text-3xl font-serif text-zinc-900">Pro Annual</h3>
                    <div className="flex items-center gap-2 text-zinc-500 mt-2 text-sm">
                        <Clock size={14} /> Renews on November 29, 2026
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-50 transition-colors">Cancel</button>
                    <button className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm">Upgrade Plan</button>
                </div>
            </div>
       </div>

        <div className="h-px w-full bg-zinc-100" />

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Payment Method */}
            <section>
                <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-14 bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center text-zinc-400">
                           <CreditCard size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-900">Visa ending in 4242</p>
                            <p className="text-xs text-zinc-500">Expiry 12/2028</p>
                        </div>
                    </div>
                    <button className="text-xs font-medium text-zinc-500 group-hover:text-zinc-900 px-3 py-1.5 rounded bg-zinc-50 group-hover:bg-zinc-100 transition-colors">Edit</button>
                </div>
            </section>

            {/* Invoices */}
            <section>
                <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Invoice History</h3>
                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                    <InvoiceRow date="Oct 21, 2025" amount="$49.00" />
                    <InvoiceRow date="Oct 21, 2024" amount="$49.00" />
                </div>
            </section>
       </div>
    </div>
  );
}

const InvoiceRow = ({ date, amount }: any) => (
    <div className="flex items-center justify-between p-4 border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
        <div>
            <p className="text-sm font-medium text-zinc-900">Pro Annual</p>
            <p className="text-xs text-zinc-500">{date}</p>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600">{amount}</span>
            <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-zinc-200">
                <Download size={16} />
            </button>
        </div>
    </div>
)