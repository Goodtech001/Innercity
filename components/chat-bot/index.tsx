/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'

export default function SupportPage() {

  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }

    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input })
    })

    const data = await res.json()

    setMessages(prev => [...prev, { role:'assistant', content:data.reply }])

    setInput('')
    setLoading(false)
  }

  return (
    <div className="max-w- mx-auto p-">

      {/* <h1 className="text-2xl font-bold mb-4">
        Support Assistant
      </h1> */}

      <div className=" h-[500px] overflow-y-auto p-4 bg-white">

        {messages.map((m,i)=>(
          <div key={i} className={m.role === 'user' ? 'text-right':'text-left'}>
            <p className="inline-block bg-gray-100 px-3 py-2 rounded-lg my-1">
              {m.content}
            </p>
          </div>
        ))}

        {loading && <p className="text-sm text-gray-400">Thinking...</p>}

      </div>

      <div className="flex gap-2 mt-4">

        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          className="flex-1 border border-gray-200 rounded p-2"
        />

        <button
          onClick={send}
          className="btn-primary px-4 max-w-xs"
        >
          Send
        </button>

      </div>
    </div>
  )
}