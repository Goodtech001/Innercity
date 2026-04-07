export function getAuthToken() {
  const token = localStorage.getItem("token")

  if (!token) return null

  try {
    return JSON.parse(token)
  } catch {
    return token
  }
}