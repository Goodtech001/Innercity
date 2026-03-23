/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { baseUrl } from '@/constants'
import CardTemplateBuilder from '@/components/admin/CardTemplateBuilder'

export default function CreateCardTemplate() {
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [imageUploadId, setImageUploadId] = useState('')

  const [textColor, setTextColor] = useState('black')
  const [textOutlineColor, setTextOutlineColor] = useState('white')

  const [holeX, setHoleX] = useState('')
  const [holeY, setHoleY] = useState('')
  const [holeWidth, setHoleWidth] = useState('')
  const [holeHeight, setHoleHeight] = useState('')

  const [excerptX, setExcerptX] = useState('')
  const [excerptY, setExcerptY] = useState('')

  const [categories, setCategories] = useState<any[]>([])
  const [uploads, setUploads] = useState<any[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [templateImageUrl, setTemplateImageUrl] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('course-training-profile')

    if (stored) {
      const parsed = JSON.parse(stored)
      setToken(parsed?.token || null)
    }

    fetchCategories()
    fetchUploads()

    console.log('Fetching uploads...')
  }, [])

  const fetchCategories = async () => {
    const res = await fetch(`${baseUrl}/category`)
    const data = await res.json()

    const categoriesArray = Array.isArray(data) ? data : data.data || data.categories || []

    setCategories(categoriesArray)
  }

  const fetchUploads = async () => {
    try {
      const res = await fetch(`${baseUrl}/uploads`)
      const data = await res.json()

      console.log('UPLOADS RESPONSE:', data)

      if (!Array.isArray(data)) {
        console.error('Uploads not array:', data)
        return
      }

      // allow card-template OR card template
      const templates = data.filter((img: any) => img.type?.includes('card-template'))

      console.log('FILTERED TEMPLATES:', templates)

      setUploads(templates)
    } catch (err) {
      console.error('Upload fetch error:', err)
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${baseUrl}/card-template/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          categoryId: Number(categoryId),
          imageUploadId: Number(imageUploadId),
          textColor,
          textOutlineColor,
          holeX: Number(holeX),
          holeY: Number(holeY),
          holeWidth: Number(holeWidth),
          holeHeight: Number(holeHeight),
          excerptX: Number(excerptX),
          excerptY: Number(excerptY),
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error('Failed')

      alert('Card template created')
    } catch (err) {
      console.error(err)
      alert('Error creating template')
    }
  }

  return (
    <div className="max-w-xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Create Card Template</h1>

      {/* NAME */}

      <input
        placeholder="Template name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 w-full border p-2"
      />

      {/* CATEGORY */}

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="mb-4 w-full border p-2"
      >
        <option>Select Category</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* TEMPLATE IMAGE */}

      <select
        value={imageUploadId}
        onChange={(e) => {
          const id = e.target.value
          setImageUploadId(id)

          const selected = uploads.find((img: any) => img.id === Number(id))

          if (selected) {
            setTemplateImageUrl(selected.url)
          }
        }}
        className="mb-4 w-full border p-2"
      >
        <option value="">Select Template Image</option>

        {uploads.map((img: any) => (
          <option key={img.id} value={img.id}>
            Template #{img.id}
          </option>
        ))}
      </select>

      <p className="mb-2 text-xs text-gray-500">Templates loaded: {uploads.length}</p>

      {templateImageUrl && (
        <div className="mb-4">
          <img src={templateImageUrl} className="w-full rounded border" />
        </div>
      )}

      {templateImageUrl && (
        <CardTemplateBuilder
          templateImage={templateImageUrl}
          onChange={(values: any) => {
            setHoleX(values.holeX)
            setHoleY(values.holeY)
            setHoleWidth(values.holeWidth)
            setHoleHeight(values.holeHeight)
            setExcerptX(values.excerptX)
            setExcerptY(values.excerptY)
          }}
        />
      )}

      <button onClick={handleSubmit} className="btn-primary mt-6">
        Create Template
      </button>
    </div>
  )
}
