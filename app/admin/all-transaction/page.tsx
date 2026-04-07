/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { baseUrl } from '@/constants'

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = async () => {
    try {
      const stored = sessionStorage.getItem('course-training-profile')
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.token

      const res = await fetch(`${baseUrl}/payments/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      setTransactions(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Transaction History</h1>

      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Reference</th>
              <th className="p-4">Donor Email</th>
              <th className="p-4">Campaign</th>
              <th className="p-4">Campaign Owner</th>
              <th className="p-4">Method</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-6 text-center">
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{tx.id}</td>

                  <td className="p-4 font-mono text-xs">{tx.reference}</td>

                  <td className="p-4">{tx.email}</td>

                  <td className="p-4">{tx.campaign?.title}</td>

                  <td className="p-4">{tx.campaign?.user?.fullname}</td>

                  <td className="p-4 capitalize">{tx.method}</td>

                  <td className="p-4 font-semibold text-primary">
                    ${Number(tx.amount).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {tx.status === 'success' && <span className="text-green-600">✓ Success</span>}

                    {tx.status === 'pending' && <span className="text-yellow-600">Pending</span>}

                    {tx.status === 'failed' && <span className="text-red-500">Failed</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
