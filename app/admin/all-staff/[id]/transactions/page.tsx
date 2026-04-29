/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { baseUrl } from '@/constants'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { formatDate } from '@/utils/format-date'
// import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logo from '@/public/assets/images/main-logo.png'
import jsPDF from 'jspdf'
import 'jspdf/dist/polyfills.es.js' // optional safety

// 👇 ADD THIS
import { GState } from 'jspdf'

export default function UserTransactionsPage() {
  const params = useParams()
  const userId = params.id

  const searchParams = useSearchParams()

  const fullname = searchParams.get('name') || 'User'
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

  const getBase64FromUrl = async (url: string) => {
    const res = await fetch(url)
    const blob = await res.blob()

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

 const handleDownloadPDF = async () => {
  try {
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // ✅ Load logo properly
    const logoBase64 = await getBase64FromUrl('/assets/images/main-logo.png')

    // ===== HEADER =====
    doc.setFontSize(18)
    doc.setTextColor(0)
    doc.text('FUNDRAISE', 14, 20)

    doc.setFontSize(10)
    doc.text('Transaction Statement', pageWidth - 14, 20, { align: 'right' })

    doc.setDrawColor(0)
    doc.line(14, 24, pageWidth - 14, 24)

    // ===== ACCOUNT INFO =====
    doc.setFontSize(10)

    doc.text(`Account Name:`, 14, 35)
    doc.text(fullname, 60, 35)

    doc.text(`User ID:`, 14, 42)
    doc.text(String(userId), 60, 42)

    doc.text(`Statement Date:`, 14, 49)
    doc.text(new Date().toLocaleDateString(), 60, 49)

    doc.text(`Currency:`, pageWidth - 80, 35)
    doc.text('NGN', pageWidth - 30, 35, { align: 'right' })

    doc.text(`Total Transactions:`, pageWidth - 80, 42)
    doc.text(String(transactions.length), pageWidth - 30, 42, { align: 'right' })

    doc.text(`Total Amount:`, pageWidth - 80, 49)
    doc.text(`$${totalDonated.toLocaleString()}`, pageWidth - 30, 49, {
      align: 'right',
    })

    // ===== WATERMARK (BEHIND TABLE) =====
    doc.setGState(new GState({ opacity: 0.04 }))

    doc.addImage(
      logoBase64,
      'PNG',
      pageWidth / 2 - 70,
      pageHeight / 2 - 70,
      140,
      140
    )

    doc.setGState(new GState({ opacity: 1 }))

    // ===== TABLE DATA =====
    const tableData = transactions.map((tx) => [
      formatDate(tx.created_at).commaDateFormat,
      tx.reference,
      tx.campaign?.title || '-',
      tx.method?.toUpperCase(),
      tx.status?.toUpperCase(),
      `$${Number(tx.amount).toLocaleString()}`,
    ])

    // ===== TABLE =====
    autoTable(doc, {
      startY: 60,
      head: [['Date', 'Reference', 'Campaign', 'Method', 'Status', 'Amount']],
      body: tableData,

      theme: 'plain', // 🔥 removes background

      headStyles: {
        textColor: 0,
        fontStyle: 'bold',
        fillColor: false,
      },

      styles: {
        fontSize: 9,
        textColor: 20,
        cellPadding: 3,
        fillColor: false, // 🔥 transparent cells
      },

      columnStyles: {
        5: { halign: 'right' },
      },

      didDrawCell: (data) => {
        const { cell } = data

        // subtle horizontal divider (bank style)
        doc.setDrawColor(220)
        doc.setLineWidth(0.1)

        doc.line(
          cell.x,
          cell.y + cell.height,
          cell.x + cell.width,
          cell.y + cell.height
        )
      },

      didDrawPage: () => {
        // ===== FOOTER =====
        doc.setFontSize(8)
        doc.setTextColor(120)

        doc.text(
          `Page ${doc.getNumberOfPages()}`,
          pageWidth - 14,
          pageHeight - 10,
          { align: 'right' }
        )

        doc.text(
          'This is a system-generated statement. No signature is required.',
          14,
          pageHeight - 10
        )
      },
    })

    doc.save(`${fullname}-statement.pdf`)
  } catch (err) {
    console.error('PDF Error:', err)
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
              src={avatar}
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
        <h1 className="text-2xl font-bold text-gray-800">{fullname}&apos;s Transaction History</h1>

        <p className="mt-2 text-gray-500">Total Donations</p>

        <p className="text-3xl font-bold text-primary">₦{totalDonated.toLocaleString()}</p>

        <button
          onClick={handleDownloadPDF}
          className="mt-4 rounded-lg bg-primary px-6 py-2 font-semibold text-white shadow hover:scale-[1.02]"
        >
          Download Statement (PDF)
        </button>
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
                  {Number(tx.amount).toLocaleString()}
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
