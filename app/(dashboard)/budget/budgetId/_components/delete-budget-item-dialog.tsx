"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { BudgetItem } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudgetItem } from "@/actions/budgets-actions";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

interface DeleteBudgetItemDialogProps {
  item: BudgetItem | undefined;
  budgetId: string;
  showDeleteBudgetItemDialog: boolean
  setShowDeleteBudgetItemDialog: Dispatch<SetStateAction<boolean>>
}

const DeleteBudgetItemDialog = ({ 
  item,
   budgetId ,
   showDeleteBudgetItemDialog,
   setShowDeleteBudgetItemDialog
  }: DeleteBudgetItemDialogProps) => {
  const queryClient = useQueryClient();
  
  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return deleteBudgetItem(itemId);
    },
    onSuccess: () => {
      toast.success("Item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["budgetItems", budgetId] });
    },
    onError: () => {
      toast.error("Failed to delete item");
    },
  });

  return (
    <AlertDialog open={showDeleteBudgetItemDialog} onOpenChange={setShowDeleteBudgetItemDialog} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the &ldquo;{item?.name}&ldquo; item.
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteItemMutation.mutate(item?.id as string)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteItemMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBudgetItemDialog;
