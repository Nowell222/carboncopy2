"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header Illustration */}
      <div className="flex justify-center mt-8 mb-6">
        <div className="relative">
          <div className="w-32 h-32 bg-sage-light rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-olive" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>
          {/* Decorative trees */}
          <div className="absolute -bottom-2 -left-8 text-4xl">🌲</div>
          <div className="absolute -bottom-2 -right-8 text-4xl">🌲</div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-brown mb-2">
          Join now—travel smart,
          <br />
          stay green
        </h1>
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm text-brown mb-2">Email or username</label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here"
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 pl-12 text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-olive transition-colors"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm text-brown mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password here"
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 pl-12 pr-12 text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-olive transition-colors"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brown-light hover:text-brown transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-olive/30 text-olive focus:ring-olive"
            />
            <label htmlFor="remember" className="text-sm text-brown">
              Remember me
            </label>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-brown-light hover:text-brown underline">
              Forgot password? Click here
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-olive hover:bg-olive-dark text-cream font-bold text-xl py-4 rounded-full shadow-lg transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>

        {/* Sign Up Link */}
        <div className="text-center mb-6">
          <p className="text-sm text-brown-light">
            Don't have an account?{" "}
            <Link href="/signup" className="text-brown font-semibold underline">
              Register here
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-brown-light/30"></div>
          <span className="text-sm text-brown-light">Or continue with</span>
          <div className="flex-1 h-px bg-brown-light/30"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="flex justify-center gap-6">
          <button
            type="button"
            className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="w-14 h-14 bg-[#1877F2] rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
