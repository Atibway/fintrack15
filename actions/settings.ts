"use server"
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth"
import { db } from "@/db/drizzle";

import { SettingsSchema } from "@/schemas"

import * as z from "zod"
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


export const settings = async(
    values: z.infer<typeof SettingsSchema>
)=> {
const user = await currentUser();
if(!user) {
    return {error: "Unauthorized"}
}
const dbUser = await getUserById(user.id as string)

if(!dbUser) {
    return {error: "Unauthorized"}
}

await db.update(users)
    .set(values)
    .where(eq(users.id, users.id));

return {success: "Settings Updated"}
}