import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
  const body = await req.json()

  const response = await axios.post(
    "https://fundraise-api.onrender.com/api/v1/auth/kingschat",
    body,
    {
      headers: { "Content-Type": "application/json" },
    }
  )

  return NextResponse.json(response.data)
}
