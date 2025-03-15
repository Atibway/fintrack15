"use client"

import { useEffect } from "react";
import { useCurrencyModel } from "@/hooks/use-currency-modal";

export const  CheckingCurrency = ()=> {
  
        const onOpen = useCurrencyModel((state) => state.onOpen);
        const isOpen = useCurrencyModel((state) => state.isOpen);
        
        useEffect(() => {
          if (!isOpen) {
            onOpen();
          }
        }, [isOpen, onOpen]);
  
  return null
}
