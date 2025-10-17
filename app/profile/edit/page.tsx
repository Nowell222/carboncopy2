"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EditProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "User",
    email: "user@example.com",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/profile")
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
        <h1 className="text-2xl font-bold text-brown mb-2">Edit Profile</h1>
        <p className="text-sm text-brown-light">Update your personal information</p>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-brown" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors">
            <svg className="w-4 h-4 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-8">
          {/* Name */}
          <div>
            <label className="block text-sm text-brown mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-brown mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-input border-2 border-olive/20 rounded-full px-4 py-3 text-brown focus:outline-none focus:border-olive transition-colors"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-olive hover:bg-olive-dark text-cream font-bold text-xl py-4 rounded-full shadow-lg transition-all duration-200"
        >
          SAVE CHANGES
        </button>
      </form>
    </div>
  )
}
