/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { baseUrl } from '@/constants'
import { useParams } from 'next/navigation'
import Image from 'next/image'
 import { useSearchParams } from "next/navigation"
import { formatDate } from '@/utils/format-date'

export default function UserTransactionsPage() {
  const params = useParams()
  const userId = params.id

const searchParams = useSearchParams()

const fullname = searchParams.get("name") || "User"
// const avatar = searchParams.get("avatar")

  const [transactions, setTransactions] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchTransactions = async () => {
    try {
      const stored = sessionStorage.getItem('course-training-profile')
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.token

      const res = await fetch(`${baseUrl}/payments/history/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      console.log(data)

      if (Array.isArray(data)) {
        setTransactions(data)

        if (data.length > 0) {
          setUser(data[0].user)
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const totalDonated = transactions.reduce((acc, tx) => acc + Number(tx.amount || 0), 0)

  const getInitials = (name: string) => {
    if (!name) return 'U'
    const parts = name.split(' ')
    return parts
      .map((p) => p[0])
      .join('')
      .toUpperCase()
  }

  // const avatar = user?.avatar ? `https://fundraise.theinnercitymission.ngo/${user.avatar}` : null
     const avatar = user?.avatar ? `https://fundraise.theinnercitymission.ngo/${user?.avatar}` : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER GRADIENT */}

      <div className="relative h-40 bg-gradient-to-r from-primary to-purple-600">
        {/* Avatar */}

        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
          {avatar ? (
            <Image
              src={avatar }
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
              alt={''}
              width={100}
              height={100}
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white text-3xl font-bold text-primary shadow-lg">
              {getInitials(fullname)}
            </div>
          )}
        </div>
      </div>

      {/* USER INFO */}

      <div className="mt-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {fullname}&apos;s Transaction History
        </h1>

        <p className="mt-2 text-gray-500">Total Donations</p>

        <p className="text-3xl font-bold text-primary">₦{totalDonated.toLocaleString()}</p>
      </div>

      {/* TRANSACTION TABLE */}

      <div className="mx-auto mt-10 max-w-5xl rounded-xl border bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">Campaign</th>
              <th className="p-4">Reference</th>
              <th className="p-4">Method</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Loading transactions...
                </td>
              </tr>
            )}

            {!loading && transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  No transactions found
                </td>
              </tr>
            )}

            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{tx.campaign?.title}</td>

                <td className="p-4 font-mono text-xs">{tx.reference}</td>

                <td className="p-4 capitalize">{tx.method}</td>

                <td className="p-4 font-semibold text-primary">
                  ₦{Number(tx.amount).toLocaleString()}
                </td>

                <td className="p-4">
                  {tx.status === 'success' && (
                    <span className="font-medium text-green-600">Success</span>
                  )}

                  {tx.status === 'pending' && (
                    <span className="font-medium text-yellow-600">Pending</span>
                  )}

                  {tx.status === 'failed' && (
                    <span className="font-medium text-red-500">Failed</span>
                  )}
                </td>

                <td className="p-4 text-gray-500">{formatDate(tx.created_at).commaDateFormat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
