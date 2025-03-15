"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {  Plus } from "lucide-react"
import { columns} from "./colums"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { useBulkDeleteCategories } from "@/features/categories/api/use-bult-delete-categories"
import { usegetCategories } from "@/features/categories/api/use-get-categories"
import DataTableSkeleton from "@/components/loadings/data-table-skeleton"




const CategoriesPage = () => {
    const newCategory = useNewCategory()
    const deleteCategories = useBulkDeleteCategories();
    const categoriesQuery = usegetCategories()
    const categories = categoriesQuery.data || []

    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending

    if(categoriesQuery.isLoading){
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
    <div className="max-w-screen-2xl mx-auto w-full pb-10">
    <Card className="border-none drop-shadow-sm">
    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
      <CardTitle className="text-xl line-clamp-1">Categories page</CardTitle>
      <Button
      onClick={newCategory.onOpen}
       size="sm" className="">
        <Plus className="size-4 mr-2" />
        Add new
      </Button>
    </CardHeader>
    <CardContent>
    <DataTable
     filterKey="name" 
     columns={columns} 
     data={categories} 
     onDelete={(row)=> {
      const ids = row.map((r)=> r.original.id)
      deleteCategories.mutate({ids})
     }}
     disabled={isDisabled}
     />
    </CardContent>
  </Card>
    </div>
  
  )
}

export default CategoriesPage