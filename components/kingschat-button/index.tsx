// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import kingsChatWebSdk from "kingschat-web-sdk";
// import { useRouter } from "next/navigation";
// import "kingschat-web-sdk/dist/stylesheets/style.min.css";
// import Image from "next/image";


// export default function KingsChatButton() {
//   const router = useRouter();

//   async function loginWithKingsChat() {
//     try {
//       const res = await kingsChatWebSdk.login({
//         clientId: process.env.NEXT_PUBLIC_KINGSCHAT_CLIENT_ID!,
//         scopes: ["profile"],
//       });

//       const response = await fetch("/auth/auth.service", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           accessToken: res.accessToken,
//           refreshToken: res.refreshToken,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Auth failed");
//       }

//       router.replace("/");
//     } catch (err: any) {
//       console.error("KingsChat login error:", err);
//       alert(err.message || "KingsChat login failed");
//     }
//   }

//   return (
//     <button
//       className="btn-white flex space-x-2"
//       onClick={loginWithKingsChat}
//     >
//        <Image alt="kingschat" className="size-6" width={20} height={20} src={kingsChatIcon} />
//        <p>Sign Up With Kingschat</p>
//     </button>
//   );
// }


"use client"

import { useRouter } from "next/navigation"
import { loginWithKingsChat } from "@/app/auth/auth.service"
import Image from "next/image"
import kingsChatIcon from '@/public/assets/icons/kingschat-logo.png'

export default function KingsChatButton() {
  const router = useRouter()

  const handleKingsChatLogin = async () => {
  try {
    await loginWithKingsChat()
    router.push("/")
  } catch (err) {
    console.error("KC error:", err)
    alert("KingsChat login failed")
  }
}



  return (
    <button
      onClick={handleKingsChatLogin}
      className="flex btn-white space-x-2" 
    >
      <Image alt="kingschat" className="size-6" width={20} height={20} src={kingsChatIcon} />
      <p>Continue with KingsChat</p>
    </button>
  )
}

