/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { baseUrl } from "@/constants";
import { toast } from "react-hot-toast";

/* =====================
    TYPES & CONSTANTS
===================== */
type TVoucher = {
  id: number;
  amount: number;
  pin1: number | string;
  pin2: number | string;
  pin3: number | string;
  pin4: number | string;
  voucher: string;
  used: boolean;
  date_used: string | null;
  currency: string;
  user: string | null;
  user_id: number | null;
  created_at: string;
  updated_at: string;
};

const currencies = ["NGN", "USD", "ZAR", "GBP", "EUR"];

export default function VoucherManagementPage() {
  // State for Table
  const [vouchers, setVouchers] = useState<TVoucher[]>([]);
  const [fetching, setFetching] = useState(true);

  // State for Modal & Generation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchVouchers = async () => {
    try {
      setFetching(true);
      const res = await fetch(`${baseUrl}/voucher`, { credentials: "include" });
      const result = await res.json();
      const data = result?.data || result;
      setVouchers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Could not load vouchers");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return toast.error("Please enter an amount");

    try {
      setIsGenerating(true);
      const res = await fetch(`${baseUrl}/voucher/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: Number(amount),
          currency,
          count: 1,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Generation failed");

      toast.success("Voucher Created!");
      setIsModalOpen(false);
      setAmount("");
      fetchVouchers(); // Refresh list
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Voucher System</h1>
          <p className="text-gray-500 text-sm">Managing {vouchers.length} total records</p>
        </div>
        <button onClick={fetchVouchers} className="p-2 hover:bg-gray-100 rounded-full">
          <Icon icon="mdi:refresh" className={fetching ? "animate-spin" : ""} width={24} />
        </button>
      </header>

      {/* VOUCHER TABLE */}
      <section className="bg-white dark:bg-[#0B0F19] rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-white/5 text-gray-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Full Code</th>
                <th className="p-4">PIN Segments</th>
                <th className="p-4">Value</th>
                <th className="p-4">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/5">
              {vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="p-4 font-mono text-gray-400">#{v.id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      v.used ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}>
                      {v.used ? "USED" : "AVAILABLE"}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold tracking-wider">{v.voucher}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {[v.pin1, v.pin2, v.pin3, v.pin4].map((p, i) => (
                        <span key={i} className="bg-gray-100 dark:bg-white/10 px-1.5 rounded text-[10px]">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-semibold">{v.currency} {v.amount.toLocaleString()}</td>
                  <td className="p-4 text-gray-500 text-xs">
                    {new Date(v.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-40"
      >
        <Icon icon="mdi:plus" width={32} />
      </button>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => !isGenerating && setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-[#0B0F19] w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-2">Generate New Voucher</h2>
            <p className="text-gray-500 text-sm mb-6">Enter the value for the single-use voucher.</p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Amount</label>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isGenerating}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex-1 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-lg shadow-blue-500/30 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? "Processing..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}