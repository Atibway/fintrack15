import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"

import { AccountForm } from "./account-form"
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertAccountSchema.pick({
    name: true
})

type formValues = z.input<typeof formSchema>;

  export const EditAccountSheet = ()=>{
const {isOpen, onClose, id} = useOpenAccount()
const [ConfirmDialog, confirm] = useConfirm(
  "Are you sure?",
  "You are about to delete this Account"
)

const accountQuery = useGetAccount(id);
const isLoading = accountQuery.isLoading;
const editMutation = useEditAccount(id)
const deleteMutation = useDeleteAccount(id);

const isPending = editMutation.isPending || deleteMutation.isPending

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

const defaultvalues = accountQuery.data? {
  name: accountQuery.data.name
}: {
  name:"",
}

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
                Edit Account
            </SheetTitle>
            <SheetDescription>
             Edit an existing account
            </SheetDescription>
          </SheetHeader>
          {isLoading 
          ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin"/>
            </div>
          ):(
          <AccountForm
          id={id}
          onSubmit={onSubmit}
          disabled={isPending}
          defaultValues={defaultvalues}
          onDelete={onDelete}
          />
          )}
        </SheetContent>
      </Sheet>
      </>
       
    )
  }