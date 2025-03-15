import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"

import { z } from "zod";

import { useConfirm } from "@/hooks/use-confirm";
import { insertCategoriesSchema } from "@/db/schema";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategory } from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { Loader2 } from "lucide-react";
import { CategoryForm } from "./category-form";

const formSchema = insertCategoriesSchema.pick({
    name: true
})

type formValues = z.input<typeof formSchema>;

  export const EditCategorySheet = ()=>{
const {isOpen, onClose, id} = useOpenCategory()
const [ConfirmDialog, confirm] = useConfirm(
  "Are you sure?",
  "You are about to delete this Category"
)

const categoryQuery = useGetCategory(id);
const isLoading = categoryQuery.isLoading;
const editMutation = useEditCategory(id)
const deleteMutation = useDeleteCategory(id);

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

const defaultvalues = categoryQuery.data? {
  name: categoryQuery.data.name
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
                Edit Category
            </SheetTitle>
            <SheetDescription>
             Edit an existing Category
            </SheetDescription>
          </SheetHeader>
          {isLoading 
          ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin"/>
            </div>
          ):(
          <CategoryForm
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