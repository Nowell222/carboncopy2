"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TravelPreferencesPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    travelFrequency: "",
    travelReason: "",
    travelDistance: "",
    preferredMode: "",
    reducingEmissions: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/onboarding/loading")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="w-10 h-10 bg-olive rounded-full flex items-center justify-center mb-6 hover:bg-olive-dark transition-colors"
      >
        <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header Illustration */}
      <div className="flex justify-center mb-6">
        <div className="text-6xl">🌲</div>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brown mb-2">
          Travel & Lifestyle
          <br />
          Preferences
        </h1>
        <p className="text-sm text-brown-light">Almost ready to track your eco-impact!</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-8">
          {/* Travel Frequency */}
          <div>
            <label className="block text-sm text-brown mb-2">How often do you travel?</label>
            <div className="relative">
              <select
                value={formData.travelFrequency}
                onChange={(e) => setFormData({ ...formData, travelFrequency: e.target.value })}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
              >
                <option value="">Enter your answer here</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="occasionally">Occasionally</option>
                <option value="rarely">Rarely</option>
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

          {/* Travel Reason */}
          <div>
            <label className="block text-sm text-brown mb-2">What is your primary reason for travel?</label>
            <div className="relative">
              <select
                value={formData.travelReason}
                onChange={(e) => setFormData({ ...formData, travelReason: e.target.value })}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
              >
                <option value="">Enter your answer here</option>
                <option value="work">Work/Commute</option>
                <option value="leisure">Leisure/Tourism</option>
                <option value="education">Education</option>
                <option value="family">Family/Personal</option>
                <option value="business">Business</option>
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

          {/* Travel Distance */}
          <div>
            <label className="block text-sm text-brown mb-2">How far do you usually travel?</label>
            <div className="relative">
              <select
                value={formData.travelDistance}
                onChange={(e) => setFormData({ ...formData, travelDistance: e.target.value })}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
              >
                <option value="">Enter your answer here</option>
                <option value="short">Short distance (0-10 km)</option>
                <option value="medium">Medium distance (10-50 km)</option>
                <option value="long">Long distance (50-200 km)</option>
                <option value="very-long">Very long distance (200+ km)</option>
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

          {/* Preferred Mode */}
          <div>
            <label className="block text-sm text-brown mb-2">What is your preferred mode of travel?</label>
            <div className="relative">
              <select
                value={formData.preferredMode}
                onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
              >
                <option value="">Enter your answer here</option>
                <option value="walking">Walking</option>
                <option value="bicycle">Bicycle</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="car">Car</option>
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

          {/* Reducing Emissions */}
          <div>
            <label className="block text-sm text-brown mb-2">
              Do you actively try to reduce your travel emissions?
            </label>
            <div className="relative">
              <select
                value={formData.reducingEmissions}
                onChange={(e) => setFormData({ ...formData, reducingEmissions: e.target.value })}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
              >
                <option value="">Enter your answer here</option>
                <option value="yes-always">Yes, always</option>
                <option value="yes-sometimes">Yes, sometimes</option>
                <option value="no-but-interested">No, but interested</option>
                <option value="no">No</option>
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
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-sage hover:bg-sage-dark text-brown font-bold text-lg py-4 rounded-full shadow-lg transition-all duration-200"
          >
            RETURN
          </button>
          <button
            type="submit"
            className="flex-1 bg-olive hover:bg-olive-dark text-cream font-bold text-lg py-4 rounded-full shadow-lg transition-all duration-200"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  )
}
