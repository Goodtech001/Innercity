/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'

export default function AdminComplaintsPage() {

  const [complaints, setComplaints] = useState<any[]>([])

  useEffect(() => {
    const fetchComplaints = async () => {
      const res = await fetch('/api/complaints')
      const data = await res.json()
      setComplaints(data.data || [])
    }

    fetchComplaints()
  }, [])

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-6">
        User Complaints
      </h1>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Message</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.message}</td>
              <td>{c.status}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}