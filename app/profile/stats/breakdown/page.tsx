"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MonthlyBreakdownPage() {
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-sage-light/30">
        <Link href="/profile/stats">
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

      {/* Title */}
      <div className="px-6 mb-6">
        <div className="bg-cream-dark rounded-3xl p-4 border-2 border-olive/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h1 className="text-xl font-bold text-olive">Monthly Emissions Breakdown</h1>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="px-6 mb-6">
        <div className="bg-sage-light rounded-3xl p-6 border-2 border-olive/20">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-olive/30">
                <th className="text-left py-3 px-2 font-bold text-olive">Month</th>
                <th className="text-center py-3 px-2 font-bold text-olive">Trips</th>
                <th className="text-right py-3 px-2 font-bold text-olive">Emissions (kg CO₂)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-olive/20">
                <td className="py-3 px-2 font-medium text-olive">March</td>
                <td className="text-center py-3 px-2 font-medium text-olive">2</td>
                <td className="text-right py-3 px-2 font-medium text-olive">2.16</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium text-olive">April</td>
                <td className="text-center py-3 px-2 font-medium text-olive">2</td>
                <td className="text-right py-3 px-2 font-medium text-olive">6.16</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Encouraging Messages */}
      <div className="px-6 space-y-4">
        <div className="bg-sage-light rounded-3xl p-4 border-2 border-olive/20 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🟢</span>
          <p className="text-sm font-medium text-olive italic leading-relaxed">
            {"You're emitting <25% of what the average commuter contributes monthly!"}
          </p>
        </div>

        <div className="bg-sage-light rounded-3xl p-4 border-2 border-olive/20 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">✅</span>
          <p className="text-sm font-medium text-olive italic leading-relaxed">
            Great job keeping emissions low - Keep it up with sustainable travel modes!
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Link href="/dashboard">
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
