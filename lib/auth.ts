import { sql } from "./db"
import bcrypt from "bcryptjs"

export interface AuthUser {
  id: string
  email: string
  username: string | null
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(email: string, password: string, username?: string) {
  const hashedPassword = await hashPassword(password)

  const result = await sql`
    INSERT INTO users (email, username, password_hash)
    VALUES (${email}, ${username || null}, ${hashedPassword})
    RETURNING id, email, username
  `

  return result[0] as AuthUser
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const result = await sql`
      SELECT id, email, username, password_hash 
      FROM users 
      WHERE email = ${email}
    `

    if (result.length === 0) {
      return null
    }

    const user = result[0]

    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) {
      return null
    }

    // Update last login
    await sql`UPDATE users SET last_login = NOW() WHERE id = ${user.id}`

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    }
  } catch (error) {
    console.error("Error in authenticateUser:", error)
    throw error
  }
}

export async function getUserById(userId: string): Promise<AuthUser | null> {
  const result = await sql`
    SELECT id, email, username 
    FROM users 
    WHERE id = ${userId}
  `

  if (result.length === 0) {
    return null
  }

  return result[0] as AuthUser
}
