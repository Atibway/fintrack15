import { getTransactionsForDateRange } from "./getTransactions";

// src/app/actions/getSummaryStats.ts
export async function getSummaryStats(userId: string, startDate: Date, endDate: Date) {
    const transactions = await getTransactionsForDateRange(userId, startDate, endDate);
  
    const income = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const netAmount = income - expenses;
  
    return { income, expenses, netAmount };
  }
  