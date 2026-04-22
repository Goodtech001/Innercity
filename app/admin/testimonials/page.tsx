/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { deleteTestimonialService, getTestimonialsService } from "@/app/auth/auth.service"
import { toast } from "react-hot-toast"

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 8

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await getTestimonialsService()
      setTestimonials(data.data || data)
    } catch (err) {
      toast.error("Failed to fetch testimonials")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return
    try {
      await deleteTestimonialService(id)
      setTestimonials((prev) => prev.filter((t) => t.id !== id))
      toast.success("Deleted successfully")
    } catch (err) {
      toast.error("Delete failed")
    }
  }

  const filteredData = testimonials.filter(t => 
    t.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header & Search */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full rounded-xl border bg-white px-4 py-2 text-sm outline-none md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link href="/admin/testimonials/create" className="shrink-0 rounded-xl bg-primary p-2.5 text-white">
              <Icon icon="solar:add-circle-bold" width={20} />
            </Link>
          </div>
        </div>

        {/* ✅ MOBILE VIEW: Card List (Hidden on Desktop) */}
        <div className="grid gap-4 md:hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Loading...</div>
          ) : paginatedData.map((item) => (
            <div key={item.id} className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={item.avatar?.url || "/avatar.png"} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-900">{item.clientName}</p>
                    <p className="text-xs text-gray-400">{item.location}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 p-2">
                  <Icon icon="solar:trash-bin-trash-bold" width={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 italic">&quot;{item.content}&quot;</p>
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  ${item.donatedAmount}
                </span>
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="solar:star-bold" width={12} className={i < (item.rating || 5) ? "" : "opacity-20"} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ DESKTOP VIEW: Table (Hidden on Mobile) */}
        <div className="hidden overflow-hidden rounded-2xl border bg-white md:block">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="p-4">Client</th>
                <th className="p-4">Message</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={item.avatar?.url || "/avatar.png"} className="h-10 w-10 rounded-full object-cover" />
                    <span className="font-medium">{item.clientName}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 max-w-md truncate">{item.content}</td>
                  <td className="p-4 text-sm font-bold text-green-600">${item.donatedAmount}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500">
                      <Icon icon="solar:trash-bin-trash-bold" width={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination logic remains same */}
        {filteredData.length === 0 && !loading && (
          <div className="py-20 text-center text-gray-500">No records found</div>
        )}
      </div>
    </div>
  )
}


// "use client"

// import { createTestimonialService } from "@/app/auth/auth.service"
// import { useState } from "react"
// // import { createTestimonialService } from "@/services/testimonial.service"

// export default function CreateTestimonialPage() {
//   const [form, setForm] = useState({
//     clientName: "",
//     content: "",
//     donatedAmount: "",
//     donations: "",
//     location: "",
//     rating: 5,
//     avatarUploadId: ""
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       await createTestimonialService({
//         ...form,
//         avatarUploadId: Number(form.avatarUploadId),
//       })

//       alert("Testimonial created successfully")
//     } catch (err) {
//       console.error(err)
//       alert("Failed")
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         placeholder="Client Name"
//         onChange={(e) => setForm({ ...form, clientName: e.target.value })}
//       />

//       <textarea
//         placeholder="Content"
//         onChange={(e) => setForm({ ...form, content: e.target.value })}
//       />

//       <input
//         placeholder="Donated Amount"
//         onChange={(e) => setForm({ ...form, donatedAmount: e.target.value })}
//       />

//       <input
//         placeholder="Donations"
//         onChange={(e) => setForm({ ...form, donations: e.target.value })}
//       />

//       <input
//         placeholder="Location"
//         onChange={(e) => setForm({ ...form, location: e.target.value })}
//       />

//       <input
//         placeholder="Avatar Upload ID"
//         type="number"
//         onChange={(e) => setForm({ ...form, avatarUploadId: e.target.value })}
//       />

//       <button type="submit" className="btn-white">Create</button>
//     </form>
//   )
// }




// "use client"

// import { createTestimonialService, uploadFileService } from "@/app/auth/auth.service"
// import { useState } from "react"
// // import {
// //   uploadFileService,
// //   createTestimonialService,
// // // } from "@/services/testimonial.service"

// export default function CreateTestimonialPage() {
//   const [file, setFile] = useState<File | null>(null)
//   const [loading, setLoading] = useState(false)

//   const [form, setForm] = useState({
//     clientName: "",
//     content: "",
//     donatedAmount: "",
//     donations: "",
//     location: "",
//     rating: 5,
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       let uploadId = null

//       if (file) {
//         const uploadRes = await uploadFileService(file)
//         uploadId = uploadRes.id
//       }

//       await createTestimonialService({
//         ...form,
//         avatarUploadId: uploadId,
//       })

//       alert("Testimonial created successfully")
//     } catch (err) {
//       console.error(err)
//       alert("Failed to create testimonial")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="p-6 max-w-xl">
//       <h2 className="text-2xl font-bold mb-4">Create Testimonial</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input placeholder="Client Name"
//           onChange={(e) => setForm({ ...form, clientName: e.target.value })}
//         />

//         <textarea placeholder="Content"
//           onChange={(e) => setForm({ ...form, content: e.target.value })}
//         />

//         <input placeholder="Donated Amount"
//           onChange={(e) => setForm({ ...form, donatedAmount: e.target.value })}
//         />

//         <input placeholder="Donations"
//           onChange={(e) => setForm({ ...form, donations: e.target.value })}
//         />

//         <input placeholder="Location"
//           onChange={(e) => setForm({ ...form, location: e.target.value })}
//         />

//         <input type="file"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//         />

//         <button
//           type="submit"
//           className="bg-primary text-white p-2 rounded"
//         >
//           {loading ? "Creating..." : "Create"}
//         </button>
//       </form>
//     </div>
//   )
// }