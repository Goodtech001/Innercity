import { columns } from '@/components/all-transaction/transaction-table'
import { DataTable } from '@/components/all-transaction/data-table'
import SearchInput from '@/components/search-input'
import AdminSearchInput from '@/components/admin-search-input copy'

async function getStaff() {
  //   const res = await fetch("http://localhost:7070/api/admin/staff", {
  //     cache: "no-store",
  //   })
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch staff")
  //   }
  //   return res.json()
}

export default async function StaffPage() {
  const data = await getStaff()

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Transaction Management</h1>
        <AdminSearchInput />
      </div>
      <DataTable columns={columns} data={[]} />
    </div>
  )
}
