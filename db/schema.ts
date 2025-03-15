import {  relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod"
import { z } from "zod";
import type { AdapterAccountType } from "next-auth/adapters"

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  currency: text("currency"), 
  number: text("number"), 
  birth:text("date")
});

export const insertUserSchema = createInsertSchema(users)

  export const account = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      primaryKey: primaryKey({columns:[account.provider, account.providerAccountId]}),
    })
  )

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull()
})

export const accountsRelations = relations(accounts, ({many})=> ({
    transactions: many(transactions)
}))

export const insertAccountSchema = createInsertSchema(accounts)

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull()
})

export const categoriesRelations = relations(categories, ({many})=> ({
    transactions: many(transactions)
}))

export const insertCategoriesSchema = createInsertSchema(categories)

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes: text("notes"),
    date: timestamp("date", {mode: "date"}).notNull(),
    accountId: text("account_id").references(()=> accounts.id, {
        onDelete: "cascade"
    }).notNull(),
    categoryId: text("category_id").references(()=> categories.id, {
        onDelete: "set null"
    })
})

export const transactionsRelations = relations(transactions, ({one})=> ({
    account: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id]
    }),
    categories: one(categories, {
        fields: [transactions.accountId],
        references: [categories.id]
    }),
}))

export const insertTransactionSchema = createInsertSchema(transactions, {
    date: z.coerce.date()
})


export const budgets = pgTable("budgets", {
  id: text("id").primaryKey(), // Unique identifier for the budget
  name: text("name").notNull(), // Budget name
  description: text("description"), // Optional description
  totalAmount: integer("total_amount").notNull(), // Total budget amount
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(), // Creation timestamp
  userId: text("user_id") // Link to the user creating the budget
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" }), // Optional link to a category
});

export const budgetItems = pgTable("budget_items", {
  id: text("id").primaryKey(), // Unique identifier for the budget item
  name: text("name").notNull(), // Name of the budget item
  amount: integer("amount").notNull(), // Cost or allocation for the item
  budgetId: text("budget_id")
    .notNull()
    .references(() => budgets.id, { onDelete: "cascade" }), // Links to the parent budget
});

export const insertBudgetSchema = createInsertSchema(budgets);
export const insertBudgetItemSchema = createInsertSchema(budgetItems);
