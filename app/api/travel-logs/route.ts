import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

// GET all travel logs for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const result = await sql`
      SELECT * FROM travel_logs 
      WHERE user_id = ${userId} 
      ORDER BY travel_date DESC
    `

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error fetching travel logs:", error)
    return NextResponse.json({ error: "Failed to fetch travel logs" }, { status: 500 })
  }
}

// POST create new travel log
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      userId,
      location,
      startPoint,
      endPoint,
      travelDate,
      modeOutbound,
      modeReturn,
      distanceOutbound,
      distanceReturn,
      totalDistance,
      fuelConsumption,
      co2Emission,
    } = body

    const result = await sql`
      INSERT INTO travel_logs (
        user_id, location, start_point, end_point, travel_date,
        mode_outbound, mode_return, distance_outbound, distance_return,
        total_distance, fuel_consumption, co2_emission
      ) VALUES (
        ${userId}, ${location}, ${startPoint}, ${endPoint}, ${travelDate},
        ${modeOutbound}, ${modeReturn}, ${distanceOutbound}, ${distanceReturn},
        ${totalDistance}, ${fuelConsumption}, ${co2Emission}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating travel log:", error)
    return NextResponse.json({ error: "Failed to create travel log" }, { status: 500 })
  }
}
