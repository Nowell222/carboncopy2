"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to personal details after 2 seconds
    const timer = setTimeout(() => {
      router.push("/onboarding/personal-details")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      {/* Success Animation */}
      <div className="relative mb-8">
        <div className="w-48 h-48 bg-sage rounded-full flex items-center justify-center animate-pulse">
          <div className="text-8xl">✓</div>
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-brown mb-4">
          Logged in
          <br />
          Successfully!
        </h1>
      </div>

      {/* Decorative Sloth Illustration Placeholder */}
      <div className="mt-8 text-6xl animate-bounce">🦥</div>
    </div>
  )
}
