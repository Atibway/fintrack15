"use client";

import React from "react";

const BudgetDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-4">
          {/* Budget Title */}
          <div className="h-10 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-md" />
          {/* Budget Description */}
          <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-600 rounded-md" />
          {/* Meta Info: Created Date and Category */}
          <div className="flex space-x-6">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-md" />
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-md" />
          </div>
        </div>
        {/* Action Buttons Skeleton */}
        <div className="flex space-x-2">
          <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
      </div>

      {/* Graph Circle Skeleton */}
      <div className="flex justify-center">
        <div className="h-56 w-56 md:h-64 md:w-64 rounded-full bg-gray-300 dark:bg-gray-600" />
      </div>

      {/* Budget Items Table Skeleton */}
      <div className="space-y-4">
        {/* Table Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-600 rounded-md" />
          <div className="h-6 w-1/8 bg-gray-300 dark:bg-gray-600 rounded-md" />
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-md" />
        </div>
        {/* Table Row Skeletons */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="h-12 flex-1 bg-gray-200 dark:bg-gray-700 rounded-md" />
            <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md" />
          </div>
        ))}
        {/* Total Row Skeleton */}
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-md" />
      </div>
    </div>
  );
};

export default BudgetDetailSkeleton;
