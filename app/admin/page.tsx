/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { baseUrl } from '@/constants'
import RevenueChart from '@/components/revenue-charts'
import RecentDonations from '@/components/recent-donation'
import ActivityFeed from '@/components/activity-feed'

type StatsType = {
  users: number
  activeCampaigns: number
  inactiveCampaigns: number
  income: number
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<StatsType>({
    users: 0,
    activeCampaigns: 0,
    inactiveCampaigns: 0,
    income: 0,
  })

  const [displayStats, setDisplayStats] = useState(stats)
  const [payments, setPayments] = useState<any[]>([])

  /* ================================
     FETCH REAL DATA
  ================================= */

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stored = sessionStorage.getItem('course-training-profile')
        const parsed = stored ? JSON.parse(stored) : null
        const token = parsed?.token

        /* ---------------- USERS ---------------- */

        const usersRes = await fetch(`${baseUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const usersJson = await usersRes.json()

        const usersArray = usersJson?.data?.data || usersJson?.data || usersJson || []

        const totalUsers = Array.isArray(usersArray) ? usersArray.length : 0

        /* ---------------- CAMPAIGNS ---------------- */

        const campaignsRes = await fetch(`${baseUrl}/campaigns`)
        const campaignsJson = await campaignsRes.json()

        const campaigns = campaignsJson?.data?.data || campaignsJson?.data || campaignsJson || []

        const activeCampaigns = Array.isArray(campaigns)
          ? campaigns.filter((c: any) => c.published).length
          : 0

        const inactiveCampaigns = Array.isArray(campaigns)
          ? campaigns.filter((c: any) => !c.published).length
          : 0

        /* ---------------- PAYMENTS ---------------- */

        const paymentsRes = await fetch(`${baseUrl}/payments/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await paymentsRes.json()

        const paymentsData = Array.isArray(data)
  ? data
  : data?.data || data?.payments || []

        setPayments(paymentsData)

        const totalIncome = Array.isArray(paymentsData)
          ? paymentsData
              .filter((p: any) => p.status === 'success')
              .reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0)
          : 0

        setStats({
          users: totalUsers,
          activeCampaigns,
          inactiveCampaigns,
          income: totalIncome,
        })
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      }
    }

    fetchStats()
  }, [])

  /* ================================
     COUNT-UP ANIMATION
  ================================= */

  useEffect(() => {
    const duration = 1200
    const start = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)

      setDisplayStats({
        users: Math.floor(progress * stats.users),
        activeCampaigns: Math.floor(progress * stats.activeCampaigns),
        inactiveCampaigns: Math.floor(progress * stats.inactiveCampaigns),
        income: Math.floor(progress * stats.income),
      })

      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [stats])

  /* ================================
     STAT CARDS
  ================================= */

  const statCards = [
    {
      label: 'Total Users',
      value: displayStats.users.toLocaleString(),
      icon: 'fa:users',
    },
    {
      label: 'Active Campaigns',
      value: displayStats.activeCampaigns.toLocaleString(),
      icon: 'mdi:bullhorn',
    },
    {
      label: 'Inactive Campaigns',
      value: displayStats.inactiveCampaigns.toLocaleString(),
      icon: 'mdi:voucher',
    },
    {
      label: 'Total Income',
      value: new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(displayStats.income),
      icon: 'healthicons:low-income-level',
    },
  ]

  const quickActions = [
    { label: 'Upload Media', icon: 'fluent-mdl2:media-add', href: '/admin/hero-images' },
    { label: 'Create Voucher', icon: 'mdi:voucher', href: '/admin/voucher' },
    { label: 'Manage Users', icon: 'fa:users-cog', href: '/admin/all-staff' },
    { label: 'Download Income', icon: 'solar:download-bold', href: '/admin/income' },
    { label: 'Backup Database', icon: 'solar:database-bold', href: '/admin/database' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}

      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-500">
            Monitor activity, manage content, and keep your platform healthy.
          </p>
        </div>
      </header>

      {/* Stats */}

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon icon={stat.icon} className="text-2xl" />
            </div>

            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* charts */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart payments={payments} />
        </div>

        <ActivityFeed payments={payments} />
      </section>

      <section>
        <RecentDonations payments={payments} />
      </section>

      {/* Quick Actions */}

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition hover:border-blue-600 hover:bg-blue-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition group-hover:bg-blue-600 group-hover:text-white">
                <Icon icon={action.icon} />
              </div>

              <span className="font-medium text-gray-700 group-hover:text-blue-700">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
