// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'

// import { useEffect, useState } from 'react'
// import { Icon } from '@iconify/react'
// import {
//   getAllCategoryService,
//   createCategoryService,
//   deleteCategoryService,
//   updateCategoryService,
// } from '@/app/auth/auth.service'

// export default function AdminCategoryPage() {
//   const [categories, setCategories] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [page, setPage] = useState(1)
//   const [isEditing, setIsEditing] = useState(false)

//   const [search, setSearch] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState<any>(null)

//   const [showModal, setShowModal] = useState(false)
//   const [form, setForm] = useState({
//     name: '',
//     subCategories: '',
//     imageUploadId: '',
//   })

//   const itemsPerPage = 10

//   // FETCH
//   const fetchCategories = async () => {
//     try {
//       const res = await getAllCategoryService()
//       setCategories(res.data || res)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCategories()
//   }, [])

//   // CREATE
//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         name: form.name,
//         subCategories: form.subCategories.split(',').map((s) => s.trim()),
//         imageUploadId: Number(form.imageUploadId),
//       }

//       if (isEditing && selectedCategory) {
//         const updated = await updateCategoryService(selectedCategory.id, payload)

//         setCategories((prev) => prev.map((c) => (c.id === selectedCategory.id ? updated : c)))
//       } else {
//         const created = await createCategoryService(payload)
//         setCategories((prev) => [created, ...prev])
//       }

//       setShowModal(false)
//       setIsEditing(false)
//       setSelectedCategory(null)
//       setForm({ name: '', subCategories: '', imageUploadId: '' })
//     } catch (err: any) {
//       alert(err.message)
//     }
//   }

//   // DELETE
//   const handleDelete = async (id: number) => {
//     const confirmDelete = confirm('Delete this category?')
//     if (!confirmDelete) return

//     try {
//       await deleteCategoryService(id)
//       setCategories((prev) => prev.filter((c) => c.id !== id))
//     } catch (err) {
//       alert('Delete failed')
//     }
//   }

//   // FILTER
//   const filteredCategories = categories.filter((cat) =>
//     cat.name?.toLowerCase().includes(search.toLowerCase()),
//   )

//   const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)

//   const paginated = filteredCategories.slice((page - 1) * itemsPerPage, page * itemsPerPage)

//   return (
//     <div className="p-8">
//       <div className="mb-6 flex justify-between">
//         <h1 className="text-2xl font-bold">Categories</h1>

//         <button
//           onClick={() => setShowModal(true)}
//           className="rounded-lg bg-primary px-4 py-2 text-sm text-white"
//         >
//           + Create Category
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-64 rounded-lg border px-3 py-2 text-sm"
//         />
//       </div>

//       {/* TABLE (MATCHES USER PAGE STYLE) */}
//       <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-left text-gray-600">
//             <tr>
//               <th className="p-4">Image</th>
//               <th className="p-4">Name</th>
//               <th className="p-4">Subcategories</th>
//               <th className="p-4">Created</th>
//               <th className="p-4 text-right">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={4} className="p-6 text-center">
//                   Loading...
//                 </td>
//               </tr>
//             ) : paginated.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="p-6 text-center">
//                   No categories found
//                 </td>
//               </tr>
//             ) : (
//               paginated.map((cat) => (
//                 <tr key={cat.id} className="border-t hover:bg-gray-50">
//                   {/* IMAGE */}
//                   <td className="p-4">
//                     {cat.imageUpload?.url ? (
//                       <img
//                         src={cat.imageUpload.url}
//                         className="h-10 w-10 rounded-lg object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-500">
//                         No Img
//                       </div>
//                     )}
//                   </td>

//                   {/* NAME */}
//                   <td className="p-4 font-medium">{cat.name}</td>

//                   {/* SUBCATEGORIES */}
//                   <td className="p-4">
//                     <div className="flex flex-wrap gap-2">
//                       {cat.subCategories?.map((sub: string, i: number) => (
//                         <span key={i} className="rounded-full bg-gray-100 px-2 py-1 text-xs">
//                           {sub}
//                         </span>
//                       ))}
//                     </div>
//                   </td>

//                   {/* CREATED */}
//                   <td className="p-4 text-gray-500">
//                     {new Date(cat.created_at).toLocaleDateString()}
//                   </td>

//                   {/* ACTION */}
//                   <td className="space-x-3 p-4 text-right">
//                     <button
//                       onClick={() => {
//                         setForm({
//                           name: cat.name,
//                           subCategories: cat.subCategories.join(', '),
//                           imageUploadId: cat.imageUploadId,
//                         })
//                         setSelectedCategory(cat)
//                         setIsEditing(true)
//                         setShowModal(true)
//                       }}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <Icon icon="solar:pen-bold" width={18} />
//                     </button>

//                     <button
//                       onClick={() => handleDelete(cat.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <Icon icon="solar:trash-bin-trash-bold" width={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center gap-2">
//         {Array.from({ length: totalPages }).map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`rounded px-3 py-1 ${
//               page === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       {/* CREATE MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="w-[450px] space-y-4 rounded-xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-semibold">Create Category</h2>

//             <input
//               placeholder="Category Name"
//               className="w-full rounded border px-3 py-2 text-sm"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <input
//               placeholder="Subcategories (comma separated)"
//               className="w-full rounded border px-3 py-2 text-sm"
//               value={form.subCategories}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   subCategories: e.target.value,
//                 })
//               }
//             />

//             <input
//               placeholder="Image Upload ID"
//               className="w-full rounded border px-3 py-2 text-sm"
//               value={form.imageUploadId}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   imageUploadId: e.target.value,
//                 })
//               }
//             />

//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm">
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSubmit}
//                 className="rounded bg-primary px-4 py-2 text-sm text-white"
//               >
//                 {isEditing ? 'Update' : 'Create'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VIEW DRAWER */}
//       {selectedCategory && (
//         <div className="fixed inset-0 z-50 flex">
//           <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedCategory(null)} />

//           <div className="ml-auto w-[420px] space-y-4 bg-white p-6 shadow-2xl">
//             <h2 className="text-xl font-semibold">{selectedCategory.name}</h2>

//             <div className="space-y-2">
//               {selectedCategory.subCategories?.map((sub: string, i: number) => (
//                 <div key={i} className="text-sm">
//                   • {sub}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
