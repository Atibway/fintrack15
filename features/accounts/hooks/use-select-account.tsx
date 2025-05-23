"use client"

import { JSX, useRef, useState } from 'react';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { usegetAccounts } from '../api/use-get-accounts';
import { useCreateAccount } from '../api/use-create-account';
import { Select } from '@/components/select';

export const useSelectAccount= (
):[()=> JSX.Element, ()=> Promise<unknown>] => {
  const accountQuery = usegetAccounts();
  const accountMutation = useCreateAccount();
  
  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };
  
  const accountOptions = accountQuery.data?.map((account) => ({
    label: account.name,
    value: account.id,
  })) ?? [];
  

    const [promise, setPromise] = useState<{resolve: (value:string | undefined)=> void} | null>(null)
    const selectValue = useRef<string | undefined>(undefined)

    const confirm =() => new Promise((resolve, reject)=> {
setPromise({resolve})
    }) 
    const handleClose = ()=> {
        setPromise(null)
    }

    const handleConfirm = ()=> {
        promise?.resolve(selectValue.current)
        handleClose()
    }
    const handleCancel = ()=> {
        promise?.resolve(undefined)
        handleClose()
    }
const AccountDialog =()=> (
    <Dialog open={promise !== null} onOpenChange={(open) => !open && handleCancel()}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Select Account
      </DialogTitle>
      <DialogDescription>
        Please select an account to continue
      </DialogDescription>
    </DialogHeader>
    <Select
  placeholder="Select an account"
  options={accountOptions}
  onCreate={onCreateAccount}
  onChange={(value) => {
    selectValue.current = value;
  }}
  disabled={accountQuery.isLoading || accountMutation.isPending}
/>

    <DialogFooter>
      <Button
        type="button"
        onClick={handleCancel}
        variant="outline"
      >
        Cancel
      </Button>
      <Button
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
)

return [AccountDialog, confirm]
};
