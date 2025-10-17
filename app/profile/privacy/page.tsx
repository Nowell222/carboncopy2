"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PrivacySecurityPage() {
  const router = useRouter()
  const [privacySettings, setPrivacySettings] = useState({
    shareProfile: false,
    shareTrips: false,
    shareStats: false,
    allowAnalytics: true,
    marketingEmails: false,
    twoFactorAuth: false,
  })

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
            <h1 className="text-xl font-bold text-brown">Privacy & Security</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Privacy Settings */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <h2 className="text-xl font-bold text-brown mb-6">Privacy Settings</h2>

            <div className="space-y-4">
              <div className="flex items-start justify-between py-3 border-b border-olive/10">
                <div className="flex-1 pr-4">
                  <Label htmlFor="shareProfile" className="text-brown font-semibold cursor-pointer block mb-1">
                    Public Profile
                  </Label>
                  <p className="text-xs text-brown-light">Allow others to view your profile information</p>
                </div>
                <Switch
                  id="shareProfile"
                  checked={privacySettings.shareProfile}
                  onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, shareProfile: checked })}
                />
              </div>

              <div className="flex items-start justify-between py-3 border-b border-olive/10">
                <div className="flex-1 pr-4">
                  <Label htmlFor="shareTrips" className="text-brown font-semibold cursor-pointer block mb-1">
                    Share Travel History
                  </Label>
                  <p className="text-xs text-brown-light">Let others see your travel history and routes</p>
                </div>
                <Switch
                  id="shareTrips"
                  checked={privacySettings.shareTrips}
                  onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, shareTrips: checked })}
                />
              </div>

              <div className="flex items-start justify-between py-3 border-b border-olive/10">
                <div className="flex-1 pr-4">
                  <Label htmlFor="shareStats" className="text-brown font-semibold cursor-pointer block mb-1">
                    Share Carbon Statistics
                  </Label>
                  <p className="text-xs text-brown-light">Display your carbon footprint stats publicly</p>
                </div>
                <Switch
                  id="shareStats"
                  checked={privacySettings.shareStats}
                  onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, shareStats: checked })}
                />
              </div>

              <div className="flex items-start justify-between py-3 border-b border-olive/10">
                <div className="flex-1 pr-4">
                  <Label htmlFor="allowAnalytics" className="text-brown font-semibold cursor-pointer block mb-1">
                    Usage Analytics
                  </Label>
                  <p className="text-xs text-brown-light">Help us improve by sharing anonymous usage data</p>
                </div>
                <Switch
                  id="allowAnalytics"
                  checked={privacySettings.allowAnalytics}
                  onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowAnalytics: checked })}
                />
              </div>

              <div className="flex items-start justify-between py-3">
                <div className="flex-1 pr-4">
                  <Label htmlFor="marketingEmails" className="text-brown font-semibold cursor-pointer block mb-1">
                    Marketing Emails
                  </Label>
                  <p className="text-xs text-brown-light">Receive tips and updates about sustainable travel</p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={privacySettings.marketingEmails}
                  onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, marketingEmails: checked })}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <h2 className="text-xl font-bold text-brown mb-6">Security Settings</h2>

            <div className="space-y-4">
              <div className="flex items-start justify-between py-3 border-b border-olive/10">
                <div className="flex-1 pr-4">
                  <Label htmlFor="twoFactorAuth" className="text-brown font-semibold cursor-pointer block mb-1">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-xs text-brown-light">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={privacySettings.twoFactorAuth}
                  onCheckedChange={(checked) => {
                    setPrivacySettings({ ...privacySettings, twoFactorAuth: checked })
                    if (checked) {
                      alert("Two-factor authentication enabled! You'll receive a verification code on your next login.")
                    }
                  }}
                />
              </div>

              <div className="py-3">
                <Button
                  onClick={() => alert("Active sessions cleared!")}
                  variant="outline"
                  className="w-full md:w-auto border-olive text-olive hover:bg-olive hover:text-cream rounded-full"
                >
                  Clear All Active Sessions
                </Button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <h2 className="text-xl font-bold text-brown mb-6">Data Management</h2>

            <div className="space-y-4">
              <Button
                onClick={() => alert("Your data export will be ready in a few minutes. We'll send you an email.")}
                variant="outline"
                className="w-full border-olive text-olive hover:bg-olive hover:text-cream rounded-full"
              >
                Download My Data
              </Button>

              <Button
                onClick={() => {
                  if (confirm("Are you sure you want to delete all your travel history? This cannot be undone.")) {
                    alert("Travel history deleted")
                  }
                }}
                variant="outline"
                className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full"
              >
                Delete All Travel History
              </Button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-cream-dark rounded-2xl p-4 border-2 border-olive/10">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🔒</span>
              <div>
                <p className="text-sm font-semibold text-brown mb-1">Your Privacy Matters</p>
                <p className="text-xs text-brown-light leading-relaxed">
                  We take your privacy seriously. Your data is encrypted and never shared with third parties without
                  your explicit consent. Read our <button className="text-olive underline">Privacy Policy</button> for
                  more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
