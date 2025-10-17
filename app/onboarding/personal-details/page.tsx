"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PersonalDetailsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    birthday: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/onboarding/travel-preferences")
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
        <div className="relative">
          <div className="w-32 h-32 bg-sage-light rounded-full flex items-center justify-center">
            <div className="text-6xl">🦥</div>
          </div>
          {/* Decorative trees */}
          <div className="absolute -bottom-2 -left-8 text-4xl">🌲</div>
          <div className="absolute -bottom-2 -right-8 text-4xl">🌲</div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brown mb-2">Personal details</h1>
        <p className="text-sm text-brown-light">Setting up your green journey... Almost there</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-8">
          {/* First Name */}
          <div>
            <label className="block text-sm text-brown mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Enter your first name here"
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-brown mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Enter your last name here"
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-brown mb-2">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter your age here"
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block text-sm text-brown mb-2">Sex</label>
            <div className="relative">
              <select
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown appearance-none focus:outline-none focus:border-olive transition-colors"
              >
                <option value="">Enter your sex here</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
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

          {/* Birthday */}
          <div>
            <label className="block text-sm text-brown mb-2">Birthday</label>
            <input
              type="text"
              value={formData.birthday}
              onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              placeholder="Enter your birthday here MM/DD/YY"
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-olive transition-colors"
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full bg-olive hover:bg-olive-dark text-cream font-bold text-xl py-4 rounded-full shadow-lg transition-all duration-200"
        >
          CONTINUE
        </button>
      </form>
    </div>
  )
}
