import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

// GET emissions summary for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const periodType = searchParams.get("periodType") || "month"

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const result = await sql`
      SELECT * FROM emissions_summary 
      WHERE user_id = ${userId} AND period_type = ${periodType}
      ORDER BY period_start DESC
      LIMIT 12
    `

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error fetching emissions summary:", error)
    return NextResponse.json({ error: "Failed to fetch emissions summary" }, { status: 500 })
  }
}
