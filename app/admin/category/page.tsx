/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import {
  getAllCategoryService,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
} from '@/app/auth/auth.service'

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  
  const [form, setForm] = useState({
    name: '',
    subCategories: '',
    imageUploadId: '',
  })

  const itemsPerPage = 8

  const fetchCategories = async () => {
    try {
      const res = await getAllCategoryService()
      setCategories(res.data || res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  const handleSubmit = async () => {
    try {
      const payload = {
        name: form.name,
        subCategories: form.subCategories.split(',').map((s) => s.trim()),
        imageUploadId: Number(form.imageUploadId),
      }

      if (isEditing && selectedCategory) {
        const updated = await updateCategoryService(selectedCategory.id, payload)
        setCategories((prev) => prev.map((c) => (c.id === selectedCategory.id ? updated : c)))
      } else {
        const created = await createCategoryService(payload)
        setCategories((prev) => [created, ...prev])
      }

      closeModal()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setIsEditing(false)
    setSelectedCategory(null)
    setForm({ name: '', subCategories: '', imageUploadId: '' })
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      await deleteCategoryService(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      alert('Delete failed')
    }
  }

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const paginated = filteredCategories.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Campaign Categories</h1>
          <p className="text-gray-500 text-sm">Organize and manage fundraising causes.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-xl hover:bg-gray-800 transition-all active:scale-95"
        >
          <Icon icon="solar:add-circle-bold" width={20} />
          Create Category
        </button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative md:col-span-2">
          <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-3 flex items-center justify-between">
          <span className="text-[10px] font-black text-blue-400 uppercase">Total Types</span>
          <span className="text-lg font-black text-blue-700">{categories.length}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5">Branding</th>
                <th className="px-6 py-5">Category Name</th>
                <th className="px-6 py-5">Sub-Categories</th>
                <th className="px-6 py-5">Created Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center text-gray-400 animate-pulse">Loading categories...</td></tr>
              ) : paginated.map((cat) => (
                <tr key={cat.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    {cat.imageUpload?.url ? (
                      <img src={cat.imageUpload.url} className="h-12 w-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" />
                    ) : (
                      <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <Icon icon="solar:gallery-bold" width={20} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 text-sm">{cat.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {cat.subCategories?.slice(0, 3).map((sub: string, i: number) => (
                        <span key={i} className="rounded-full bg-white border border-gray-100 px-2.5 py-0.5 text-[9px] font-bold text-gray-500 uppercase">
                          {sub}
                        </span>
                      ))}
                      {cat.subCategories?.length > 3 && (
                        <span className="text-[9px] font-bold text-blue-500">+{cat.subCategories.length - 3} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium text-gray-400">
                    {new Date(cat.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setForm({ name: cat.name, subCategories: cat.subCategories.join(', '), imageUploadId: cat.imageUploadId })
                          setSelectedCategory(cat); setIsEditing(true); setShowModal(true);
                        }}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Icon icon="solar:pen-new-square-bold-duotone" width={20} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                        <Icon icon="solar:trash-bin-minimalistic-bold-duotone" width={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden divide-y divide-gray-50">
          {paginated.map((cat) => (
            <div key={cat.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={cat.imageUpload?.url || '/api/placeholder/48/48'} className="h-12 w-12 rounded-2xl object-cover" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{cat.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{cat.subCategories?.length || 0} Sub-categories</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button 
                   onClick={() => {
                      setForm({ name: cat.name, subCategories: cat.subCategories.join(', '), imageUploadId: cat.imageUploadId })
                      setSelectedCategory(cat); setIsEditing(true); setShowModal(true);
                   }}
                   className="p-2 text-blue-600 bg-blue-50 rounded-xl"
                >
                  <Icon icon="solar:pen-bold" width={18} />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 bg-red-50 rounded-xl">
                  <Icon icon="solar:trash-bin-trash-bold" width={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="p-2 bg-white border border-gray-100 rounded-xl disabled:opacity-30 shadow-sm"
            disabled={page === 1}
          >
            <Icon icon="solar:alt-arrow-left-linear" />
          </button>
          <span className="text-xs font-bold text-gray-500 mx-4">Page {page} of {totalPages}</span>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="p-2 bg-white border border-gray-100 rounded-xl disabled:opacity-30 shadow-sm"
            disabled={page === totalPages}
          >
            <Icon icon="solar:alt-arrow-right-linear" />
          </button>
        </div>
      )}

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={closeModal} />
          <div className="relative w-full max-w-md space-y-6 rounded-[2.5rem] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {isEditing ? 'Edit Category' : 'New Category'}
              </h2>
              <p className="text-xs text-gray-400 font-medium">Define a new cause category for the platform.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category Name</label>
                <input
                  placeholder="e.g. Education Support"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subcategories (Comma Separated)</label>
                <textarea
                  placeholder="Scholarships, Uniforms, Books..."
                  rows={3}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                  value={form.subCategories}
                  onChange={(e) => setForm({ ...form, subCategories: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Image Asset ID</label>
                <input
                  placeholder="1042"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-blue-600"
                  value={form.imageUploadId}
                  onChange={(e) => setForm({ ...form, imageUploadId: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={closeModal} className="flex-1 px-4 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-[2] rounded-2xl bg-blue-600 px-4 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
              >
                {isEditing ? 'Save Changes' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}