import { columns } from "@/components/all-staff/staff-table"
import { DataTable } from "./data-table"

async function getStaff() {
  const res = await fetch("http://localhost:3000/api/admin/staff", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch staff")
  }

  return res.json()
}

export default async function StaffPage() {
  const data = await getStaff()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
