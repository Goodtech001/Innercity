/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { baseUrl } from '@/constants'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/utils/format-date'
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
import 'jspdf/dist/polyfills.es.js'
import { GState } from 'jspdf'

export default function UserTransactionsPage() {
  const params = useParams()
  const userId = params.id
  const searchParams = useSearchParams()

  const [transactions, setTransactions] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 1. Logic to find the name anywhere it might be hiding
  const getName = () => {
    // Priority 1: From the user state (if fetched)
    if (user) {
      const val = user.fullname || user.fullName || user.name || user.firstName || user.username;
      if (val) return val;
    }

    // Priority 2: From the very first transaction (common for guest donations)
    if (transactions.length > 0) {
      const tx = transactions[0];
      const txName = tx.user?.fullname || tx.user?.fullName || tx.donorName || tx.fullname;
      if (txName) return txName;
    }

    // Priority 3: From the URL
    const queryName = searchParams.get('name');
    if (queryName && queryName !== 'undefined' && queryName !== 'null') return queryName;

    return 'User';
  }

  const fullname = getName(); // This re-calculates every render

  const fetchTransactions = async () => {
    try {
      const stored = sessionStorage.getItem('course-training-profile')
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.token

      const res = await fetch(`${baseUrl}/payments/history/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await res.json()

      if (Array.isArray(data)) {
        setTransactions(data)
        if (data.length > 0) {
          // WE SET THE USER STATE HERE
          setUser(data[0].user)
          
          // DEBUG: This will show you the EXACT keys in your browser console (F12)
          console.log("BACKEND DATA KEYS:", data[0]);
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
  }, [userId])

  // --- PDF & Utility Functions ---
  const getBase64FromUrl = async (url: string) => {
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      })
    } catch (e) { return "" }
  }

  const handleDownloadPDF = async () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const logoBase64 = await getBase64FromUrl('/assets/images/main-logo.png')

    doc.setFontSize(18); doc.text('FUNDRAISE', 14, 20)
    doc.text(`Account Name: ${fullname}`, 14, 35) // USES THE RESOLVED NAME

    autoTable(doc, {
      startY: 60,
      head: [['Date', 'Reference', 'Campaign', 'Method', 'Status', 'Amount']],
      body: transactions.map(tx => [
        formatDate(tx.created_at).commaDateFormat,
        tx.reference,
        tx.campaign?.title || '-',
        tx.method?.toUpperCase(),
        tx.status?.toUpperCase(),
        `N${Number(tx.amount).toLocaleString()}`
      ]),
    })
    doc.save(`${fullname}-statement.pdf`)
  }

  const totalDonated = transactions.reduce((acc, tx) => acc + Number(tx.amount || 0), 0)
  
  const getInitials = (name: string) => {
    if (!name || name === 'User') return 'U'
    return name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase()
  }

  const avatar = user?.avatar ? `https://fundraise.theinnercitymission.ngo/${user?.avatar}` : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-40 bg-gradient-to-r from-primary to-purple-600">
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
          {avatar ? (
            <Image src={avatar} className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg" alt="" width={112} height={112} />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white text-3xl font-bold text-primary shadow-lg">
              {getInitials(fullname)}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {fullname}&apos;s Transaction History
        </h1>
        <p className="mt-2 text-gray-500">Total Donations</p>
        <p className="text-3xl font-bold text-primary">₦{totalDonated.toLocaleString()}</p>

        <button onClick={handleDownloadPDF} className="mt-4 rounded-lg bg-primary px-6 py-2 font-semibold text-white shadow hover:scale-[1.02] transition-transform">
          Download Statement (PDF)
        </button>
      </div>

      <div className="mx-auto mt-10 max-w-5xl mb-10 rounded-xl border bg-white shadow overflow-hidden">
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
            {!loading && transactions.map((tx) => (
              <tr key={tx.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{tx.campaign?.title || 'Direct Donation'}</td>
                <td className="p-4 font-mono text-xs">{tx.reference}</td>
                <td className="p-4 capitalize">{tx.method}</td>
                <td className="p-4 font-semibold text-primary">₦{Number(tx.amount).toLocaleString()}</td>
                <td className="p-4 capitalize text-xs font-bold">{tx.status}</td>
                <td className="p-4 text-gray-500">{formatDate(tx.created_at).commaDateFormat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}