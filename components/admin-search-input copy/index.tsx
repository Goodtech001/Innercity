'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminSearchInput() {
  const [input, setInput] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    router.push(`/search?query=${encodeURIComponent(input.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
      <input
        type="text"
        placeholder="Search Transactions..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded border bg-transparent border-gray-400 px-4 py-2 text-sm shadow-sm"
      />
      <button
        type="submit"
        className="rounded bg-primary px-4 py-2 text-white text-sm font-semibold"
      >
        Search
      </button>
    </form>
  )
}
