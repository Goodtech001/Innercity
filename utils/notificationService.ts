/* eslint-disable @typescript-eslint/no-explicit-any */
export const sendNotificationToUser = (userId: number, template: any) => {

  const stored = localStorage.getItem("user-notifications")

  const allNotifications = stored ? JSON.parse(stored) : {}

  if (!allNotifications[userId]) {
    allNotifications[userId] = []
  }

  allNotifications[userId].unshift({
    id: Date.now(),
    title: template.title,
    description: template.description,
    type: template.type,
    isRead: false,
    date: new Date().toLocaleString(),
  })

  localStorage.setItem(
    "user-notifications",
    JSON.stringify(allNotifications)
  )
}

export const getUserNotifications = (userId: number) => {
  const existing = localStorage.getItem("user-notifications")

  if (!existing) return []

  const data = JSON.parse(existing)

  return data[userId] || []
}

export const markNotificationRead = (userId: number, id: number) => {
  const existing = localStorage.getItem("user-notifications")
  if (!existing) return

  const data = JSON.parse(existing)

  const updated = data[userId].map((n: any) =>
    n.id === id ? { ...n, isRead: true } : n
  )

  data[userId] = updated

  localStorage.setItem("user-notifications", JSON.stringify(data))
}