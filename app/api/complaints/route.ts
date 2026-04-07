/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { NextResponse } from 'next/server'

let complaints: any[] = []

export async function POST(req: Request) {
  const body = await req.json()

  const complaint = {
    id: Date.now(),
    message: body.message,
    status: 'pending',
    createdAt: new Date(),
  }

  complaints.push(complaint)

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json({ data: complaints })
}