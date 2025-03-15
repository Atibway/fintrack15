
"use client";

import {  useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchBudget, fetchBudgetItems, deleteBudget } from "@/actions/budgets-actions";
import { calculateBudgetSummary, formatCurrency, formatDate } from "@/lib/utils";
import { BudgetItem } from "@/lib/types";

import BudgetChart from "@/components/Budget/BudgetChart";
import BudgetItemForm from "@/components/Budget/BudgetItemForm";
import { Button } from "@/components/ui/button";
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { PlusIcon, TrashIcon, AlertCircle, Edit3Icon, PencilIcon } from "lucide-react";
import {  useRouter, useSearchParams } from "next/navigation";
import DeleteBudgetItemDialog from "./delete-budget-item-dialog";
import CreateBudgetForm from "@/components/Budget/CreateBudgetForm";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import BudgetDetailSkeleton from "./BudgetDetailSkeleton copy 2";

export const BudgetDetailComponent = () => {
  const params = useSearchParams();
  const id = params.get("id")
  const router = useRouter();
  
  const [showItemForm, setShowItemForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BudgetItem | undefined>(undefined);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteBudgetItemDialog, setShowDeleteBudgetItemDialog] = useState(false);
  const [showEditBudgetDialog, setShowEditBudgetDialog] = useState(false);

  const { 
    data: budgetItems, 
    isLoading, 
    error
  } = useQuery({
    queryKey: ["budgetItems", id],
    queryFn: async () => {
      if (!id) throw new Error("Budget ID is required");
      return fetchBudgetItems(id);
    },
    enabled: !!id,
  });
  
  // Fetch budget details
  const { 
    data: budget, 
    isLoading: isLoadingBudget, 
    error: budgetError 
  } = useQuery({
    queryKey: ["budget", id],
    queryFn: async () => {
      if (!id) throw new Error("Budget id is required");
      return fetchBudget(id);
    },
    enabled: !!id,
  });
  
  const categoryQuery = useGetCategory(budget?.categoryId ?? undefined);
  // Delete budget mutation
  const deleteBudgetMutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("Budget id is required");
      return deleteBudget(id);
    },
    onSuccess: () => {
      toast.success("Budget deleted successfully");
      router.push("/budget");
    },
    onError: () => {
      toast.error("Failed to delete budget");
    },
  });
  

  
  const handleEditBudget = () => {
    setShowEditBudgetDialog(true)
  };

  const handleAddItem = () => {
    setSelectedItem(undefined);
    setShowItemForm(true);
  };

  const handleEditItem = (item: BudgetItem) => {
    setSelectedItem(item);
    setShowItemForm(true);
  };


  // Calculate budget summary if data is available
  const budgetSummary = budget && budgetItems 
    ? calculateBudgetSummary(budget.totalAmount, budgetItems)
    : null;

  // Display loading state
  if (isLoadingBudget || !budget) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-5 px-4 pb-8">
          <div className="container max-w-5xl mx-auto">
            <BudgetDetailSkeleton/>
          </div>
        </main>
      </div>
    );
  }
  

  // Display error state
  if (budgetError) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-5 px-4 pb-8 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold">Error Loading Budget</h1>
            <p className="text-muted-foreground">Unable to load the budget details</p>
            <Button onClick={() => router.push("/budgets")}>
              Return to Budgets
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
    <DeleteBudgetItemDialog
      item={selectedItem}
       budgetId = {id as string}
       showDeleteBudgetItemDialog = {showDeleteBudgetItemDialog}
        setShowDeleteBudgetItemDialog = {setShowDeleteBudgetItemDialog}
      />
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-5 px-4 pb-8">
      
        <div className="container max-w-5xl mx-auto">
          {/* Budget header */}
          <header className="mb-8">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{budget.name}</h1>
        {budget.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-1">{budget.description}</p>
        )}
        <div className="mt-2 flex flex-col sm:flex-row gap-x-6 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          <span>Created {budget.createdAt ? formatDate(budget.createdAt.toString()) : "Unknown"}</span>
          {budget.categoryId && (
            <span>Category: {categoryQuery.data?.name || "Uncategorized"}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={handleEditBudget}
        >
          <Edit3Icon className="mr-2 h-4 w-4" />
          Edit Budget
        </Button>
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="rounded-full"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete Budget
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the &ldquo;{budget.name}&ldquo; budget and all of its items.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteBudgetMutation.mutate()}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {deleteBudgetMutation.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </header>
          
          {/* Budget visualization */}
          {budgetSummary && (
            <section className="mb-12 budget-panel">
              <h2 className="text-xl font-semibold mb-6">Budget Overview</h2>
              <BudgetChart budgetSummary={budgetSummary} />
            </section>
          )}
          
          {/* Budget items */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Budget Items</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-full"
                onClick={handleAddItem}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full rounded-md" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-6 border rounded-lg">
                <p className="text-destructive">Error loading budget items</p>
              </div>
            ) : budgetItems?.length === 0 ? (
              <div className="text-center py-12 border rounded-lg bg-muted/30">
                <p className="text-lg font-medium">No items added yet</p>
                <p className="text-muted-foreground mt-1">Add items to track your spending</p>
                <Button 
                  onClick={handleAddItem}
                  className="mt-4"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add First Item
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetItems?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditItem(item)}
                            >
                              <PencilIcon className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setShowDeleteBudgetItemDialog(true)
                                setSelectedItem(item)
                              }}
                            >
                              <TrashIcon className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Total row */}
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(budgetSummary?.totalSpent || 0)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <BudgetItemForm
        isOpen={showItemForm}
        onClose={() => setShowItemForm(false)}
        budgetId={budget.id}
        item={selectedItem}
      />
    </div>

    <CreateBudgetForm budget={budget} isOpen={showEditBudgetDialog} onClose={() => setShowEditBudgetDialog(false)} />
    </>
  );
};



          