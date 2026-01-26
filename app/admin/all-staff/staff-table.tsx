"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Staff = {
  id: string
  name: string | null
  email: string
  staffId: string
  role: "ADMIN" | "STAFF"
  kingsChatId: string
}

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name ?? "—",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Email <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "staffId",
    header: "Staff ID",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.role}</span>
    ),
  },
]
