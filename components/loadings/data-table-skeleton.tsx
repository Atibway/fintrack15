import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function DataTableSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Search input skeleton */}
      <div className="relative">
        <Skeleton className="h-10 w-full sm:w-1/2 rounded-md" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12">
                <Skeleton className="h-4 w-4 rounded-full" />
              </TableHead>
              <TableHead className="w-2/12">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-full sm:w-16" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-2/12">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-full sm:w-20" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-2/12">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-full sm:w-16" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-2/12">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-full sm:w-20" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-2/12">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-full sm:w-20" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-1/12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="w-1/12">
                  <Skeleton className="h-4 w-4 rounded-full" />
                </TableCell>
                <TableCell className="w-2/12">
                  <Skeleton className="h-4 w-full sm:w-32" />
                </TableCell>
                <TableCell className="w-2/12">
                  <Skeleton className="h-4 w-full sm:w-24" />
                </TableCell>
                <TableCell className="w-2/12">
                  <Skeleton className="h-4 w-full sm:w-28" />
                </TableCell>
                <TableCell className="w-2/12">
                  <div className="flex justify-end">
                    <Skeleton className="h-8 w-full sm:w-20 rounded-full" />
                  </div>
                </TableCell>
                <TableCell className="w-2/12">
                  <Skeleton className="h-4 w-full sm:w-20" />
                </TableCell>
                <TableCell className="w-1/12">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
