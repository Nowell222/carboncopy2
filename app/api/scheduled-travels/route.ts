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

    const result = await sql`
      SELECT * FROM scheduled_travels 
      WHERE user_id = ${userId} AND status = 'scheduled'
      ORDER BY scheduled_date ASC
    `

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("[v0] Get scheduled travels error:", error)
    return NextResponse.json({ error: "Failed to get scheduled travels" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const {
      location,
      startPoint,
      endPoint,
      scheduledDate,
      modeOutbound,
      modeReturn,
      distanceOutbound,
      distanceReturn,
      totalDistance,
      fuelConsumption,
      expectedCo2Emission,
    } = body

    const result = await sql`
      INSERT INTO scheduled_travels (
        user_id, location, start_point, end_point, scheduled_date,
        mode_outbound, mode_return, distance_outbound, distance_return,
        total_distance, fuel_consumption, expected_co2_emission
      ) VALUES (
        ${userId}, ${location}, ${startPoint}, ${endPoint}, ${scheduledDate},
        ${modeOutbound}, ${modeReturn}, ${distanceOutbound}, ${distanceReturn},
        ${totalDistance}, ${fuelConsumption}, ${expectedCo2Emission}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error: any) {
    console.error("[v0] Create scheduled travel error:", error)
    return NextResponse.json({ error: "Failed to create scheduled travel" }, { status: 500 })
  }
}
