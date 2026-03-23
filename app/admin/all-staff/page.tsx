/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { getUsersService, deleteUserService } from '@/app/auth/auth.service'
import { useRouter } from 'next/navigation'
// import router from 'next/router'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [adminFilter, setAdminFilter] = useState('all')
  const [verifiedFilter, setVerifiedFilter] = useState('all')

  const [selectedUser, setSelectedUser] = useState<any>(null)

  const itemsPerPage = 10

  const getInitials = (name: string) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
  }

  const fetchUsers = async () => {
    try {
      const res = await getUsersService()
      setUsers(res.data || res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Delete this user?')
    if (!confirmDelete) return

    try {
      await deleteUserService(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      alert('Delete failed')
    }
  }

  // ✅ FILTERING (does NOT affect design)
  const filteredUsers = users
    .filter((user) => {
      const q = search.toLowerCase()
      return (
        user.fullname?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        user.username?.toLowerCase().includes(q)
      )
    })
    .filter((user) => {
      if (adminFilter === 'all') return true
      return adminFilter === 'admin' ? user.admin === true : user.admin === false
    })
    .filter((user) => {
      if (verifiedFilter === 'all') return true
      return verifiedFilter === 'verified'
        ? user.emailVerified === true
        : user.emailVerified === false
    })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Users</h1>

      {/* 🔎 Search + Filters (minimal, clean, no design disruption) */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-lg border px-3 py-2 text-sm"
        />

        <select
          value={adminFilter}
          onChange={(e) => setAdminFilter(e.target.value)}
          className="rounded-lg border px-5 py-2 text-sm"
        >
          <option value="all">Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={verifiedFilter}
          onChange={(e) => setVerifiedFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="not">Not Verified</option>
        </select>
      </div>

      {/* ✅ YOUR EXACT TABLE (UNCHANGED DESIGN) */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Telephone</th>
              <th className="p-4">Role</th>
              <th className="p-4">Verified</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="cursor-pointer border-t transition hover:bg-gray-50"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img src={user.avatar} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 font-semibold text-white shadow-sm">
                          {getInitials(user.fullname)}
                        </div>
                      )}

                      <div>
                        <div className="font-medium">{user.fullname}</div>
                        <div className="text-xs text-gray-500">@{user.username}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">{user.telephone}</td>

                  <td className="p-4">
                    {user.admin ? (
                      <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600">
                        Admin
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        User
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    {user.emailVerified ? (
                      <span className="text-sm text-green-600">✓ Verified</span>
                    ) : (
                      <span className="text-sm text-red-500">Not Verified</span>
                    )}
                  </td>

                  <td className="p-4 text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleDelete(user.id)}
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

      {/* Pagination (unchanged) */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`rounded px-3 py-1 ${
              page === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ✅ User Detail Drawer */}
      {/* 🔥 Premium Animated Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          />

          {/* Drawer */}
          <div className="animate-slideIn relative ml-auto flex h-full w-[420px] flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary to-purple-600 p-6 text-white">
              <button onClick={() => setSelectedUser(null)} className="absolute right-4 top-4">
                <Icon icon="solar:close-circle-bold" width={24} />
              </button>

              <div className="flex items-center gap-4">
                {selectedUser.avatar ? (
                  <img
                    src={selectedUser.avatar}
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-primary shadow">
                    {getInitials(selectedUser.fullname)}
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold">{selectedUser.fullname}</h2>
                  <p className="text-sm opacity-90">@{selectedUser.username}</p>

                  <div className="mt-2 flex gap-2">
                    {selectedUser.admin && (
                      <span className="rounded-full bg-white/20 px-2 py-1 text-xs">Admin</span>
                    )}
                    {selectedUser.emailVerified && (
                      <span className="rounded-full bg-green-500 px-2 py-1 text-xs">Verified</span>
                    )}
                    {selectedUser.status === 'suspended' && (
                      <span className="rounded-full bg-red-500 px-2 py-1 text-xs">Suspended</span>
                    )}
                  </div>

                  
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6 text-sm">
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">Personal Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Telephone:</strong> {selectedUser.telephone}
                  </p>
                  <p>
                    <strong>Birthday:</strong> {selectedUser.birthday}
                  </p>
                  <p>
                    <strong>Created:</strong> {new Date(selectedUser.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Toggle Admin */}
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-medium text-gray-700">Admin Access</span>

                <button
                  onClick={() => {
                    setUsers((prev) =>
                      prev.map((u) => (u.id === selectedUser.id ? { ...u, admin: !u.admin } : u)),
                    )

                    setSelectedUser((prev: any) => ({
                      ...prev,
                      admin: !prev.admin,
                    }))
                  }}
                  className={`relative h-6 w-12 rounded-full transition ${
                    selectedUser.admin ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${
                      selectedUser.admin ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
              <button
                    onClick={() => router.push(`/admin/all-staff/${selectedUser.id}/transactions`)}
                    className="btn-primary mt-3 text-xs"
                  >
                    View Transaction History
                  </button>

              {/* Suspend / Activate */}
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-medium text-gray-700">Account Status</span>

                <button
                  onClick={() => {
                    const newStatus = selectedUser.status === 'suspended' ? 'active' : 'suspended'

                    setUsers((prev) =>
                      prev.map((u) => (u.id === selectedUser.id ? { ...u, status: newStatus } : u)),
                    )

                    setSelectedUser((prev: any) => ({
                      ...prev,
                      status: newStatus,
                    }))
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs ${
                    selectedUser.status === 'suspended'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {selectedUser.status === 'suspended' ? 'Activate' : 'Suspend'}
                </button>
                
              </div>
            </div>
            
          </div>

          {/* Animation */}
          <style jsx>{`
            .animate-slideIn {
              animation: slideIn 0.3s ease-out forwards;
            }
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
