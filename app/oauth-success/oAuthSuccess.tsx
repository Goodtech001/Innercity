"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function OAuthSuccess() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = params.get("token")

    if (token) {
      localStorage.setItem("token", token)
      router.push("/")
    }
  }, [router, params])

  return <p>Signing you in...</p>
}