'use client'

import { Suspense } from "react";
import OAuthSuccess from "./oAuthSuccess";
// import GoogleSuccessContent from "../googleSuccessPage";
// import GoogleSuccessContent from "./GoogleSuccessContent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<p>Logging you in...</p>}>
      <OAuthSuccess />
    </Suspense>
  );
}


// 'use client'

// import { useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import axios from "axios"

// export default function GoogleSuccess() {
//   const router = useRouter()
//   const searchparams = useSearchParams()

//   useEffect(() => {
//     const token = searchparams.get("token")

//     if (!token) {
//       router.push("/sign-in")
//       return
//     }

//     // OPTIONAL: fetch user profile
//     axios.get("https://fundraise-api.onrender.com/api/v1/auth/profile", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(res => {
//       sessionStorage.setItem(
//         "course-training-profile",
//         JSON.stringify({
//           token,
//           user: res.data
//         })
//       )

//       router.push("/")
//     }).catch(() => {
//       router.push("/sign-in")
//     })

//   }, [router, searchparams])

//   return <p>Signing you in...</p>
// }