"use client"
import { ChartsDashboardSkeleton } from '@/components/loadings/chart-skeletons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';



const DataCardLoading = () => {
  return (
    <Card className="borer-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="shrink-0 h-10 w-24 mb-2" />
        <Skeleton className="shrink-0 h-4 w-40" />
      </CardContent>
    </Card>
  );
};

const LoadingPage = () => {
  return (
    <div>
      <div className='flex gap-x-2'>
      <Skeleton className="shrink-0 h-10 w-32 mb-2" />
      <Skeleton className="shrink-0 h-10 w-32 mb-2" />
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      <DataCardLoading />
      <DataCardLoading />
      <DataCardLoading />
    </div>
      <div >
             <ChartsDashboardSkeleton/>
            </div>
    </div>
  );
};

export default LoadingPage;
