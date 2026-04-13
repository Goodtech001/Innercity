/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { deleteTestimonialService, getTestimonialsService } from "@/app/auth/auth.service"

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const itemsPerPage = 10

  const fetchTestimonials = async () => {
  try {
    const data = await getTestimonialsService()
    console.log("API RESPONSE:", data)
    setTestimonials(data.data || data)
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Delete this testimonial?")
    if (!confirmDelete) return

    try {
      await deleteTestimonialService(id)
      setTestimonials((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      alert("Delete failed")
    }
  }

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const paginatedData = testimonials.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <div className="relative p-8">
      <h1 className="text-2xl font-bold mb-6">Testimonials</h1>

      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Message</th>
              <th className="p-4">Location</th>
              <th className="p-4">Amount</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  No testimonials found
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={item.avatar?.url}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">
                    {item.clientName}
                  </td>

                  <td className="p-4 max-w-xs truncate">
                    {item.content}
                  </td>

                  <td className="p-4">
                    {item.location}
                  </td>

                  <td className="p-4">
                    {item.donatedAmount}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Icon icon="solar:trash-bin-trash-bold" width={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Floating Create Button */}
      <Link
        href="/admin/testimonials/create"
        className="fixed bottom-8 right-8 bg-primary text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        + Create Testimonial
      </Link>
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