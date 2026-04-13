"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type User= {
  id: string
  user: string | null
  campaign: string
  pledged: string
  role: "ADMIN" | "STAFF"
  ref: string
  transid:string
  payment: string
  time:string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => row.original.user ?? "—",
  },
  {
    accessorKey: "campaign",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Campaign <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "pledge",
    header: "Pledged Amount",
  },
  {
    accessorKey: "ref",
    header: "Ref No",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.ref}</span>
    ),
  },
  {
    accessorKey: "transid",
    header: "Trans Id",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.transid}</span>
    ),
  },
  {
    accessorKey: "payment",
    header: "Payment channel",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.payment}</span>
    ),
  },
  {
    accessorKey: "time",
    header: "Created",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.time}</span>
    ),
  },
]
