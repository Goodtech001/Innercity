import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const stored = sessionStorage.getItem("course-training-profile")
    if (!stored) router.push("/sign-in")
  }, [])
}
