import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TransactionsChartSkeleton() {
  return (
    <Card className="w-full bg-background/5 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
        <Skeleton className="h-8 w-48" />
        </CardTitle>
        <Skeleton className="h-9 w-32 rounded-md" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-[16/9] w-full">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <div className="mt-4 flex justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-12" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function CategoriesPieChartSkeleton() {
  return (
    <Card className="w-full bg-background/5 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
        <Skeleton className="h-8 w-48" />
        </CardTitle>
        <Skeleton className="h-9 w-32 rounded-md" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="relative mx-auto aspect-square w-3/4 max-w-[240px]">
          <Skeleton className="absolute h-full w-full rounded-full" />
          <Skeleton className="absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
      </CardContent>
        <div className="mt-8 items-start ml-3 mb-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-x-2 mb-3">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className=" h-4 w-10" />
             
            </div>
          ))}
        </div>
    </Card>
  )
}

export function ChartsDashboardSkeleton() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <TransactionsChartSkeleton />
      <CategoriesPieChartSkeleton />
    </div>
  )
}

