/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Icon } from '@iconify/react'
import { baseUrl } from '@/constants'
import { getResourcesService } from '@/services/resources.service'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import TopNavbar from '@/layouts/topnavbar'
import Image from 'next/image'

export default function ResourcesListPage() {
  const { data, isLoading } = useSWR('resources', getResourcesService)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resource?')) return

    try {
      setDeletingId(id)
      const stored = sessionStorage.getItem('course-training-profile')
      const token = stored ? JSON.parse(stored)?.token : null

      await axios.delete(`${baseUrl}/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Resource deleted')
      mutate('resources') // Refresh the table
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavbar />

      <div className="container py-10">
        {/* HEADER SECTION */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              Community Resources
            </h1>
            <p className="text-sm text-gray-500">Manage existing assets and community downloads.</p>
          </div>

          <Link
            href="/admin/resources/create"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-blue-600 active:scale-[0.98]"
          >
            <Icon icon="solar:add-circle-bold" width={20} />
            Add New Resource
          </Link>
        </div>

        {/* TABLE SECTION */}
        {/* TABLE / CARD SECTION */}
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
          {/* Desktop Table View (Hidden on Mobile) */}
          <table className="hidden w-full border-collapse text-left md:table">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Preview
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Details
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Type
                </th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!isLoading &&
                data?.map((item) => (
                  <tr key={item.id} className="group transition-colors hover:bg-gray-50/50">
                    <td className="px-8 py-5">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-sm">
                        {item.asset.resourceType === 'video' ? (
                          <div className="flex h-full w-full items-center justify-center bg-gray-900 text-white">
                            <Icon icon="solar:play-bold" width={20} />
                          </div>
                        ) : (
                          <img src={item.asset.url} alt="" className="h-full w-full object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{item.name}</span>
                        <span className="line-clamp-1 max-w-xs text-xs text-gray-400">
                          {item.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600">
                        {item.asset.type || 'E-Card'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white disabled:opacity-30"
                      >
                        <Icon
                          icon={
                            deletingId === item.id
                              ? 'line-md:loading-twotone-loop'
                              : 'solar:trash-bin-trash-bold'
                          }
                          width={18}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Mobile Card View (Visible on Mobile only) */}
          <div className="flex flex-col divide-y divide-gray-50 md:hidden">
            {isLoading ? (
              <div className="py-20 text-center text-gray-400">Loading...</div>
            ) : data?.length === 0 ? (
              <div className="py-20 text-center text-gray-400">No resources found.</div>
            ) : (
              data?.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100">
                      {item.asset.resourceType === 'video' ? (
                        <div className="flex h-full w-full items-center justify-center bg-gray-900 text-white">
                          <Icon icon="solar:play-bold" width={24} />
                        </div>
                      ) : (
                        <img src={item.asset.url} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-blue-600">
                          {item.asset.type || 'E-Card'}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="p-1 text-red-500"
                        >
                          <Icon icon="solar:trash-bin-trash-bold" width={20} />
                        </button>
                      </div>
                      <h3 className="text-sm font-bold leading-tight text-gray-900">{item.name}</h3>
                      <p className="line-clamp-2 text-xs text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
