import { config } from "dotenv";
import { subDays, eachDayOfInterval, format } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { categories, accounts, transactions } from "@/db/schema";
import { convertAmountToMiliunits } from "@/lib/utils";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Constants
const SEED_USER_ID = "7a7a2172-9eda-47e9-a999-f294a8a313a5";

const SEED_CATEGORIES: typeof categories.$inferInsert[] = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID, plaidId: null },
  { id: "category_2", name: "Rent", userId: SEED_USER_ID, plaidId: null },
  { id: "category_3", name: "Utilities", userId: SEED_USER_ID, plaidId: null },
  { id: "category_7", name: "Clothing", userId: SEED_USER_ID, plaidId: null },
];

const SEED_ACCOUNTS: typeof accounts.$inferInsert[] = [
  { id: "account_1", name: "Checking", userId: SEED_USER_ID, plaidId: null },
  { id: "account_2", name: "Savings", userId: SEED_USER_ID, plaidId: null },
];

// Date range
const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

// Transactions array
const SEED_TRANSACTIONS: typeof transactions.$inferInsert[] = [];

// Helpers
const generateRandomAmount = (categoryName: string) => {
  switch (categoryName) {
    case "Rent":
      return Math.random() * 400 + 90;
    case "Utilities":
      return Math.random() * 200 + 50;
    case "Food":
      return Math.random() * 30 + 10;
    case "Transportation":
      return Math.random() * 50 + 15;
    case "Entertainment":
    case "Clothing":
    case "Miscellaneous":
      return Math.random() * 100 + 20;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const rawAmount = generateRandomAmount(category.name);
    const amount = convertAmountToMiliunits(isExpense ? -rawAmount : rawAmount);

    SEED_TRANSACTIONS.push({
      id: `txn_${format(day, "yyyyMMdd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount,
      payee: "Merchant",
      notes: "Random transaction",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach(generateTransactionsForDay);
};

// Execution
const main = async () => {
  try {
    console.log("🌱 Seeding database with fresh data...");

    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(SEED_CATEGORIES).execute();
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();

    generateTransactions();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();

    console.log("✅ Database seeding complete.");
  } catch (error) {
    console.error("❌ Error during seed:", error);
    process.exit(1);
  }
};

main();
