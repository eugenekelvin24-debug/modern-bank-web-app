import Skeleton from "./Skeleton";

const TransferSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto pb-10 px-4 w-full">
      {/* TOP SECTION SKELETON (AdSlider + Indicator) */}
      <div className="mb-6 space-y-4">
        <div className="relative w-full max-w-md mx-auto h-28 md:h-40">
          <Skeleton className="w-full h-full rounded-4xl" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full opacity-30" />
            <Skeleton className="h-2 w-2 rounded-full opacity-30" />
          </div>
        </div>

        {/* Free Transfers Indicator */}
        <div className="w-full max-w-md mx-auto">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>

      {/* STEP CONTENT SKELETON */}
      <div className="space-y-4">
        <div className="bg-slate-800/40 border border-slate-800 rounded-4xl p-6 space-y-6 min-h-58">
          <Skeleton className="h-4 w-28 rounded-md" />
          <div className="relative pt-2">
            <Skeleton className="h-8 w-3/4 rounded-md mb-2" />
            <Skeleton className="w-full h-px" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
        </div>

        {/* RECENTS SECTION */}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between items-center px-1 mb-2">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          {/* Contact List Container */}
          <div className="bg-slate-800/20 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div
                key={i}
                className="w-full flex justify-between items-center p-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-4 w-4 rounded-md" />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-4">
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferSkeleton;
