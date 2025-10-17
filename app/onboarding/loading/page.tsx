"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding/success")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      {/* Loading Message */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-brown">Saving your details... Please wait.</h1>
      </div>

      {/* Animated Footprints */}
      <div className="relative w-full max-w-xs h-64">
        <div className="absolute left-1/4 top-12 text-4xl animate-pulse" style={{ animationDelay: "0s" }}>
          👣
        </div>
        <div className="absolute left-1/2 top-24 text-4xl animate-pulse" style={{ animationDelay: "0.3s" }}>
          👣
        </div>
        <div className="absolute left-3/4 top-36 text-4xl animate-pulse" style={{ animationDelay: "0.6s" }}>
          👣
        </div>
      </div>
    </div>
  )
}
