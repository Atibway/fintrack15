"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createBudgetItem, updateBudgetItem } from "@/actions/budgets-actions";
import { BudgetItem } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";

interface BudgetItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  budgetId: string;
  item?: BudgetItem;
  onSuccess?: (item: BudgetItem) => void;
}

const BudgetItemForm = ({ isOpen, onClose, budgetId, item, onSuccess }: BudgetItemFormProps) => {
  const [name, setName] = useState(item?.name || "");
  const [amount, setAmount] = useState(item?.amount.toString() || "");
  const [isLoading, setIsLoading] = useState(false);
  
  const queryClient = useQueryClient();
  const isEditing = !!item;
  
  // Reset form when item changes
  useEffect(() => {
    if (isOpen) {
      setName(item?.name || "");
      setAmount(item?.amount.toString() || "");
    }
  }, [isOpen, item]);
  
  const resetForm = () => {
    setName("");
    setAmount("");
    setIsLoading(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast.error("Please enter an item name");
      return;
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsLoading(true);
    
    try {
      let resultItem: BudgetItem;
      
      if (isEditing && item) {
        // Update existing item
        await updateBudgetItem(item.id, {
          name: name.trim(),
          amount: numAmount
        });
        resultItem = { ...item, name: name.trim(), amount: numAmount };
        queryClient.invalidateQueries({ queryKey: ["budgetItems", budgetId] });
        toast.success("Budget item updated successfully");
      } else {
        // Create new item
        const newItem = await createBudgetItem({
          name: name.trim(),
          amount: numAmount,
          budgetId
        });
        resultItem = newItem;
        toast.success("Budget item added successfully");
      }
      
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["budgetItems", budgetId] });
      onSuccess?.(resultItem);
      onClose();
    } catch (error) {
      toast.error(isEditing ? "Failed to update item" : "Failed to add item");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Budget Item" : "Add Budget Item"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Rent"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
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
              {isLoading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Item" : "Add Item")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetItemForm;
