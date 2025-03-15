"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { Plus } from "lucide-react"
import { columns} from "./colums"
import { DataTable } from "@/components/data-table"
import { usegetAccounts } from "@/features/accounts/api/use-get-accounts"
import { Skeleton } from "@/components/ui/skeleton"
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bult-delete-acounts"
import DataTableSkeleton from "@/components/loadings/data-table-skeleton"


const AccountsPageComponet = () => {
    const newAccount = useNewAccount()
    const deleteAccounts = useBulkDeleteAccounts();
    const accountsQuery = usegetAccounts()
    const accounts = accountsQuery.data || []

    const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending

    if(accountsQuery.isLoading){
return (
  <div className="max-w-screen-2xl mx-auto w-full pb-10 ">
    <Card className="border-none drop-shadow-sm">
    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
      <Skeleton className="h-8 w-48"/>
      <Skeleton className="h-8 w-full lg:w-20 "/>
    </CardHeader>
    <CardContent>
       <DataTableSkeleton/>
    </CardContent>
    </Card>
  </div>
)
    }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 ">
    <Card className="border-none drop-shadow-sm">
    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
      <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
      <Button
      onClick={newAccount.onOpen}
       size="sm" className="">
        <Plus className="size-4 mr-2" />
        Add new
      </Button>
    </CardHeader>
    <CardContent>
    <DataTable
     filterKey="name" 
     columns={columns} 
     data={accounts} 
     onDelete={(row)=> {
      const ids = row.map((r)=> r.original.id)
      deleteAccounts.mutate({ids})
     }}
     disabled={isDisabled}
     />
    </CardContent>
  </Card>
    </div>
  
  )
}

export default AccountsPageComponet