"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { MapPin, Calendar, Navigation, Leaf, Car, Loader2 } from "lucide-react"

export default function TravelHistoryDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTripDetails()
  }, [params.id])

  const fetchTripDetails = async () => {
    try {
      const response = await fetch(`/api/travel-logs?userId=550e8400-e29b-41d4-a716-446655440000`)
      if (response.ok) {
        const trips = await response.json()
        const foundTrip = trips.find((t: any) => t.id === params.id)
        setTrip(foundTrip)
      }
    } catch (error) {
      console.error("[v0] Error fetching trip details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-olive mx-auto mb-4" />
          <p className="text-brown">Loading trip details...</p>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-xl font-bold text-brown mb-2">Trip Not Found</h2>
          <p className="text-brown-light mb-4">This travel record doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="bg-olive hover:bg-olive-dark text-cream px-6 py-3 rounded-full font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const estimatedDistance = (Number.parseFloat(trip.co2_emission) / 0.12).toFixed(1)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-background border-b-2 border-olive/20 px-4 sm:px-6 py-4 sticky top-0 z-30">
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
            <div>
              <h1 className="text-lg font-bold text-brown">Trip Details</h1>
              <p className="text-xs text-brown-light">Complete travel information</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-br from-olive to-olive-dark rounded-3xl p-6 sm:p-8 shadow-xl text-cream">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-cream/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-7 h-7 text-cream" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight break-words">{trip.location}</h2>
              <div className="flex items-center gap-2 text-cream/90">
                <Calendar className="w-4 h-4" />
                <p className="text-sm">
                  {new Date(trip.travel_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-olive/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-olive" />
              </div>
              <p className="text-xs font-semibold text-brown-light">CO₂ Emission</p>
            </div>
            <p className="text-3xl font-bold text-brown">{Number.parseFloat(trip.co2_emission).toFixed(2)}</p>
            <p className="text-sm text-brown-light mt-1">kg CO₂</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-olive/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <Navigation className="w-5 h-5 text-olive" />
              </div>
              <p className="text-xs font-semibold text-brown-light">Est. Distance</p>
            </div>
            <p className="text-3xl font-bold text-brown">{estimatedDistance}</p>
            <p className="text-sm text-brown-light mt-1">kilometers</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-olive/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-olive" />
              </div>
              <p className="text-xs font-semibold text-brown-light">Transport</p>
            </div>
            <p className="text-2xl font-bold text-brown capitalize">{trip.transport_mode || "Mixed"}</p>
            <p className="text-sm text-brown-light mt-1">mode</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10 space-y-6">
          <h3 className="text-xl font-bold text-brown flex items-center gap-2">
            <span className="w-1 h-6 bg-olive rounded-full"></span>
            Trip Information
          </h3>

          <div className="space-y-4">
            {/* Location Details */}
            <div className="bg-cream/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-olive" />
                <h4 className="font-bold text-brown">Destination</h4>
              </div>
              <p className="text-brown ml-8 leading-relaxed">{trip.location}</p>
            </div>

            {/* Date & Time */}
            <div className="bg-cream/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-olive" />
                <h4 className="font-bold text-brown">Travel Date</h4>
              </div>
              <p className="text-brown ml-8">
                {new Date(trip.travel_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Transport Mode */}
            <div className="bg-cream/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Car className="w-5 h-5 text-olive" />
                <h4 className="font-bold text-brown">Mode of Transportation</h4>
              </div>
              <p className="text-brown ml-8 capitalize">{trip.transport_mode || "Various transport modes"}</p>
            </div>

            {/* Distance */}
            <div className="bg-cream/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Navigation className="w-5 h-5 text-olive" />
                <h4 className="font-bold text-brown">Estimated Distance</h4>
              </div>
              <p className="text-brown ml-8">Approximately {estimatedDistance} km traveled</p>
              <p className="text-sm text-brown-light ml-8 mt-2">
                Based on average emission factors for the transport mode
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-sage to-sage-light rounded-3xl p-6 border-2 border-olive/20 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-olive rounded-full flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6 text-cream" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-brown text-lg mb-3">Environmental Impact</h3>
              <div className="space-y-3 text-sm text-brown-light leading-relaxed">
                <p>
                  This trip generated <span className="font-bold text-brown">{trip.co2_emission} kg of CO₂</span>{" "}
                  emissions.
                </p>
                <p>
                  That's equivalent to:{" "}
                  <span className="font-bold text-brown">
                    {(Number.parseFloat(trip.co2_emission) * 2.5).toFixed(1)} km
                  </span>{" "}
                  driven in an average gasoline car.
                </p>
                <p className="text-xs pt-2 border-t border-olive/20">
                  💡 Consider using public transport, cycling, or walking for shorter trips to reduce your carbon
                  footprint!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
