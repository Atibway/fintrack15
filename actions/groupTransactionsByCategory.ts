"use server"
// src/app/actions/groupTransactionsByCategory.ts
import { db } from "@/db/drizzle";
import { getTransactionsForDateRange } from "./getTransactions";
import { groupTransactionsByCategoryy } from "./groupTransactionsByCategoryy";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function getGroupedTransactions(userId: string, startDate: Date, endDate: Date) {
  const transactions = await getTransactionsForDateRange(userId, startDate, endDate);
  const categorys = await db.
  select().from(categories)
  .where(eq(categories.userId, userId));

  return groupTransactionsByCategoryy(transactions, categorys);
}
