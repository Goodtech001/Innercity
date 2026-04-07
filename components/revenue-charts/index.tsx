/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  payments: any[]
}

export default function RevenueChart({ payments }: Props) {

  const data = payments
    .filter((p) => p.status === 'success')
    .map((p) => ({
      date: new Date(p.created_at).toLocaleDateString(),
      amount: Number(p.amount),
    }))

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="font-semibold mb-4 text-lg">Revenue Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(v) =>
              new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
              }).format(Number(v))
            }
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}