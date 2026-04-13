/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

type Props = {
  payments: any[]
}

export default function RecentDonations({ payments }: Props) {

  const donations = payments
    .filter((p) => p.status === 'success')
    .slice(0, 5)

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="font-semibold mb-4 text-lg">Recent Donations</h2>

      <div className="space-y-4">
        {donations.map((p: any) => (
          <div
            key={p.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">
                {p.user?.fullname || 'Anonymous'}
              </p>

              <p className="text-sm text-gray-500">
                {p.campaign?.title || 'Campaign'}
              </p>
            </div>

            <span className="font-semibold text-green-600">
              {new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
              }).format(Number(p.amount))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}