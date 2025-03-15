"use server"
import { db } from "@/db/drizzle";
// src/app/actions/getTransactions.ts

import { transactions, accounts, categories } from "@/db/schema";
import { eq, between, and } from "drizzle-orm";

export async function getTransactionsForDateRange(userId: string, startDate: Date, endDate: Date) {
  const fetchedTransactions = await db
    .select({
      id: transactions.id,
      amount: transactions.amount,
      payee: transactions.payee,
      notes: transactions.notes,
      date: transactions.date,
      accountId: transactions.accountId,
      categoryId: transactions.categoryId,
      accountName: accounts.name,
      categoryName: categories.name,
    })
    .from(transactions)
    .leftJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(
        between(transactions.date, startDate, endDate),
        eq(accounts.userId, userId)
      )
    );
  return fetchedTransactions;
}
