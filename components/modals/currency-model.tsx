"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";
import { useState } from "react";
import { Model } from "./modal";
import { useCurrencyModel } from "@/hooks/use-currency-modal";
import { toast } from "sonner";
import { useEditCurrency } from "@/hooks/useupdatecurrency";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CurrencySelector } from "../CurrencySelector";


const formSchema = z.object({
  currency: z.string().min(1),
});

export const StoreModel = () => {
  const user = useCurrentUser()
  const currencyModel = useCurrencyModel();
  const editMutation = useEditCurrency(user?.id)
  const [loading, setLoading] = useState(false);
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        editMutation.mutate(values, {
            onSuccess: ()=> {
              currencyModel.onClose()
            }
          })

    //   window.location.assign(`/${response.data.id}`);
     
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Model
      title="Assign Currency"
      description="Select a new Currency to manage your Finances"
      isOpen={currencyModel.isOpen}
      onClose={currencyModel.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="currency"
                render={() => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                    <CurrencySelector/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  disabled={loading}
                  variant={"destructive"}
                  onClick={currencyModel.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Model>
  );
};