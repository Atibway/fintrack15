export interface Category {
    id: string;
    name: string;
  }
  
  // types.ts
export interface Budget {
  name: string;
  description: string | null;
  categoryId: string | null;
  id: string;
  userId: string;
  totalAmount: number;
  createdAt: Date | null;
}

  
  export interface BudgetItem {
    id: string;
    name: string;
    amount: number;
    budgetId: string;
  }
  
  export interface BudgetSummary {
    totalBudget: number;
    totalSpent: number;
    remaining: number;
    percentUtilized: number;
  }
  