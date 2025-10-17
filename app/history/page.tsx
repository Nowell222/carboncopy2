"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { MapPin, Calendar, Plus, Leaf, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"

export default function HistoryPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [scheduledTrips, setScheduledTrips] = useState<any[]>([])
  const [pastTrips, setPastTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchData()
    }
  }, [user, authLoading])

  const fetchData = async () => {
    try {
      // Fetch scheduled travels
      const scheduledResponse = await fetch("/api/scheduled-travels")
      if (scheduledResponse.ok) {
        const scheduledData = await scheduledResponse.json()
        setScheduledTrips(scheduledData)
      }

      // Fetch past travel logs
      const logsResponse = await fetch(`/api/travel-logs?userId=${user?.id}`)
      if (logsResponse.ok) {
        const logsData = await logsResponse.json()
        setPastTrips(logsData)
      }
    } catch (error) {
      console.error("[v0] Error fetching history:", error)
    } finally {
      setLoading(false)
    }
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
      <header className="bg-background border-b-2 border-olive/20 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors shadow-md"
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
              className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors shadow-md"
            >
              <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </Link>
            <button className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors shadow-md">
              <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Scheduled Travel Section */}
        <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 border-2 border-olive/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-brown">SCHEDULED TRAVEL</h2>
            <Link
              href="/history/add-schedule"
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 text-cream" />
            </Link>
          </div>

          {scheduledTrips.length > 0 ? (
            <div className="space-y-3">
              {scheduledTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-cream/30 rounded-2xl p-4 border border-olive/10 hover:border-olive/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-olive mt-0.5 flex-shrink-0" />
                        <p className="font-semibold text-brown leading-tight break-words">{trip.location}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-7">
                        <Calendar className="w-4 h-4 text-brown-light flex-shrink-0" />
                        <p className="text-sm text-brown-light">
                          {new Date(trip.scheduled_date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-7">
                        <Leaf className="w-4 h-4 text-sage flex-shrink-0" />
                        <span className="text-xs font-semibold text-sage bg-sage/20 px-2 py-1 rounded-full">
                          {Number.parseFloat(trip.expected_co2_emission).toFixed(2)} kg CO₂
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/history/scheduled/${trip.id}`}
                      className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-1 text-sm text-olive hover:text-olive-dark font-semibold bg-olive/10 hover:bg-olive/20 px-4 py-2 rounded-xl transition-colors sm:mt-1"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-light py-6">No scheduled trips.</p>
          )}
        </div>

        {/* Travel History Section */}
        <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 border-2 border-olive/10">
          <h2 className="text-lg sm:text-xl font-bold text-brown mb-5">TRAVEL HISTORY</h2>

          {pastTrips.length > 0 ? (
            <div className="space-y-3">
              {pastTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-cream/30 rounded-2xl p-4 border border-olive/10 hover:border-olive/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-olive mt-0.5 flex-shrink-0" />
                        <p className="font-semibold text-brown leading-tight break-words">{trip.location}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-7">
                        <Calendar className="w-4 h-4 text-brown-light flex-shrink-0" />
                        <p className="text-sm text-brown-light">
                          {new Date(trip.travel_date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-7">
                        <Leaf className="w-4 h-4 text-sage flex-shrink-0" />
                        <span className="text-xs font-semibold text-sage bg-sage/20 px-2 py-1 rounded-full">
                          {Number.parseFloat(trip.co2_emission).toFixed(2)} kg CO₂
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/history/details/${trip.id}`}
                      className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-1 text-sm text-olive hover:text-olive-dark font-semibold bg-olive/10 hover:bg-olive/20 px-4 py-2 rounded-xl transition-colors sm:mt-1"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-light py-6">No travel history.</p>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
