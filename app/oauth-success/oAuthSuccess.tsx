"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function OAuthSuccess() {
  const searchParams = useSearchParams()
  const router = useRouter()

useEffect(() => {
  const token = searchParams.get("token")

  if (token) {
    sessionStorage.setItem("token", token)

    router.replace("/")
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } else {
    router.replace("/sign-in")
  }
}, [router, searchParams])

  return <p>Signing you in...</p>
}