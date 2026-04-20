/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { getUsersService, deleteUserService, sendManualEmailService } from '@/app/auth/auth.service'
import { useRouter } from 'next/navigation'
import templates from '@/json/admin-notification-templates.json'
import { sendNotificationToUser } from '@/utils/notificationService'
import clsx from 'clsx'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const router = useRouter()
  
  // Modals & Drawers
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  
  // Filters
  const [search, setSearch] = useState('')
  const [adminFilter, setAdminFilter] = useState('all')
  const [verifiedFilter, setVerifiedFilter] = useState('all')

  // Email State
  const [sendToAll, setSendToAll] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const itemsPerPage = 10

  const getInitials = (name: string) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    return parts.length === 1 ? parts[0][0].toUpperCase() : parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
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

  useEffect(() => { fetchUsers() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await deleteUserService(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      alert('Delete failed')
    }
  }

  // Restored Email Logic
  const handleSendEmail = async () => {
    try {
      setSending(true)
      let recipients: string | string[]
      if (sendToAll) {
        recipients = users.map((u: any) => u.email)
      } else {
        recipients = selectedUser.email
      }

      await sendManualEmailService({
        to: recipients,
        subject,
        message,
      })

      alert('Email sent successfully ✅')
      setShowEmailModal(false)
      setSubject('')
      setMessage('')
    } catch (err: any) {
      alert(err.message || 'Failed to send email')
    } finally {
      setSending(false)
    }
  }

  const openEmailModal = (user?: any, all = false) => {
    setSelectedUser(user || null)
    setSendToAll(all)
    setShowEmailModal(true)
  }

  const filteredUsers = users
    .filter((u) => {
      const q = search.toLowerCase()
      return u.fullname?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.username?.toLowerCase().includes(q)
    })
    .filter((u) => adminFilter === 'all' ? true : adminFilter === 'admin' ? u.admin === true : u.admin === false)
    .filter((u) => verifiedFilter === 'all' ? true : verifiedFilter === 'verified' ? u.emailVerified === true : u.emailVerified === false)

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Users</h1>
          <p className="text-gray-500 text-sm">Manage account status and communications.</p>
        </div>
        <button 
          onClick={() => openEmailModal(null, true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-100"
        >
          <Icon icon="solar:letter-bold" width={20} />
          Email All Users
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="relative col-span-1 sm:col-span-2">
          <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm"
          />
        </div>
        <select value={adminFilter} onChange={(e) => setAdminFilter(e.target.value)} className="bg-white border border-gray-100 px-4 py-3 rounded-2xl text-sm shadow-sm">
          <option value="all">Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select value={verifiedFilter} onChange={(e) => setVerifiedFilter(e.target.value)} className="bg-white border border-gray-100 px-4 py-3 rounded-2xl text-sm shadow-sm">
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="not">Not Verified</option>
        </select>
      </div>

      {/* Table & Mobile Cards */}
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-xl overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-bold text-xs uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Telephone</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Verified</th>
                <th className="px-6 py-5">Created</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="p-10 text-center text-gray-400">Loading...</td></tr>
              ) : paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors cursor-pointer" onClick={() => setSelectedUser(user)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        {user.avatar ? <img src={user.avatar} className="h-full w-full object-cover" /> : 
                          <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{getInitials(user.fullname)}</div>
                        }
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.fullname}</p>
                        <p className="text-xs text-gray-400">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">{user.telephone}</td>
                  <td className="px-6 py-4">
                    <span className={clsx("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase", user.admin ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-600")}>
                      {user.admin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.emailVerified ? <span className="text-green-600 text-sm font-medium">✓ Verified</span> : <span className="text-red-400 text-sm">Not Verified</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleDelete(user.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Icon icon="solar:trash-bin-trash-bold" width={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {paginatedUsers.map((user) => (
            <div key={user.id} className="p-4" onClick={() => setSelectedUser(user)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    {user.avatar ? <img src={user.avatar} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{getInitials(user.fullname)}</div>}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{user.fullname}</p>
                    <p className="text-[10px] text-gray-400">{user.email}</p>
                  </div>
                </div>
                <Icon icon="solar:alt-arrow-right-linear" className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className={clsx("px-4 py-2 rounded-xl text-sm font-bold transition-all", page === i + 1 ? "bg-blue-600 text-white" : "bg-white border border-gray-100")}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* User Detail Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
          <div className="relative ml-auto flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl">
            {/* Drawer Header */}
            <div className="p-8 bg-gray-900 text-white relative">
              <button onClick={() => setSelectedUser(null)} className="absolute top-6 right-6 text-white/60 hover:text-white">
                <Icon icon="solar:close-circle-bold" width={24} />
              </button>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl border-2 border-white/20 overflow-hidden">
                  {selectedUser.avatar ? <img src={selectedUser.avatar} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-blue-500 flex items-center justify-center font-bold text-xl">{getInitials(selectedUser.fullname)}</div>}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedUser.fullname}</h2>
                  <p className="text-blue-400 text-sm">@{selectedUser.username}</p>
                </div>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personal Info</h3>
                <div className="grid grid-cols-1 gap-3 bg-gray-50 p-4 rounded-2xl">
                   <p className="text-sm"><strong>Email:</strong> {selectedUser.email}</p>
                   <p className="text-sm"><strong>Phone:</strong> {selectedUser.telephone || 'N/A'}</p>
                   <p className="text-sm"><strong>Birthday:</strong> {selectedUser.birthday || 'N/A'}</p>
                   <p className="text-sm"><strong>Joined:</strong> {new Date(selectedUser.created_at).toLocaleString()}</p>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Controls</h3>
                
                {/* Admin Toggle */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                  <span className="text-sm font-semibold">Admin Access</span>
                  <button 
                    onClick={() => {
                      const newAdmin = !selectedUser.admin;
                      setUsers(prev => prev.map(u => u.id === selectedUser.id ? {...u, admin: newAdmin} : u));
                      setSelectedUser((prev: any) => ({ ...prev, admin: newAdmin }));
                    }}
                    className={clsx("h-6 w-11 rounded-full relative transition-colors", selectedUser.admin ? "bg-blue-600" : "bg-gray-300")}
                  >
                    <div className={clsx("absolute top-1 left-1 bg-white h-4 w-4 rounded-full transition-transform", selectedUser.admin && "translate-x-5")} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setShowNotificationModal(true)} className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl text-xs font-bold hover:bg-gray-100">
                    <Icon icon="solar:bell-bold" className="text-blue-600" /> Notify
                  </button>
                  <button onClick={() => openEmailModal(selectedUser, false)} className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl text-xs font-bold hover:bg-gray-100">
                    <Icon icon="solar:letter-bold" className="text-blue-600" /> Email
                  </button>
                </div>

                <button 
                  onClick={() => router.push(`/admin/all-staff/${selectedUser.id}/transactions`)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-50"
                >
                  View Transactions
                </button>

                <button 
                  onClick={() => {
                    const newStatus = selectedUser.status === 'suspended' ? 'active' : 'suspended';
                    setUsers(prev => prev.map(u => u.id === selectedUser.id ? {...u, status: newStatus} : u));
                    setSelectedUser((prev: any) => ({ ...prev, status: newStatus }));
                  }}
                  className={clsx("w-full py-4 rounded-2xl text-xs font-bold transition-all", selectedUser.status === 'suspended' ? "bg-green-100 text-green-700" : "bg-red-50 text-red-600")}
                >
                  {selectedUser.status === 'suspended' ? 'Activate Account' : 'Suspend Account'}
                </button>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Restored Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold">Send Notification</h2>
               <button onClick={() => setShowNotificationModal(false)}><Icon icon="solar:close-circle-bold" className="text-gray-400" width={24} /></button>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    sendNotificationToUser(selectedUser.id, template)
                    setShowNotificationModal(false)
                    alert('Notification queued 🚀')
                  }}
                  className="w-full rounded-xl border border-gray-100 p-4 text-left hover:bg-blue-50 transition-colors group"
                >
                  <p className="font-bold text-blue-600 text-sm group-hover:text-blue-700">{template.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Restored Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
            <h2 className="mb-2 text-xl font-bold">
              {sendToAll ? 'Broadcast Email' : `Email: ${selectedUser?.email}`}
            </h2>
            <p className="text-gray-500 text-sm mb-6">{sendToAll ? 'This email will be sent to every user in the database.' : 'Send a manual message to this user.'}</p>

            <input
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mb-4 w-full rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-blue-500 transition-all"
            />

            <textarea
              placeholder="Message Content (HTML Supported)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-6 h-48 w-full rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-blue-500 transition-all resize-none"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowEmailModal(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
              <button 
                disabled={sending || !subject || !message} 
                onClick={handleSendEmail} 
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-blue-100"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}