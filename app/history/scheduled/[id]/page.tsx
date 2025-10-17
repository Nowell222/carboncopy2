"use client"

import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { MapPin, Calendar, Bike, Car, Navigation, Leaf } from "lucide-react"

export default function ScheduledTravelDetailsPage() {
  const router = useRouter()

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
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors shadow-md">
              <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-brown mb-2 leading-tight">
          SCHEDULED
          <br />
          TRAVEL DETAILS
        </h2>
        <p className="text-sm text-brown-light mb-4">Hey User</p>
        <p className="text-sm text-brown mb-6">Here are the full details of your scheduled travel</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-sage to-sage/80 rounded-2xl p-5 shadow-lg border-2 border-olive/20">
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="w-5 h-5 text-olive" />
              <p className="text-xs font-semibold text-brown italic">Total Distance to travel:</p>
            </div>
            <p className="text-4xl font-bold text-brown">1.6 km</p>
          </div>
          <div className="bg-gradient-to-br from-sage to-sage/80 rounded-2xl p-5 shadow-lg border-2 border-olive/20">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-olive" />
              <p className="text-xs font-semibold text-brown italic">Expected total CO₂ Emission:</p>
            </div>
            <p className="text-4xl font-bold text-brown">0.0 kg</p>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 border-2 border-olive/10 space-y-6">
          {/* Trip Location & Date */}
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-olive/10">
              <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-olive" />
              </div>
              <h3 className="font-bold text-brown text-lg">Trip Location & Date</h3>
            </div>
            <div className="ml-2 space-y-3">
              <div className="flex items-start gap-3 bg-cream/30 p-3 rounded-xl">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-brown font-medium">Balai Ising Resort</p>
              </div>
              <div className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl">
                <Calendar className="w-5 h-5 text-olive" />
                <p className="text-sm text-brown font-medium">May 2, 2025</p>
              </div>
            </div>
          </div>

          {/* Mode of Transportation */}
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-olive/10">
              <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-olive" />
              </div>
              <h3 className="font-bold text-brown text-lg">Mode of Transportation</h3>
            </div>
            <div className="ml-2 space-y-3">
              <div className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl">
                <Bike className="w-5 h-5 text-olive" />
                <p className="text-sm text-brown font-medium">Bicycle (Outbound)</p>
              </div>
              <div className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl">
                <Bike className="w-5 h-5 text-olive" />
                <p className="text-sm text-brown font-medium">Bicycle (Return)</p>
              </div>
            </div>
          </div>

          {/* Distance to Travel */}
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-olive/10">
              <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center">
                <Navigation className="w-5 h-5 text-olive" />
              </div>
              <h3 className="font-bold text-brown text-lg">Distance to Travel</h3>
            </div>
            <div className="ml-2 space-y-4">
              <div className="bg-cream/30 p-4 rounded-xl">
                <p className="text-sm font-bold text-brown mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-olive rounded-full"></span>
                  OUTBOUND:
                </p>
                <div className="flex items-start gap-3 ml-4">
                  <Bike className="w-5 h-5 text-olive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-brown-light leading-relaxed">
                    Bicycle: Muzon, San Juan → Putingkahoy, Rose...{" "}
                    <span className="font-semibold text-brown">(800 m)</span>
                  </p>
                </div>
              </div>
              <div className="bg-cream/30 p-4 rounded-xl">
                <p className="text-sm font-bold text-brown mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-olive rounded-full"></span>
                  RETURN:
                </p>
                <div className="flex items-start gap-3 ml-4">
                  <Bike className="w-5 h-5 text-olive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-brown-light leading-relaxed">
                    Bicycle: Putingkahoy, Rose... → Muzon, San Juan{" "}
                    <span className="font-semibold text-brown">(800 m)</span>
                  </p>
                </div>
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
