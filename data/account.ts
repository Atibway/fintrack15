import { db } from "@/db/drizzle";
import { account } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAccountByUserId = async(userId: string)=> {
    try {
        const [result] = await db
        .select()
        .from(account)
        .where(eq(account.userId, userId))
        .limit(1)

        return result;
    } catch (error) {
        console.error("Error fetching account:", error);
        return null
    }
}