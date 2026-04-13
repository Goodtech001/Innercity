"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

/* =====================
   TYPES
===================== */

type TCountryCurrency = {
  abv: string;
  country: string;
  currency: string;
  symbol: string;
  icon: React.JSX.Element;
};

type TVoucher = {
  code: string;
  amount: number;
  currency: string;
  used: boolean;
  createdAt: string;
};

/* =====================
   CURRENCY LIST
===================== */

const countryCurrencyList: TCountryCurrency[] = [
  {
    abv: "NGN",
    country: "Nigeria",
    currency: "Naira",
    symbol: "₦",
    icon: <Icon icon="emojione-v1:flag-for-nigeria" className="h-5 w-5" />,
  },
  {
    abv: "USD",
    country: "USA",
    currency: "US Dollars",
    symbol: "$",
    icon: <Icon icon="emojione-v1:flag-for-united-states" className="h-5 w-5" />,
  },
  {
    abv: "ZAR",
    country: "South Africa",
    currency: "Rand",
    symbol: "R",
    icon: <Icon icon="emojione-v1:flag-for-south-africa" className="h-5 w-5" />,
  },
];

/* =====================
   HELPERS
===================== */

function generateVoucherCode() {
  const prefix = "FUND";
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${year}-${random}`;
}

/* =====================
   COMPONENTS
===================== */

function CountryCurrencyDropdown({
  value,
  onChange,
}: {
  value: TCountryCurrency;
  onChange: (v: TCountryCurrency) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border-r"
      >
        {value.icon}
        <span className="font-medium">{value.abv}</span>
        <Icon icon="mdi:chevron-down" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-44 rounded-lg border bg-white shadow">
          {countryCurrencyList.map(c => (
            <button
              key={c.abv}
              onClick={() => {
                onChange(c);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100"
            >
              {c.icon}
              <span>{c.abv}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =====================
   PAGE
===================== */

export default function VoucherManagementPage() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(countryCurrencyList[0]);
  const [vouchers, setVouchers] = useState<TVoucher[]>([]);

  const createVoucher = () => {
    if (!amount) return;

    setVouchers(prev => [
      {
        code: generateVoucherCode(),
        amount: Number(amount),
        currency: currency.abv,
        used: false,
        createdAt: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);

    setAmount("");
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Voucher Management</h1>
        <p className="text-gray-500">Generate and manage payment vouchers.</p>
      </header>

      {/* Create Voucher */}
      <section className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="text-lg font-semibold">Create Voucher</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <div className="flex items-center rounded-lg border">
              <CountryCurrencyDropdown value={currency} onChange={setCurrency} />
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-full px-4 py-2 outline-none"
              />
            </div>
          </div>
        </div>

        <button
          onClick={createVoucher}
          className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Generate Voucher
        </button>
      </section>

      {/* Voucher Table */}
      <section className="bg-white rounded-2xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Issued Vouchers</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Code</th>
                <th className="py-3 text-left">Amount</th>
                <th className="py-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {vouchers.map(v => (
                <tr key={v.code} className="hover:bg-gray-50">
                  <td className="py-3">
                    <span
                      className={`inline-flex h-3 w-3 rounded-full ${
                        v.used ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </td>
                  <td className="py-3 font-mono flex items-center gap-2">
                    {v.code}
                    <button
                      onClick={() => copyCode(v.code)}
                      title="Copy voucher code"
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <Icon icon="mdi:content-copy" />
                    </button>
                  </td>
                  <td className="py-3 font-medium">
                    {v.currency} {v.amount.toLocaleString()}
                  </td>
                  <td className="py-3">{v.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!vouchers.length && (
            <p className="text-sm text-gray-500 mt-4">No vouchers created yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
