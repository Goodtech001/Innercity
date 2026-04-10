/* eslint-disable @typescript-eslint/no-explicit-any */
const notificationsDB: any = {} // temp in-memory (or use real DB later)

export async function GET(req: Request, { params }: any) {
  const userId = params.userId
  return Response.json(notificationsDB[userId] || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { userId } = body

  if (!notificationsDB[userId]) {
    notificationsDB[userId] = []
  }

  notificationsDB[userId].unshift(body)

  return Response.json({ success: true })
}