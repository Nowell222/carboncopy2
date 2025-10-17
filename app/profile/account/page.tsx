"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountSettingsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "Christian James",
    lastName: "Aguila",
    email: "christian.aguila@example.com",
    phone: "+63 912 345 6789",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false)
    alert("Account settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <header className="bg-cream border-b-2 border-olive/20 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors"
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-brown">Account Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-brown">Personal Information</h2>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="rounded-full border-olive text-olive hover:bg-olive hover:text-cream"
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-brown mb-2">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="rounded-full border-olive/20 disabled:opacity-60"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-brown mb-2">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="rounded-full border-olive/20 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-brown mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-full border-olive/20 disabled:opacity-60"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-brown mb-2">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-full border-olive/20 disabled:opacity-60"
                />
              </div>

              {isEditing && (
                <Button
                  onClick={handleSave}
                  className="w-full md:w-auto bg-olive hover:bg-olive-dark text-cream rounded-full"
                >
                  Save Changes
                </Button>
              )}
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <h2 className="text-xl font-bold text-brown mb-6">Change Password</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-brown mb-2">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="rounded-full border-olive/20"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <Label htmlFor="newPassword" className="text-brown mb-2">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="rounded-full border-olive/20"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-brown mb-2">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="rounded-full border-olive/20"
                  placeholder="Confirm new password"
                />
              </div>

              <Button
                onClick={() => alert("Password changed successfully!")}
                className="w-full md:w-auto bg-olive hover:bg-olive-dark text-cream rounded-full"
              >
                Update Password
              </Button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-red-200">
            <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
            <p className="text-sm text-brown-light mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                  alert("Account deletion initiated. You will be logged out.")
                  router.push("/login")
                }
              }}
              variant="destructive"
              className="rounded-full"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
