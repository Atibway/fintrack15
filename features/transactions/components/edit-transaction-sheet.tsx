import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"

import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import { insertTransactionSchema } from "@/db/schema";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { TransactionForm } from "./transaction-form";
import { usegetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { usegetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertTransactionSchema.omit({
    id: true
})

type formValues = z.input<typeof formSchema>;

  export const EditTransactionSheet = ()=>{
const {isOpen, onClose, id} = useOpenTransaction()
const [ConfirmDialog, confirm] = useConfirm(
  "Are you sure?",
  "You are about to delete this Transaction"
)

const transactionQuery = useGetTransaction(id);
const editMutation = useEditTransaction(id)
const deleteMutation = useDeleteTransaction(id);

const categoryQuery = usegetCategories();
const categoryMutation = useCreateCategory();
const onCreatecategory = (name: string)=> categoryMutation.mutate({
  name
})
const categoryOptions = (categoryQuery.data ?? []).map((category)=> ({
label: category.name,
value: category.id
}));

const accountQuery = usegetAccounts();
const accountMutation = useCreateAccount();
const onCreateAccount = (name: string)=> accountMutation.mutate({
  name
})
const accountOptions = (accountQuery.data ?? []).map((account)=> ({
label: account.name,
value: account.id
}));

const isPending = 
editMutation.isPending ||
deleteMutation.isPending ||
transactionQuery.isPending ||
categoryMutation.isPending ||
accountMutation.isPending

const isLoading = 
transactionQuery.isLoading ||
categoryQuery.isLoading ||
accountQuery.isLoading

const onSubmit=(values: formValues)=> {
editMutation.mutate(values, {
  onSuccess: ()=> {
    onClose();
  }
})
}
const onDelete = async()=> {
  const ok = await confirm()

  if(ok){
    deleteMutation.mutate(undefined, {
      onSuccess:()=> {
        onClose();
      }
    })
  }
}

const defaultValues = transactionQuery.data ? {
  accountId: transactionQuery.data.accountId,
  categoryId: transactionQuery.data.categoryId,
  amount: transactionQuery.data.amount.toString(),
  date: transactionQuery.data.date
      ? new Date(transactionQuery.data.date)
      : new Date(),
  payee: transactionQuery.data.payye,
  notes: transactionQuery.data.notes,
} : {
  accountId: "",
  categoryId: "",
  amount: "",
  date: new Date(),
  payee: "",
  notes: "",
};


const handleClose=()=>{
onClose()
}
    return (
      <>
      <ConfirmDialog/>
        <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="space-y-4 bg-white">
          <SheetHeader>
            <SheetTitle>
                Edit Transaction
            </SheetTitle>
            <SheetDescription>
             Edit an existing Transaction
            </SheetDescription>
          </SheetHeader>
          {isLoading 
          ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin"/>
            </div>
          ):(
          <TransactionForm
          id={id}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          disabled={isPending}
          onDelete={onDelete}
          categoryOptions={categoryOptions}
          onCreateCategory = {onCreatecategory}
          accountOptions = {accountOptions}
          onCreateAccount = {onCreateAccount}
          />
          )}
        </SheetContent>
      </Sheet>
      </>
       
    )
  }