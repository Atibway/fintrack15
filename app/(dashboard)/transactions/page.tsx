"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { transactions as transactionSchema } from "@/db/schema"
import { Plus } from "lucide-react"

import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"

import { useState } from "react"
import { ImportCard } from "./ImportCard"
import { UploadButton } from "./UploadButton"
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account"
import { toast } from "sonner"
import { Filters } from "@/components/filters/Filters"
import DataTableSkeleton from "@/components/loadings/data-table-skeleton"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bult-delete-transactions"
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bult-create-transactions"
import { usegetTransactions } from "@/features/transactions/api/use-get-transactions"
import { columns } from "./colums"

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
}

const TransactionsPageComponent = () => {
  const [AccountDialog, confirm] = useSelectAccount()
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log("onUpload triggered", results);
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariant(VARIANTS.LIST)
  }

  const newTransaction = useNewTransaction()
  const deleteTransactions = useBulkDeleteTransactions();
  const createTransactions = useBulkCreateTransactions()
  const transactionsQuery = usegetTransactions()
  const transactions = transactionsQuery.data || []

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

  const onSubmitImport = async (
    values: typeof transactionSchema.$inferInsert[],
  ) => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue.");
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    })
  };


  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-x-2">
              <Skeleton className="h-8 w-full lg:w-20 " />
              <Skeleton className="h-8 w-full lg:w-20 " />
            </div>
          </CardHeader>
          <CardContent>
            <DataTableSkeleton />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    )
  }

  return (
    <div className="pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <Filters />
      </div>
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between flex flex-col items-start">
          <CardTitle className="text-xl line-clamp-1">Transaction History</CardTitle>
          <div className="flex flex-col sm:flex-row gap-y-2 items-center gap-x-2 w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              onClick={newTransaction.onOpen}
              size="sm"
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent className="w-[27rem] sm:w-[40rem] md:w-full " >
    <DataTable
      filterKey="payee"
      columns={columns}
      data={transactions}
      onDelete={(row) => {
        const ids = row.map((r) => r.original.id);
        deleteTransactions.mutate({ ids });
      }}
      disabled={isDisabled}
    />

</CardContent>



      </Card>
   
    </div>
  )
}

export default TransactionsPageComponent
