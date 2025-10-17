import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const timeResult = await sql`SELECT NOW() as current_time, version() as pg_version`

    const tablesResult = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    // Check if test user exists
    const testUser = await sql`
      SELECT id, email, username, created_at 
      FROM users 
      WHERE email = 'test@carboncopy.com'
    `

    return NextResponse.json({
      success: true,
      message: "Database connection successful!",
      timestamp: timeResult[0].current_time,
      postgresVersion: timeResult[0].pg_version,
      tablesCount: tablesResult.length,
      tables: tablesResult.map((t: any) => t.table_name),
      testUserExists: testUser.length > 0,
      testUser:
        testUser.length > 0
          ? {
              id: testUser[0].id,
              email: testUser[0].email,
              username: testUser[0].username,
              created_at: testUser[0].created_at,
            }
          : null,
    })
  } catch (error: any) {
    console.error("[v0] Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
