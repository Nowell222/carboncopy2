import { neon } from "@neondatabase/serverless"

// Initialize Neon serverless SQL client
const sql = neon(process.env.DATABASE_URL!)

export { sql }

// Type definitions for database tables
export interface User {
  id: string
  email: string
  username: string | null
  password_hash: string
  created_at: Date
  updated_at: Date
  last_login: Date | null
}

export interface UserProfile {
  id: string
  user_id: string
  first_name: string | null
  last_name: string | null
  age: number | null
  sex: string | null
  birthday: Date | null
  avatar_url: string | null
  travel_frequency: string | null
  travel_reason: string | null
  travel_distance: string | null
  preferred_mode: string | null
  actively_reducing: boolean
  traveler_type: string
  created_at: Date
  updated_at: Date
}

export interface TravelLog {
  id: string
  user_id: string
  location: string
  start_point: string | null
  end_point: string | null
  travel_date: Date
  mode_outbound: string
  mode_return: string | null
  distance_outbound: number
  distance_return: number | null
  total_distance: number
  fuel_consumption: number | null
  co2_emission: number
  created_at: Date
  updated_at: Date
}

export interface ScheduledTravel {
  id: string
  user_id: string
  location: string
  start_point: string | null
  end_point: string | null
  scheduled_date: Date
  mode_outbound: string
  mode_return: string | null
  distance_outbound: number
  distance_return: number | null
  total_distance: number
  fuel_consumption: number | null
  expected_co2_emission: number
  status: string
  created_at: Date
  updated_at: Date
}

export interface EmissionsSummary {
  id: string
  user_id: string
  period_type: "week" | "month" | "year"
  period_start: Date
  period_end: Date
  total_trips: number
  total_distance: number
  total_emissions: number
  created_at: Date
  updated_at: Date
}

export interface SmartwatchActivity {
  id: string
  user_id: string
  activity_type: string
  activity_date: Date
  distance: number
  steps: number | null
  duration: number | null
  co2_saved: number
  synced_at: Date
  created_at: Date
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  icon: string | null
  is_read: boolean
  action_url: string | null
  created_at: Date
}

export interface SageConversation {
  id: string
  user_id: string
  message: string
  sender: "user" | "sage"
  created_at: Date
}

export interface UserSettings {
  id: string
  user_id: string
  notifications_enabled: boolean
  email_notifications: boolean
  smartwatch_sync_enabled: boolean
  data_sharing: boolean
  theme: string
  created_at: Date
  updated_at: Date
}

// Additional utility functions for database operations
export async function query(sqlQuery: string, params?: any[]) {
  // Neon serverless doesn't use parameterized queries the same way
  // For simple queries without params, use directly
  if (!params || params.length === 0) {
    return await sql(sqlQuery)
  }

  // For parameterized queries, we need to use template literals
  // This is a simplified version - in production you'd want better param handling
  return await sql(sqlQuery, params)
}

export async function execute(sqlQuery: string, params?: any[]) {
  if (!params || params.length === 0) {
    await sql(sqlQuery)
  } else {
    await sql(sqlQuery, params)
  }
}
