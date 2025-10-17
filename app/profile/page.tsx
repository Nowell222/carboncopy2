"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/hooks/use-auth"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchProfile()
    }
  }, [user, authLoading])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        setStats(data.stats)
      }
    } catch (error) {
      console.error("[v0] Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-brown">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-background border-b-2 border-olive/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors"
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-brown">Carbon Copy</h1>
          </div>
          <button className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors">
            <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <h2 className="text-2xl font-bold text-brown mb-8">PROFILE</h2>

        {/* Profile Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-brown mb-1">
                {profile?.first_name && profile?.last_name
                  ? `${profile.first_name} ${profile.last_name}`
                  : profile?.username || user?.username || "User"}
              </h3>
              <p className="text-sm text-brown-light">{profile?.email || user?.email}</p>
            </div>
            <Link
              href="/profile/edit"
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors"
            >
              <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sage/30 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-brown mb-1">
                {stats?.total_emissions ? Number.parseFloat(stats.total_emissions).toFixed(2) : "0.00"}
              </p>
              <p className="text-xs text-brown-light">kg CO₂ this year</p>
            </div>
            <div className="bg-sage/30 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-brown mb-1">{stats?.total_trips || 0}</p>
              <p className="text-xs text-brown-light">trips logged</p>
            </div>
          </div>
        </div>

        <Link
          href="/profile/stats"
          className="block bg-gradient-to-r from-sage to-sage-light rounded-3xl shadow-lg p-6 border-2 border-olive/20 mb-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-olive rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-cream" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brown mb-1">View Statistics</h3>
                <p className="text-sm text-brown-light">See your detailed carbon footprint breakdown</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-brown-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Settings Menu */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-olive/10 overflow-hidden mb-6">
          <Link
            href="/profile/account"
            className="flex items-center justify-between p-4 hover:bg-sage/10 transition-colors border-b border-olive/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-brown" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <span className="font-semibold text-brown">Account Settings</span>
            </div>
            <svg className="w-5 h-5 text-brown-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/profile/smartwatch"
            className="flex items-center justify-between p-4 hover:bg-sage/10 transition-colors border-b border-olive/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-brown" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.55 3.95 4.24.25-3.29 2.69 1.08 4.11z" />
                </svg>
              </div>
              <span className="font-semibold text-brown">Smartwatch Sync</span>
            </div>
            <svg className="w-5 h-5 text-brown-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/notifications"
            className="flex items-center justify-between p-4 hover:bg-sage/10 transition-colors border-b border-olive/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-brown" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2s-.89 2-2 2v-4c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
              </div>
              <span className="font-semibold text-brown">Notifications</span>
            </div>
            <svg className="w-5 h-5 text-brown-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/profile/privacy"
            className="flex items-center justify-between p-4 hover:bg-sage/10 transition-colors border-b border-olive/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-brown" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <span className="font-semibold text-brown">Privacy & Security</span>
            </div>
            <svg className="w-5 h-5 text-brown-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/profile/about"
            className="flex items-center justify-between p-4 hover:bg-sage/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-brown" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <span className="font-semibold text-brown">About & Help</span>
            </div>
            <svg className="w-5 h-5 text-brown-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg py-4 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          LOGOUT
        </button>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
