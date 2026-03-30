import Skeleton from "./Skeleton";

const WalletsSkeleton = () => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-10 px-4 w-full">
      {/* Accounts Card Skeleton (Matches Swiper Card) */}
      <div className="w-full flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-[320px]">
          <div className="relative overflow-hidden w-full p-5 bg-slate-800/40 border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col md:h-[185px] h-[182px]">
            <div className="flex justify-between items-start">
              <div className="mt-1">
                <Skeleton className="h-3 w-16 mb-1 rounded-sm" />
                <Skeleton className="h-0.5 w-4 rounded-full" />
              </div>
              <Skeleton className="h-6 w-14 rounded-md" />
            </div>

            <div className="mt-5">
              <Skeleton className="h-3 w-20 mb-2 rounded-sm" />
              <Skeleton className="h-9 w-40 md:h-10 rounded-md" />

              <div className="flex justify-between items-end mb-2">
                <Skeleton className="h-4 w-25 rounded-md mb-1" />
                <Skeleton className="w-10 h-8 rounded-md" />
              </div>

              <div className="flex justify-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-2 w-2 rounded-full opacity-30" />
                <Skeleton className="h-2 w-2 rounded-full opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-4 md:w-[18.5rem]"
          >
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-3 w-18 rounded-md" />
          </div>
        ))}
      </div>

      {/* Security & Limits Skeleton */}
      <div className="space-y-5">
        <Skeleton className="h-3 w-32 ml-3 rounded-md mt-3" />

        <div className="bg-slate-800/20 border border-slate-800 rounded-3xl overflow-hidden">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border-b border-slate-800 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-[18px] w-[18px] rounded-md" />
                <Skeleton className="h-3.5 w-28 rounded-md" />
              </div>
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletsSkeleton;
