import React from "react";

const BudgetIndexSkeleton = () => {
  return (
    <div className="p-6">
      {/* Page Title Skeleton */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="h-5 w-32 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-8 w-96 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-4 w-80 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-44 bg-gray-300 rounded-md animate-pulse"></div>
      </div>

      {/* Budget Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-white shadow-md animate-pulse"
            >
              <div className="h-5 w-16 bg-gray-300 rounded-md"></div>
              <div className="h-6 w-24 bg-gray-400 rounded-md mt-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded-md mt-2"></div>
              <div className="h-6 w-32 bg-gray-300 rounded-md mt-4"></div>
              <div className="h-4 w-24 bg-gray-200 rounded-md mt-2"></div>
              <div className="h-4 w-20 bg-gray-300 rounded-md mt-4"></div>
            </div>
          ))}
      </div>
    </div>
  );
};



export default BudgetIndexSkeleton
