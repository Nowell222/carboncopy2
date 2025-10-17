"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SmartwatchSyncPage() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncWalking: true,
    syncCycling: true,
    syncRunning: true,
    syncSteps: true,
    syncDistance: true,
  })

  const handleConnect = () => {
    // In a real app, this would initiate smartwatch pairing
    setIsConnected(true)
    alert("Smartwatch connected successfully!")
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    alert("Smartwatch disconnected")
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
            <h1 className="text-xl font-bold text-brown">Smartwatch Sync</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Connection Status */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-brown mb-2">Connection Status</h2>
                <p className="text-sm text-brown-light">
                  {isConnected ? "Your smartwatch is connected" : "No smartwatch connected"}
                </p>
              </div>
              <div
                className={`w-4 h-4 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
              ></div>
            </div>

            {!isConnected ? (
              <div className="space-y-4">
                <div className="bg-sage/20 rounded-2xl p-4">
                  <h3 className="font-semibold text-brown mb-2">Supported Devices</h3>
                  <ul className="text-sm text-brown-light space-y-1">
                    <li>• Apple Watch (Series 3 and later)</li>
                    <li>• Samsung Galaxy Watch</li>
                    <li>• Fitbit (Versa, Sense, Charge)</li>
                    <li>• Garmin (Forerunner, Fenix, Vivoactive)</li>
                    <li>• Wear OS devices</li>
                  </ul>
                </div>
                <Button onClick={handleConnect} className="w-full bg-olive hover:bg-olive-dark text-cream rounded-full">
                  Connect Smartwatch
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-sage/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-8 h-8 text-olive" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-brown">Apple Watch Series 7</p>
                      <p className="text-sm text-brown-light">Last synced: 2 minutes ago</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full bg-transparent"
                >
                  Disconnect Device
                </Button>
              </div>
            )}
          </div>

          {/* Sync Settings */}
          {isConnected && (
            <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
              <h2 className="text-xl font-bold text-brown mb-6">Sync Settings</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-olive/10">
                  <Label htmlFor="autoSync" className="text-brown font-semibold cursor-pointer">
                    Automatic Sync
                  </Label>
                  <Switch
                    id="autoSync"
                    checked={syncSettings.autoSync}
                    onCheckedChange={(checked) => setSyncSettings({ ...syncSettings, autoSync: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-olive/10">
                  <Label htmlFor="syncWalking" className="text-brown cursor-pointer">
                    Sync Walking Activities
                  </Label>
                  <Switch
                    id="syncWalking"
                    checked={syncSettings.syncWalking}
                    onCheckedChange={(checked) => setSyncSettings({ ...syncSettings, syncWalking: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-olive/10">
                  <Label htmlFor="syncCycling" className="text-brown cursor-pointer">
                    Sync Cycling Activities
                  </Label>
                  <Switch
                    id="syncCycling"
                    checked={syncSettings.syncCycling}
                    onCheckedChange={(checked) => setSyncSettings({ ...syncSettings, syncCycling: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-olive/10">
                  <Label htmlFor="syncRunning" className="text-brown cursor-pointer">
                    Sync Running Activities
                  </Label>
                  <Switch
                    id="syncRunning"
                    checked={syncSettings.syncRunning}
                    onCheckedChange={(checked) => setSyncSettings({ ...syncSettings, syncRunning: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-olive/10">
                  <Label htmlFor="syncSteps" className="text-brown cursor-pointer">
                    Sync Step Count
                  </Label>
                  <Switch
                    id="syncSteps"
                    checked={syncSettings.syncSteps}
                    onCheckedChange={(checked) => setSyncSettings({ ...syncSettings, syncSteps: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <Label htmlFor="syncDistance" className="text-brown cursor-pointer">
                    Sync Distance Traveled
                  </Label>
                  <Switch
                    id="syncDistance"
                    checked={syncSettings.syncDistance}
                    onCheckedChange={(checked) => setSyncSettings({ ...syncSettings, syncDistance: checked })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-cream-dark rounded-2xl p-4 border-2 border-olive/10">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <p className="text-sm font-semibold text-brown mb-1">How it works</p>
                <p className="text-xs text-brown-light leading-relaxed">
                  Carbon Copy automatically tracks your eco-friendly activities like walking and cycling from your
                  smartwatch. These activities help offset your carbon footprint and earn you sustainability rewards!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
