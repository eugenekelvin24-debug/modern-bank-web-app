import Skeleton from "./Skeleton";

const TransactionsSkeleton = () => {
  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto p-4 space-y-7 pb-10">
        {/* Search Bar Skeleton */}
        <Skeleton className="w-full h-12 rounded-2xl" />

        {/* Filter Pills Skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Skeleton className="w-10 h-8 rounded-full flex shrink-0" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-25 h-8 rounded-full flex shrink-0 px-4"
            />
          ))}
        </div>

        {/* Transaction Groups Skeleton */}
        <div className="space-y-10">
          {Array.from({ length: 3 }).map((_, groupIndex) => (
            <div key={groupIndex} className="space-y-3">

              <div className="flex justify-between items-end px-1 py-2.5">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>

              {/* Transactions List */}
              <div className="bg-slate-800/20 rounded-4xl border border-slate-800 overflow-hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between p-4">
                      {/* Left */}
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-11 w-11 rounded-full" />

                        <div className="space-y-2">
                          <Skeleton className="w-32 h-4" />
                          <Skeleton className="w-24 h-3" />
                        </div>
                      </div>

                      {/* Right */}
                      <div className="space-y-2 text-right">
                        <Skeleton className="w-20 h-4 ml-auto" />
                        <Skeleton className="w-12 h-3 ml-auto" />
                      </div>
                    </div>

                    {/* Divider */}
                    {i !== 3 && <div className="h-px bg-slate-800/60 mx-4" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsSkeleton;
