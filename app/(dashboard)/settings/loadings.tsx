

export const EditingLoading = () => {
  return (
    <div className="md:col-span-2">
  <div className="glass rounded-xl overflow-hidden mb-6 animate-slide-up">
    <div className="p-5 border-b border-border flex items-center space-x-3">
      <div className="h-5 w-5 bg-gray-300 dark:bg-slate-900 rounded-full animate-pulse"></div>
      <div className="h-5 w-1/3 bg-gray-300 dark:bg-slate-900 rounded-md animate-pulse"></div>
    </div>
    <div className="p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-12 bg-gray-300 dark:bg-slate-900 rounded-md animate-pulse"></div>
        <div className="h-12 bg-gray-300 dark:bg-slate-900 rounded-md animate-pulse"></div>
        <div className="h-12 bg-gray-300 dark:bg-slate-900 rounded-md animate-pulse"></div>
      </div>
      <div className="h-10 bg-gray-300 dark:bg-slate-900 rounded-md animate-pulse mt-2"></div>
    </div>
  </div>
{/* 
  <div className="glass rounded-xl overflow-hidden mb-6 animate-slide-up animation-delay-1">
    <div className="p-5 border-b border-border flex items-center space-x-3">
      <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse"></div>
      <div className="h-5 w-1/3 bg-gray-300 rounded-md animate-pulse"></div>
    </div>
    <div className="p-5 divide-y divide-border">
      <div className="py-3 space-y-2">
        <div className="h-4 w-1/4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-3 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="py-3 space-y-2">
        <div className="h-4 w-1/4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-3 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="py-3 space-y-2">
        <div className="h-4 w-1/4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-3 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  </div> */}
</div>

  )
}
