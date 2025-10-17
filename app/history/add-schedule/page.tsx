"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddSchedulePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    transportMode: "",
    distance: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/history")
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

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brown mb-2">Add Scheduled Travel</h1>
        <p className="text-sm text-brown-light">Plan your upcoming journey</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-8">
          {/* Location */}
          <div>
            <label className="block text-sm text-brown mb-2">Destination</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter destination"
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-brown mb-2">Travel Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          {/* Transport Mode */}
          <div>
            <label className="block text-sm text-brown mb-2">Mode of Transportation</label>
            <div className="relative">
              <select
                value={formData.transportMode}
                onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
              >
                <option value="">Select mode</option>
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

          {/* Distance */}
          <div>
            <label className="block text-sm text-brown mb-2">Estimated Distance (km)</label>
            <input
              type="number"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              placeholder="Enter distance"
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-olive transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-olive hover:bg-olive-dark text-cream font-bold text-xl py-4 rounded-full shadow-lg transition-all duration-200"
        >
          ADD SCHEDULE
        </button>
      </form>
    </div>
  )
}
