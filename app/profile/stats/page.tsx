"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfileStatsPage() {
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-sage-light/30">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full bg-olive/20">
            <ArrowLeft className="h-5 w-5 text-olive" />
          </Button>
        </Link>
      </header>

      {/* Profile Avatar */}
      <div className="flex justify-center mt-8 mb-6">
        <div className="w-32 h-32 rounded-full bg-sage flex items-center justify-center">
          <div className="text-6xl">👦</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 space-y-4">
        {/* User Profile */}
        <div className="bg-cream-dark rounded-3xl p-4 border-2 border-olive/20 flex items-center gap-3">
          <span className="text-2xl">👤</span>
          <div className="flex-1">
            <div className="text-sm text-olive/70 font-medium">User Profile:</div>
            <div className="text-base font-bold text-olive italic">Christian James Aguila</div>
          </div>
        </div>

        {/* Member Since */}
        <div className="bg-cream-dark rounded-3xl p-4 border-2 border-olive/20 flex items-center gap-3">
          <span className="text-2xl">🗓️</span>
          <div className="flex-1">
            <div className="text-sm text-olive/70 font-medium">Member Since:</div>
            <div className="text-base font-bold text-olive italic">March 2025</div>
          </div>
        </div>

        {/* Traveler Type */}
        <div className="bg-cream-dark rounded-3xl p-4 border-2 border-olive/20 flex items-center gap-3">
          <span className="text-2xl">🦋</span>
          <div className="flex-1">
            <div className="text-sm text-olive/70 font-medium">Traveler Type:</div>
            <div className="text-base font-bold text-olive italic">Occasional Explorer</div>
          </div>
        </div>

        {/* Total Trips Logged */}
        <div className="bg-cream-dark rounded-3xl p-4 border-2 border-olive/20 flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div className="flex-1">
            <div className="text-sm text-olive/70 font-medium">Total Trips Logged:</div>
            <div className="text-base font-bold text-olive italic">4 trips</div>
          </div>
        </div>

        {/* Total Carbon Emissions */}
        <div className="bg-cream-dark rounded-3xl p-4 border-2 border-olive/20 flex items-center gap-3">
          <span className="text-2xl">🌍</span>
          <div className="flex-1">
            <div className="text-sm text-olive/70 font-medium">Total Carbon Emissions:</div>
            <div className="text-base font-bold text-olive italic">8.32 kg CO₂</div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-cream-dark rounded-3xl p-4 border-2 border-olive/20 flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <div className="flex-1">
            <div className="text-sm text-olive/70 font-medium">This Month (April):</div>
            <div className="text-base font-bold text-olive italic">6.16 kg CO₂</div>
          </div>
        </div>

        {/* Last Month */}
        <div className="bg-cream-dark rounded-3xl p-4 border-2 border-olive/20 flex items-center gap-3">
          <span className="text-2xl">📆</span>
          <div className="flex-1">
            <div className="text-sm text-olive/70 font-medium">Last Month (March):</div>
            <div className="text-base font-bold text-olive italic">2.16 kg CO₂</div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Link href="/profile/stats/breakdown">
          <Button className="w-full bg-olive hover:bg-olive/90 text-cream rounded-full h-14 text-lg font-bold shadow-lg flex items-center justify-center gap-2">
            Continue
            <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-olive" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  )
}
