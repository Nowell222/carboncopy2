import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const profileResult = await sql`
      SELECT up.*, u.email, u.username
      FROM user_profiles up
      JOIN users u ON u.id = up.user_id
      WHERE up.user_id = ${userId}
    `

    if (profileResult.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    const statsResult = await sql`
      SELECT 
        COUNT(*) as total_trips,
        COALESCE(SUM(co2_emission), 0) as total_emissions
      FROM travel_logs
      WHERE user_id = ${userId}
    `

    return NextResponse.json({
      profile: profileResult[0],
      stats: statsResult[0],
    })
  } catch (error: any) {
    console.error("[v0] Get profile error:", error)
    return NextResponse.json({ error: "Failed to get profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, age, sex, birthday, travelFrequency, travelReason, travelDistance, preferredMode } =
      body

    const result = await sql`
      UPDATE user_profiles
      SET first_name = ${firstName}, last_name = ${lastName}, age = ${age}, sex = ${sex}, 
          birthday = ${birthday}, travel_frequency = ${travelFrequency}, 
          travel_reason = ${travelReason}, travel_distance = ${travelDistance}, 
          preferred_mode = ${preferredMode}, updated_at = NOW()
      WHERE user_id = ${userId}
      RETURNING *
    `

    return NextResponse.json({ profile: result[0] })
  } catch (error: any) {
    console.error("[v0] Update profile error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
