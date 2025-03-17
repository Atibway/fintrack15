import { db } from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getUserByEmail = async (email: string) => {
  try {

    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
  
    return result
  } catch (error) {
    console.error("Error fetching user by email:", error)
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
   
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
    return result
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return null
  }
}

