// app/api/location/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Get client IP from headers
    let ip = req.headers.get('x-forwarded-for')?.split(',')[0] || ''

    // Fallback for localhost
    if (ip === '' || ip === '::1') {
      ip = '105.112.0.0' // Nigeria IP for testing
    }

    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await response.json()

    return NextResponse.json({ data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to detect location', data: null })
  }
}