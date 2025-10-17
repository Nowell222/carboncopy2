"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { MenuDrawer } from "@/components/menu-drawer"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { X, Loader2, MapPin, Calendar, Navigation, Car } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Trip {
  location: string
  date: string
  co2: number
}

interface ChartDataPoint {
  label: string
  emissions: number
  trips?: Trip[]
}

const TEST_USER_ID = "550e8400-e29b-41d4-a716-446655440000" // Test user from seed data

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")
  const [selectedMonth, setSelectedMonth] = useState<ChartDataPoint | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [weeklyData, setWeeklyData] = useState<ChartDataPoint[]>([])
  const [monthlyData, setMonthlyData] = useState<ChartDataPoint[]>([])
  const [yearlyData, setYearlyData] = useState<ChartDataPoint[]>([])
  const [recentTrips, setRecentTrips] = useState<any[]>([])
  const [totalEmissions, setTotalEmissions] = useState({ week: 0, month: 0, year: 0 })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch emissions summary
      const summaryRes = await fetch(`/api/emissions-summary?userId=${TEST_USER_ID}`)
      if (!summaryRes.ok) throw new Error("Failed to fetch emissions data")
      const summaryData = await summaryRes.json()

      // Fetch travel logs
      const logsRes = await fetch(`/api/travel-logs?userId=${TEST_USER_ID}`)
      if (!logsRes.ok) throw new Error("Failed to fetch travel logs")
      const logsData = await logsRes.json()

      // Process data for charts
      processChartData(summaryData, logsData)

      // Set recent trips (last 2)
      setRecentTrips(logsData.slice(0, 2))
    } catch (err: any) {
      console.error("[v0] Error fetching dashboard data:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const processChartData = (summaryData: any[], logsData: any[]) => {
    // Process weekly data (last 7 days)
    const weekly: ChartDataPoint[] = []
    const today = new Date()
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayName = days[date.getDay()]

      const dayLogs = logsData.filter((log) => {
        const logDate = new Date(log.travel_date)
        return logDate.toDateString() === date.toDateString()
      })

      const emissions = dayLogs.reduce((sum, log) => sum + Number.parseFloat(log.co2_emission), 0)
      weekly.push({ label: dayName, emissions: Number.parseFloat(emissions.toFixed(2)) })
    }
    setWeeklyData(weekly)

    // Process monthly data (last 4 weeks)
    const monthly: ChartDataPoint[] = []
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(today)
      weekStart.setDate(weekStart.getDate() - (i * 7 + 7))
      const weekEnd = new Date(today)
      weekEnd.setDate(weekEnd.getDate() - i * 7)

      const weekLogs = logsData.filter((log) => {
        const logDate = new Date(log.travel_date)
        return logDate >= weekStart && logDate <= weekEnd
      })

      const emissions = weekLogs.reduce((sum, log) => sum + Number.parseFloat(log.co2_emission), 0)
      monthly.push({ label: `Week ${4 - i}`, emissions: Number.parseFloat(emissions.toFixed(2)) })
    }
    setMonthlyData(monthly)

    // Process yearly data (12 months)
    const yearly: ChartDataPoint[] = []
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentYear = today.getFullYear()

    for (let i = 0; i < 12; i++) {
      const monthLogs = logsData.filter((log) => {
        const logDate = new Date(log.travel_date)
        return logDate.getMonth() === i && logDate.getFullYear() === currentYear
      })

      const emissions = monthLogs.reduce((sum, log) => sum + Number.parseFloat(log.co2_emission), 0)
      const trips = monthLogs.map((log) => ({
        location: log.location,
        date: new Date(log.travel_date).toLocaleDateString("en-US", { month: "long", day: "numeric" }),
        co2: Number.parseFloat(log.co2_emission),
      }))

      yearly.push({
        label: months[i],
        emissions: Number.parseFloat(emissions.toFixed(2)),
        trips,
      })
    }
    setYearlyData(yearly)

    // Calculate totals
    const weekTotal = weekly.reduce((sum, day) => sum + day.emissions, 0)
    const monthTotal = logsData
      .filter((log) => {
        const logDate = new Date(log.travel_date)
        return logDate.getMonth() === today.getMonth() && logDate.getFullYear() === currentYear
      })
      .reduce((sum, log) => sum + Number.parseFloat(log.co2_emission), 0)
    const yearTotal = logsData
      .filter((log) => new Date(log.travel_date).getFullYear() === currentYear)
      .reduce((sum, log) => sum + Number.parseFloat(log.co2_emission), 0)

    setTotalEmissions({
      week: Number.parseFloat(weekTotal.toFixed(2)),
      month: Number.parseFloat(monthTotal.toFixed(2)),
      year: Number.parseFloat(yearTotal.toFixed(2)),
    })
  }

  const getChartData = () => {
    switch (timeRange) {
      case "week":
        return weeklyData
      case "month":
        return monthlyData
      case "year":
        return yearlyData
      default:
        return monthlyData
    }
  }

  const handleBarClick = (data: any) => {
    if (timeRange === "year" && data.trips) {
      setSelectedMonth(data)
    }
  }

  const chartData = getChartData()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-olive mx-auto mb-4" />
          <p className="text-brown">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-brown mb-2">Unable to Load Data</h2>
          <p className="text-brown-light mb-4">{error}</p>
          <Button onClick={fetchDashboardData} className="bg-olive hover:bg-olive/90 text-cream">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-background border-b-2 border-olive/20 px-4 sm:px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
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
            <Link
              href="/notifications"
              className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors relative flex-shrink-0"
            >
              <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm0 3c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></span>
            </Link>
            <MenuDrawer />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Welcome Message */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-brown mb-1">Welcome Back, User!</h2>
          <p className="text-sm text-brown-light">Make every journey greener.</p>
        </div>

        {/* Carbon Footprint Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📊</span>
            <h3 className="text-lg font-bold text-brown">Carbon Footprint Summary</h3>
          </div>

          {/* Time Range Tabs */}
          <div className="flex gap-2 mb-6">
            {(["week", "month", "year"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  timeRange === range ? "bg-olive text-cream" : "bg-sage/30 text-brown hover:bg-sage/50"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-3xl font-bold text-brown mb-1">
              {timeRange === "week" && `${totalEmissions.week} kg`}
              {timeRange === "month" && `${totalEmissions.month} kg`}
              {timeRange === "year" && `${totalEmissions.year} kg`}
            </p>
            <p className="text-sm text-brown-light">
              {timeRange === "week" && "This Week"}
              {timeRange === "month" && "This Month"}
              {timeRange === "year" && new Date().getFullYear()}
            </p>
          </div>

          {/* Chart */}
          <div>
            <h4 className="text-sm font-semibold text-brown mb-3">
              {timeRange === "week" && "Daily Carbon Emissions"}
              {timeRange === "month" && "Weekly Carbon Emissions"}
              {timeRange === "year" && "Monthly Carbon Emissions from travel"}
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="label" tick={{ fill: "#6b5d4f", fontSize: 12 }} />
                <YAxis
                  label={{ value: "Carbon Emissions (kg CO₂)", angle: -90, position: "insideLeft", fill: "#6b5d4f" }}
                  tick={{ fill: "#6b5d4f", fontSize: 12 }}
                />
                <Bar
                  dataKey="emissions"
                  fill="#d4a574"
                  radius={[8, 8, 0, 0]}
                  onClick={handleBarClick}
                  cursor={timeRange === "year" ? "pointer" : "default"}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.emissions > 0 ? "#d4a574" : "#e5e5e5"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {timeRange === "year" && (
              <p className="text-xs text-brown-light mt-2 text-center">Click on a month to view trip details</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <h3 className="text-lg font-bold text-brown">Recent Travel History</h3>
            </div>
          </div>

          {recentTrips.length > 0 ? (
            <div className="space-y-4">
              {recentTrips.map((trip, index) => (
                <div
                  key={trip.id}
                  className={`flex items-center justify-between py-3 ${
                    index < recentTrips.length - 1 ? "border-b border-olive/10" : ""
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-brown">{trip.location}</p>
                    <p className="text-sm text-brown-light">
                      {new Date(trip.travel_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brown">{Number.parseFloat(trip.co2_emission).toFixed(2)} kg</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-light py-8">No travel history yet. Start logging your trips!</p>
          )}

          <Link
            href="/history"
            className="block text-center mt-4 text-sm text-olive hover:text-olive-dark font-semibold underline"
          >
            View full History
          </Link>
        </div>

        {/* Smartwatch Sync Status */}
        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-olive/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⌚</span>
            <h3 className="text-lg font-bold text-brown">Smartwatch Sync Status</h3>
          </div>

          <div className="space-y-4">
            {/* Walking Activity */}
            <div className="bg-sage/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-brown">Walking</p>
                <span className="text-sm bg-sage px-3 py-1 rounded-full text-brown">-1.85kg CO₂</span>
              </div>
              <p className="text-sm text-brown-light">April 12</p>
              <p className="text-sm text-brown-light">7.7 km</p>
              <p className="text-sm text-brown-light">10,000 steps</p>
            </div>

            {/* Cycling Activity */}
            <div className="bg-sage/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-brown">Cycling</p>
                <span className="text-sm bg-sage px-3 py-1 rounded-full text-brown">-1.2kg CO₂</span>
              </div>
              <p className="text-sm text-brown-light">April 12</p>
              <p className="text-sm text-brown-light">5 km</p>
            </div>
          </div>
        </div>
      </main>

      {selectedMonth && selectedMonth.trips && selectedMonth.trips.length > 0 && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedMonth(null)}
        >
          <div
            className="bg-background rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] shadow-2xl flex flex-col animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Fixed */}
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b-2 border-olive/20 bg-background sticky top-0 z-10 rounded-t-3xl">
              <div>
                <h3 className="text-2xl font-bold text-brown">{selectedMonth.label} Trips</h3>
                <p className="text-sm text-brown-light mt-1">Detailed breakdown of your travels</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMonth(null)}
                className="rounded-full hover:bg-sage/20 flex-shrink-0"
              >
                <X className="h-6 w-6 text-brown" />
              </Button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-sage to-sage-light rounded-2xl p-5 border-2 border-olive/20 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-olive/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-olive" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-brown-light">Total Emissions</p>
                  </div>
                  <p className="text-3xl font-bold text-brown">{selectedMonth.emissions}</p>
                  <p className="text-xs text-brown-light mt-1">kg CO₂</p>
                </div>
                <div className="bg-gradient-to-br from-cream to-cream-dark rounded-2xl p-5 border-2 border-olive/20 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-olive/20 rounded-full flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-olive" />
                    </div>
                    <p className="text-xs font-semibold text-brown-light">Total Trips</p>
                  </div>
                  <p className="text-3xl font-bold text-brown">{selectedMonth.trips.length}</p>
                  <p className="text-xs text-brown-light mt-1">journeys</p>
                </div>
              </div>

              {/* Trip List */}
              <div>
                <h4 className="font-bold text-brown text-lg mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-olive rounded-full"></span>
                  Trip Breakdown
                </h4>
                <div className="space-y-3">
                  {selectedMonth.trips.map((trip: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-5 border-2 border-olive/10 hover:border-olive/30 transition-all shadow-sm hover:shadow-md group"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <MapPin className="w-5 h-5 text-olive" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-brown text-base leading-tight break-words">
                                {trip.location}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Calendar className="w-4 h-4 text-brown-light flex-shrink-0" />
                                <p className="text-sm text-brown-light">{trip.date}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="bg-sage px-4 py-2 rounded-full">
                            <p className="text-sm font-bold text-brown whitespace-nowrap">{trip.co2} kg</p>
                          </div>
                        </div>
                      </div>

                      {/* Additional trip details if available */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-olive/10">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-olive flex-shrink-0" />
                          <div>
                            <p className="text-xs text-brown-light">Transport</p>
                            <p className="text-sm font-semibold text-brown">Various</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-olive flex-shrink-0" />
                          <div>
                            <p className="text-xs text-brown-light">Distance</p>
                            <p className="text-sm font-semibold text-brown">~{(trip.co2 / 0.12).toFixed(1)} km</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-gradient-to-br from-olive/10 to-sage/20 rounded-2xl p-5 border-2 border-olive/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cream" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.07-.22c2.03-6.07 4.22-12.78 13.22-14.78z" />
                      <path d="M3.82 21.34c2.03-6.07 4.22-12.78 13.22-14.78L17 8z" opacity=".3" />
                      <path d="M17.5 3c-1.79 0-3.37.78-4.5 2.04C11.87 3.78 10.29 3 8.5 3 5.42 3 3 5.42 3 8.5c0 4.13 4.16 7.18 6.94 9.59.52.45 1.1.87 1.71 1.25.07.05.14.09.21.13.13.08.27.15.41.21.13.06.27.11.41.15.14.04.28.07.42.09.14.02.28.03.42.03s.28-.01.42-.03c.14-.02.28-.05.42-.09.14-.04.28-.09.41-.15.14-.06.28-.13.41-.21.07-.04.14-.08.21-.13.61-.38 1.19-.8 1.71-1.25C17.84 15.68 22 12.63 22 8.5 22 5.42 19.58 3 16.5 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-brown mb-2">Environmental Impact</p>
                    <p className="text-sm text-brown-light leading-relaxed">
                      Your {selectedMonth.trips.length} trip{selectedMonth.trips.length > 1 ? "s" : ""} in{" "}
                      {selectedMonth.label} produced {selectedMonth.emissions} kg of CO₂. That's equivalent to{" "}
                      {(selectedMonth.emissions / 0.4).toFixed(1)} km driven in an average car.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="flex-shrink-0 p-6 border-t-2 border-olive/20 bg-background sticky bottom-0 rounded-b-3xl">
              <Link href="/history" className="block">
                <Button className="w-full bg-olive hover:bg-olive-dark text-cream rounded-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  View Full Travel History
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
