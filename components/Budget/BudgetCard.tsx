import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { Budget } from "@/lib/types";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

interface BudgetCardProps {
  budget: Budget;
  className?: string;
}

const BudgetCard = ({ budget, className }: BudgetCardProps) => {
  const categoryQuery = useGetCategory(budget.categoryId ?? undefined);
  return (
    <Card className={cn("overflow-hidden h-full transition-all hover:shadow-md", className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            {budget.categoryId && (
              <div className="flex items-center mb-1.5">
                <div className="chip bg-secondary text-secondary-foreground">
                  <Tag className="w-3 h-3 mr-1" />
                  {/* Assuming you have a way to get category name by ID */}
                  {/* Replace "Category Name" with the actual category name */}
                  {categoryQuery.data?.name || "unCategorized"} 
                </div>
              </div>
            )}
            <h3 className="text-lg font-semibold">{budget.name}</h3>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="mt-1 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {budget.description || "No description"}
        </div>
        
        <div className="mt-4">
          <div className="text-2xl font-bold">{formatCurrency(budget.totalAmount)}</div>
          <div className="text-sm text-muted-foreground mt-1">
            Created {budget.createdAt ? formatDate(budget.createdAt.toString()) : "Unknown date"}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">

        <Link
          href={`/budget/budgetId?id=${budget.id}`}
          className="flex items-center text-sm font-medium text-primary hover:underline"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BudgetCard;
