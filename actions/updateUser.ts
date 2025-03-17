"use server"
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth"
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";


export const UpdateUserWhenLoggedInWithAccount = async(
id: string
)=> {

       await db
  .update(users)
  .set({emailVerified: new Date()})
  .where(
      and(
          eq(users.id, id)
      )
  ).returning()

return {success: "User Updated"}
}

