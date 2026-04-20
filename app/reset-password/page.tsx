/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useRef, useEffect, Suspense } from 'react'
import Logo from '@/components/logo'
import Link from 'next/link'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import people from '@/json/people.json'

// 1️⃣ Create a separate component for the form logic
function ResetForm() {
  const params = useSearchParams()
  const router = useRouter()

  const email = params.get('email') || ''

  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(30)

  // 🔁 Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCodeChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalCode = code.join('')

    if (!email || finalCode.length < 6 || !password) {
      alert('Complete all fields')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: finalCode,
          newPassword: password,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message)

      alert('Password reset successful')
      router.push('/sign-in')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resendCode = async () => {
    if (timer > 0) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setTimer(30)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Reset Password</h1>
      <p className="mb-6 text-gray-500">
        Enter the 6-digit code sent to <span className="font-medium">{email || 'your email'}</span>
      </p>

      <form onSubmit={handleReset} className="space-y-6">
        <div className="flex gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputsRef.current[index] = el }}
              value={digit}
              onChange={(e) => handleCodeChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="h-12 w-12 rounded-lg border text-center text-lg focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        Didn’t receive code?{' '}
        <button onClick={resendCode} className="font-medium text-blue-600 disabled:text-gray-400" disabled={timer > 0}>
          {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
        </button>
      </div>
    </>
  )
}

// 2️⃣ The main Page component wraps everything in Suspense
export default function ResetPasswordPremium() {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* LEFT */}
      <div className="flex flex-col justify-center px-6 md:px-16">
        <Link href="/" className="mb-6">
          <Logo variant="alt" className="w-24" />
        </Link>

        <Suspense fallback={<div className="animate-pulse text-gray-400">Loading reset details...</div>}>
          <ResetForm />
        </Suspense>
      </div>

      {/* RIGHT */}
      <div className="bg-sign-in hidden h-screen items-center bg-cover bg-center text-white md:block">
        <div className="flex h-screen flex-col justify-center md:mx-20 lg:mx-40">
          <h1 className="max-w-md text-5xl font-bold">Together, we can make a difference.</h1>
          <p className="mt-5 text-sm">
            Every small act of kindness begins here. Join our community to give, share, or ignite
            your own fundraiser today.
          </p>
          <div className="mt-6 flex w-full">
            <AnimatedTooltip items={people} />
          </div>
        </div>
      </div>
    </div>
  )
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'

// import { useSearchParams, useRouter } from 'next/navigation'
// import { useState } from 'react'
// import Input from '@/components/input'
// import Logo from '@/components/logo'
// import Link from 'next/link'
// import { baseUrl } from '@/constants'

// export default function ResetPasswordPage() {
//   const params = useSearchParams()
//   const router = useRouter()

//   const email = params.get('email') || ''

//   const [code, setCode] = useState({ value: '' })
//   const [password, setPassword] = useState({ value: '' })
//   const [loading, setLoading] = useState(false)

//   const handleReset = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!email || !code.value || !password.value) {
//       alert('All fields are required')
//       return
//     }

//     try {
//       setLoading(true)

//       const res = await fetch(`${baseUrl}/auth/reset-password`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           code: code.value,
//           newPassword: password.value,
//         }),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data?.message || 'Reset failed')
//       }

//       alert('Password reset successful')

//       router.push('/sign-in')
//     } catch (err: any) {
//       alert(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="h-screen grid-cols-10 md:grid">
//       <div className="flex flex-col justify-center px-6 md:col-span-4 md:px-10">
//         <Link href="/" className="mb-6">
//           <Logo variant="alt" className="w-24" />
//         </Link>

//         <form onSubmit={handleReset} className="flex flex-col gap-4">
//           <h1 className="text-2xl font-bold">Reset Password</h1>

//           <p className="text-sm text-gray-500">
//             Code sent to <span className="font-medium">{email}</span>
//           </p>

//           <Input
//             name="code"
//             state={code}
//             setState={setCode}
//             placeholder="Enter verification code"
//             required
//             type={'number'}
//           />

//           <Input
//             name="password"
//             type="password"
//             state={password}
//             setState={setPassword}
//             placeholder="New password"
//             required
//           />

//           <button className="btn-primary mt-4" disabled={loading}>
//             {loading ? 'Resetting...' : 'Reset Password'}
//           </button>
//         </form>
//       </div>

//       <div className="bg-sign-in hidden bg-cover bg-center md:col-span-6 md:block" />
//     </div>
//   )
// }
