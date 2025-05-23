import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { useNewAccount } from "../hooks/use-new-account"
import { AccountForm } from "./account-form"
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";

const formSchema = insertAccountSchema.pick({
    name: true
})

type formValues = z.input<typeof formSchema>;

  export const NewAccountSheet = ()=>{
const {isOpen, onClose} = useNewAccount()
const mutation = useCreateAccount()

const onSubmit=(values: formValues)=> {
mutation.mutate(values, {
  onSuccess: ()=> {
    onClose();
  }
})
}
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 bg-white dark:bg-slate-900 px-5">
          <SheetHeader>
            <SheetTitle>
                New Account
            </SheetTitle>
            <SheetDescription>
             Create a new acount to track your transactions.
            </SheetDescription>
          </SheetHeader>
          <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
          }}
          />
        </SheetContent>
      </Sheet>
       
    )
  }