'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// ✅ Strong type
type Payment = {
  status: string
  created_at: string
  amount: number | string
}

// ✅ Accept flexible API shape
type Props = {
  payments: Payment[] | { data?: Payment[]; payments?: Payment[] } | null
}

// ✅ Normalize once
const normalizePayments = (input: Props['payments']): Payment[] => {
  if (!input) return []

  if (Array.isArray(input)) return input

  if ('data' in input && Array.isArray(input.data)) {
    return input.data
  }

  if ('payments' in input && Array.isArray(input.payments)) {
    return input.payments
  }

  return []
}

export default function RevenueChart({ payments }: Props) {
  const safePayments = normalizePayments(payments)

  const data = safePayments
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
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}