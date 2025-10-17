"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"

export default function NotificationsPage() {
  const router = useRouter()

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
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors"
            >
              <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </Link>
            <button className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors">
              <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <h2 className="text-2xl font-bold text-brown mb-6">NOTIFICATIONS</h2>

        {/* New Notifications */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-brown-light mb-3">New</h3>
          <div className="space-y-3">
            {/* Notification 1 */}
            <div className="bg-cream-dark rounded-2xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 text-3xl">🦥</div>
                <div className="flex-1">
                  <p className="text-sm text-brown mb-2">
                    <span className="font-semibold">S.A.G.E</span> just finished reviewing your carbon footprint.
                  </p>
                  <div className="flex gap-2">
                    <button className="bg-olive hover:bg-olive-dark text-cream text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                      View Now
                    </button>
                    <button className="bg-sage hover:bg-sage-dark text-brown text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                      Maybe later
                    </button>
                  </div>
                </div>
                <button className="flex-shrink-0 text-brown-light hover:text-brown">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-brown-light mt-2">Just now</p>
            </div>

            {/* Notification 2 */}
            <div className="bg-cream-dark rounded-2xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 text-3xl">👤</div>
                <div className="flex-1">
                  <p className="text-sm text-brown">
                    You logged a May 2 travel to Balai Ising for a birthday celebration.
                  </p>
                </div>
                <button className="flex-shrink-0 text-brown-light hover:text-brown">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-brown-light mt-2">3hrs ago</p>
            </div>

            {/* Notification 3 */}
            <div className="bg-cream-dark rounded-2xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 text-3xl">⚠️</div>
                <div className="flex-1">
                  <p className="text-sm text-brown">
                    We regret to inform you that the smartwatch feature is currently under maintenance. We're...
                  </p>
                </div>
                <button className="flex-shrink-0 text-brown-light hover:text-brown">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-brown-light mt-2">1d ago</p>
            </div>
          </div>
        </div>

        {/* Previous Notifications Link */}
        <button className="w-full bg-sage hover:bg-sage-dark text-brown font-semibold py-3 rounded-full transition-colors">
          See previous notifications
        </button>

        {/* Recent Activity Preview */}
        <div className="mt-8 bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-brown-light mb-2">April 12</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-brown">5 km</p>
            <span className="text-sm bg-sage px-3 py-1 rounded-full text-brown">-1.2kg CO₂</span>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
