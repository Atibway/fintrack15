interface Transaction {
    id: string;
    amount: number;
    categoryId: string | null;
    categoryName: string | null;
  }
  
  interface Category {
    id: string;
    name: string;
  }
  
  export function groupTransactionsByCategoryy(
    transactions: Transaction[],
    categories: Category[]
  ): Record<string, { total: number; transactions: Transaction[] }> {
    // Create a map of categories for quick lookup
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {} as Record<string, string>);
  
    // Initialize the grouped result
    const grouped: Record<string, { total: number; transactions: Transaction[] }> = {};
  
    transactions.forEach((transaction) => {
      // Assign uncategorized to transactions without a category
      const categoryKey = transaction.categoryId
        ? categoryMap[transaction.categoryId]
        : "Uncategorized";
  
      // Ensure the category exists in the result
      if (!grouped[categoryKey]) {
        grouped[categoryKey] = { total: 0, transactions: [] };
      }
  
      // Add the transaction amount to the category total
      grouped[categoryKey].total += transaction.amount;
  
      // Add the transaction to the category's list
      grouped[categoryKey].transactions.push(transaction);
    });
  
    return grouped;
  }
  