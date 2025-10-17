import { NextResponse } from "next/server"
import { createUser } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 409 })
    }

    // Create user
    const user = await createUser(email, password, username)

    // Create user profile
    await sql`
      INSERT INTO user_profiles (user_id, traveler_type, actively_reducing)
      VALUES (${user.id}, ${"Occasional Explorer"}, ${false})
    `

    // Create user settings
    await sql`
      INSERT INTO user_settings (user_id)
      VALUES (${user.id})
    `

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      },
      { status: 201 },
    )

    // Set session cookie
    response.cookies.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
