"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { MenuDrawer } from "@/components/menu-drawer"

// Emission factors in kg CO2 per km
const EMISSION_FACTORS: Record<string, number> = {
  walking: 0,
  bicycle: 0,
  motorcycle: 0.08,
  car: 0.12,
  bus: 0.05,
  train: 0.04,
  plane: 0.25,
  tricycle: 0.06,
  jeepney: 0.07,
}

// Frequency multipliers
const FREQUENCY_MULTIPLIERS: Record<string, number> = {
  daily: 365,
  weekly: 52,
  monthly: 12,
  yearly: 1,
}

export default function CalculatorPage() {
  const router = useRouter()
  const [startingPoint, setStartingPoint] = useState("")
  const [endingPoint, setEndingPoint] = useState("")
  const [travelMode, setTravelMode] = useState("")
  const [distance, setDistance] = useState(0)
  const [fuelConsumption, setFuelConsumption] = useState(8) // L/100km default
  const [frequency, setFrequency] = useState("")
  const [totalEmission, setTotalEmission] = useState<number | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!travelMode || !frequency || distance === 0) {
      return
    }

    let emissionFactor = EMISSION_FACTORS[travelMode] || 0

    if (["car", "motorcycle", "jeepney", "tricycle"].includes(travelMode) && fuelConsumption > 0) {
      // CO2 emission = fuel consumption (L/100km) × distance (km) × 2.31 kg CO2/L
      // 2.31 is the average CO2 emission per liter of gasoline
      emissionFactor = (fuelConsumption / 100) * 2.31
    }

    const frequencyMultiplier = FREQUENCY_MULTIPLIERS[frequency] || 1

    // Calculate: emission per km × distance × frequency
    const emission = emissionFactor * distance * frequencyMultiplier

    setTotalEmission(emission)
  }

  const showFuelInput = ["car", "motorcycle", "jeepney", "tricycle"].includes(travelMode)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-background border-b-2 border-olive/20 px-4 sm:px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-brown">Carbon Copy</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/profile"
              className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </Link>
            <MenuDrawer />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-brown mb-2">
            CARBON EMISSION
            <br />
            CALCULATOR
          </h2>
          <p className="text-sm text-brown-light">Calculate your travel emissions accurately</p>
        </div>

        {/* Calculator Form */}
        <form onSubmit={handleCalculate} className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10">
            <label className="block text-sm font-semibold text-brown mb-3">Starting Point</label>
            <input
              type="text"
              value={startingPoint}
              onChange={(e) => setStartingPoint(e.target.value)}
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown placeholder:text-brown-light focus:outline-none focus:border-olive transition-colors"
              placeholder="Enter starting location"
            />
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10">
            <label className="block text-sm font-semibold text-brown mb-3">Ending Point</label>
            <input
              type="text"
              value={endingPoint}
              onChange={(e) => setEndingPoint(e.target.value)}
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown placeholder:text-brown-light focus:outline-none focus:border-olive transition-colors"
              placeholder="Enter destination"
            />
          </div>

          {/* Travel Mode */}
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10">
            <label className="block text-sm font-semibold text-brown mb-3">Travel Mode</label>
            <div className="relative">
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
                required
              >
                <option value="">Select travel mode</option>
                <option value="walking">Walking</option>
                <option value="bicycle">Bicycle</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="tricycle">Tricycle</option>
                <option value="car">Car</option>
                <option value="jeepney">Jeepney</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="plane">Plane</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-light pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Distance Traveled */}
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10">
            <label className="block text-sm font-semibold text-brown mb-3">Distance Traveled (km)</label>
            <div className="space-y-4">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                min="0"
                max="1000"
                step="0.1"
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown focus:outline-none focus:border-olive transition-colors"
                placeholder="Enter distance"
                required
              />
              <div className="space-y-2">
                <input
                  type="range"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full h-2 bg-sage rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-olive [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-olive [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-brown-light">
                  <span>0 km</span>
                  <span>100 km</span>
                </div>
              </div>
            </div>
          </div>

          {showFuelInput && (
            <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10 animate-in slide-in-from-top duration-300">
              <label className="block text-sm font-semibold text-brown mb-3">Fuel Consumption (L/100km)</label>
              <div className="space-y-4">
                <input
                  type="number"
                  value={fuelConsumption}
                  onChange={(e) => setFuelConsumption(Number(e.target.value))}
                  min="1"
                  max="30"
                  step="0.1"
                  className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown focus:outline-none focus:border-olive transition-colors"
                  placeholder="Enter fuel consumption"
                />
                <div className="space-y-2">
                  <input
                    type="range"
                    value={fuelConsumption}
                    onChange={(e) => setFuelConsumption(Number(e.target.value))}
                    min="1"
                    max="30"
                    step="0.1"
                    className="w-full h-2 bg-sage rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-olive [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-olive [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-brown-light">
                    <span>1 L/100km</span>
                    <span>30 L/100km</span>
                  </div>
                </div>
                <p className="text-xs text-brown-light">Average: Cars 6-10 L/100km, Motorcycles 3-5 L/100km</p>
              </div>
            </div>
          )}

          {/* Travel Frequency */}
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10">
            <label className="block text-sm font-semibold text-brown mb-3">Travel Frequency</label>
            <div className="relative">
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
                required
              >
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-light pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            className="w-full bg-olive hover:bg-olive-dark text-cream font-bold text-lg sm:text-xl py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            CALCULATE
          </button>

          {/* Results */}
          {totalEmission !== null && (
            <div className="bg-sage rounded-3xl shadow-lg p-6 border-2 border-olive/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-sm font-semibold text-brown mb-2">Total CO₂ Emission</p>
              <p className="text-4xl sm:text-5xl font-bold text-brown mb-2">{totalEmission.toFixed(2)}</p>
              <p className="text-lg text-brown">kg CO₂</p>
              <p className="text-xs text-brown-light mt-4">
                {frequency === "daily" && "per year"}
                {frequency === "weekly" && "per year"}
                {frequency === "monthly" && "per year"}
                {frequency === "yearly" && "per year"}
              </p>
              {startingPoint && endingPoint && (
                <div className="mt-4 pt-4 border-t border-olive/20">
                  <p className="text-xs text-brown-light">
                    Route: {startingPoint} → {endingPoint}
                  </p>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Info Card */}
        <div className="mt-6 sm:mt-8 bg-cream-dark rounded-2xl p-4 border-2 border-olive/10">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-semibold text-brown mb-1">Pro Tip</p>
              <p className="text-xs text-brown-light leading-relaxed">
                For the most accurate results, enter your vehicle's actual fuel consumption. You can find this in your
                car's manual or calculate it by dividing liters used by kilometers driven, then multiplying by 100.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
