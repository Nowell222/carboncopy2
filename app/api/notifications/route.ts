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
      SELECT * FROM notifications 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 50
    `

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("[v0] Get notifications error:", error)
    return NextResponse.json({ error: "Failed to get notifications" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { notificationId } = await request.json()

    await sql`
      UPDATE notifications
      SET is_read = true
      WHERE id = ${notificationId} AND user_id = ${userId}
    `

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Update notification error:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}
