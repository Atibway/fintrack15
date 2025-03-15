"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Budget } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { createBudget, updateBudget } from "@/actions/budgets-actions";
import { usegetCategories } from "@/features/categories/api/use-get-categories";

interface CreateBudgetFormProps {
  isOpen: boolean;
  onClose: () => void;
  budget?: Budget;
  onSuccess?: (budget: Budget) => void;
}

const CreateBudgetForm = ({ isOpen, onClose, budget, onSuccess }: CreateBudgetFormProps) => {
  const [name, setName] = useState(budget?.name || "");
  const [description, setDescription] = useState(budget?.description || "");
  const [amount, setAmount] = useState(budget?.totalAmount.toString() || "");
  const [categoryId, setCategoryId] = useState<string | null>(budget?.categoryId || null);
  const [isLoading, setIsLoading] = useState(false);


  const categoryQuery = usegetCategories();
  const queryClient = useQueryClient();
  const isEditing = !!budget;

  useEffect(() => {
    if (isOpen) {
      setName(budget?.name || "");
      setDescription(budget?.description || "");
      setAmount(budget?.totalAmount.toString() || "");
      setCategoryId(budget?.categoryId || null);
    }
  }, [isOpen, budget]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setAmount("");
    setCategoryId(null);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a budget name");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    try {
      if (isEditing && budget) {
        // Update existing budget
        await updateBudget(budget.id, {
          name: name.trim(),
          description: description.trim() || undefined,
          totalAmount: numAmount,
          categoryId: categoryId || null,
        });

        toast.success("Budget updated successfully");
        queryClient.invalidateQueries({ queryKey: ["budget", budget.id] });
        onSuccess?.({
          ...budget,
          name: name.trim(),
          description: description.trim() as string,
          totalAmount: numAmount,
          categoryId: categoryId,
        });
      } else {
        // Create new budget
        await createBudget({
          name: name.trim(),
          description: description.trim() || undefined,
          totalAmount: numAmount,
          categoryId: categoryId || null,
        });

        toast.success("Budget created successfully");
        queryClient.invalidateQueries({ queryKey: ["budgets"] });
        onSuccess?.({
          id: "",
          name: name.trim(),
          description: description.trim() as string,
          totalAmount: numAmount,
          categoryId: categoryId,
          userId: "",
          createdAt: new Date(),
        });
      }
      resetForm();
      onClose();
    } catch (error) {
      toast.error(isEditing ? "Failed to update budget" : "Failed to create budget");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Budget" : "Create New Budget"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edit your budget details." : "Create a new budget to track your expenses."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Budget Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Monthly Expenses"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this budget for?"
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Total Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category (Optional)</Label>
            <Select
              value={categoryId || "none"}
              onValueChange={(value) => setCategoryId(value === "none" ? null : value)}
              disabled={isLoading }
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {categoryQuery.data?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Budget" : "Create Budget")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBudgetForm;
