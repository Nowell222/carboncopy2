import { NextResponse } from "next/server"
import { getUserById } from "@/lib/auth"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await getUserById(userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error: any) {
    console.error("[v0] Get user error:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
