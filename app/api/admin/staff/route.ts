import { NextResponse } from "next/server"
import {prisma}from "@/lib/prisma"

export async function GET() {
  try {
    const staff = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        staffId: true,
        role: true,
        kingsChatId: true,
      },
      // ✅ remove this if you don't have createdAt
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(staff)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch staff" },
      { status: 500 }
    )
  }
}
