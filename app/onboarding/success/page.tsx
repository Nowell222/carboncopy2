"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-background flex flex-col p-8">
      {/* Decorative Frame */}
      <div className="absolute top-0 left-0 w-full h-32">
        <div className="absolute top-4 left-4 w-24 h-24 border-8 border-sage rounded-tl-3xl"></div>
        <div className="absolute top-4 right-4 w-24 h-24 border-8 border-sage rounded-tr-3xl"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Bicycle Illustration */}
        <div className="mb-8 text-8xl animate-bounce">🚴</div>

        {/* Success Message */}
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-sm text-center">
          <h1 className="text-2xl font-bold text-brown mb-4">
            You're all set! Start your journey towards sustainable travel with Carbon Copy. Every step counts!
          </h1>
        </div>
      </div>

      {/* Decorative Trees */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-8 pb-8">
        <div className="text-6xl">🌳</div>
        <div className="text-6xl">🌳</div>
      </div>
    </div>
  )
}
