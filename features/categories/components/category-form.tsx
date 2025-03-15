"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Trash } from "lucide-react"
import { insertCategoriesSchema } from "@/db/schema"

const formSchema = insertCategoriesSchema.pick({
    name: true
})

type formValues = z.input<typeof formSchema>;

type props = {
id?: string;
defaultValues?: formValues;
onSubmit: (values: formValues)=> void;
onDelete?: ()=> void;
disabled?: boolean;
}

export function CategoryForm({
id,
defaultValues,
onSubmit,
onDelete,
disabled
}:props) {

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
      })

    const handleSubmit =(values: formValues)=> {
onSubmit(values)

    }
    const handleDelete =()=> {
onDelete?.()
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                disabled={disabled}
                 placeholder="e.g. Food, Travel, etc"
                  {...field}
                   />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <Button className="w-full" disabled={disabled}>
  {id ? "Save changes" : "Create category"}
</Button>
{!!id && (
<Button
  type="button"
  disabled={disabled}
  onClick={handleDelete}
  className="w-full "
  variant="outline"
>
  <Trash className="size-4 mr-2" />
  Delete category
</Button>
)}

      </form>
    </Form>
  )
}
