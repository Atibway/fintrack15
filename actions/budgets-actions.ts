"use server";

import { db } from "@/db/drizzle";
import { budgets, budgetItems } from "@/db/schema";
import { currentUser } from "@/lib/auth";
import { eq, and } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// ---- Budget Actions ----

// Fetch all budgets for the logged-in user
export const fetchBudgets = async () => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User ID not found");

  return db
    .select()
    .from(budgets)
    .where(eq(budgets.userId, user.id));
};

// Fetch a single budget by ID for the logged-in user
export const fetchBudget = async (id: string) => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User ID not found");

  const [data] = await db
    .select()
    .from(budgets)
    .where(and(eq(budgets.id, id), eq(budgets.userId, user.id)));

  return data;
};

// Create a new budget for the logged-in user
export const createBudget = async ({
  name,
  description,
  totalAmount,
  categoryId,
}: {
  name: string;
  description?: string;
  totalAmount: number;
  categoryId?: string | null;
}) => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User ID not found");

const [data] =  await db.insert(budgets).values({
    id: createId(),
    name,
    description,
    totalAmount,
    categoryId,
    userId: user.id,
  }).returning();

  return data;
};

// Update an existing budget for the logged-in user
export const updateBudget = async (id: string, updatedData: Partial<{
  name: string;
  description: string;
  totalAmount: number;
  categoryId: string | null;
}>) => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User ID not found");

  

const [data] =   await db
    .update(budgets)
    .set(updatedData)
    .where(and(eq(budgets.id, id), eq(budgets.userId, user.id)))
    .returning();

    return data;
}

// Delete a budget for the logged-in user
export const deleteBudget = async (id: string) => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User ID not found");

  const [data] = await db
    .delete(budgets)
    .where(and(eq(budgets.id, id), eq(budgets.userId, user.id))).returning()

    return data
};

// ---- Budget Item Actions ----

// Fetch budget items for a specific budget belonging to the logged-in user
export const fetchBudgetItems = async (budgetId: string) => {

  const data = await  db
    .select()
    .from(budgetItems)
    .where(eq(budgetItems.budgetId, budgetId));

    return data
};

// Create a new budget item for the logged-in user's budget
export const createBudgetItem = async ({
  name,
  amount,
  budgetId,
}: {
  name: string;
  amount: number;
  budgetId: string;
}) => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User ID not found");

  // Validate that the budget belongs to the user
  const budget = await fetchBudget(budgetId);
  if (!budget) throw new Error("Budget not found or not accessible");

 const [data] =  await db.insert(budgetItems).values({
    id: createId(),
    name,
    amount,
    budgetId,
  }).returning();

  return data
};

// Update an existing budget item for the logged-in user
export const updateBudgetItem = async (id: string, updatedData: Partial<{
  name: string;
  amount: number;
}>) => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User ID not found");

  // Ensure the budget item belongs to the user
  const [item] = await db
    .select()
    .from(budgetItems)
    .where(eq(budgetItems.id, id));

  if (!item) throw new Error("Item not found or not accessible");

  const [data] = await db.update(budgetItems).set(updatedData).where(eq(budgetItems.id, id)).returning()

  return data;
};

// Delete a budget item for the logged-in user
export const deleteBudgetItem = async (id: string) => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User ID not found");

  // Ensure the budget item belongs to the user
  const [item] = await db
    .select()
    .from(budgetItems)
    .where(eq(budgetItems.id, id));

  if (!item) throw new Error("Item not found or not accessible");

  const [data] = await db.delete(budgetItems).where(eq(budgetItems.id, id)).returning()

  return data;
};
