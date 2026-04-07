/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "./auth"

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = getAuthToken()

  const headers: any = {
    ...(options.headers || {}),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    console.error("Session expired")

    localStorage.removeItem("token")

    window.location.href = "/login"
    return
  }

  return res
}