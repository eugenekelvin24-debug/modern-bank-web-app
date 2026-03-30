import Skeleton from "./Skeleton";

const OverviewSkeleton = () => {
  return (
    <div className="relative">
      <div className="md:space-y-5 p-2">
        {/* --- HEADER GREETING --- */}
        <section className="hidden md:block mt-1 space-y-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </section>

        {/* --- TOP SECTION: HERO & ANALYTICS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* HERO CARD SKELETON */}
          <div className="bg-slate-800/40 border border-slate-800 p-8 rounded-4xl flex flex-col justify-between w-full">
            <div className="space-y-12">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-7 w-7 rounded-lg" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div>
                  <Skeleton className="h-10 w-48 md:w-64 rounded-xl" />
                  <Skeleton className="h-3 w-32 mt-2 rounded-md" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-1.5 w-full">
                <Skeleton className="h-14 w-full sm:flex-1 rounded-2xl" />
                <Skeleton className="h-14 w-full sm:flex-1 rounded-2xl" />
              </div>
            </div>
          </div>

          {/* ANALYTICS CARD SKELETON */}
          <div className="bg-slate-800/40 border border-slate-800 p-8 rounded-4xl flex flex-col justify-between">
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-5">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>

              <div className="grid grid-cols-2 gap-8 items-center py-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 rounded-md" />
                    <Skeleton className="h-6 w-28 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 rounded-md" />
                    <Skeleton className="h-6 w-28 rounded-md" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center pl-8 border-l border-slate-800">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-3 w-20 mt-4 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: CARDS & TRANSACTIONS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mt-8 lg:mt-0">
          {/* LEFT COLUMN: Card + Quick Transfer */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-24 rounded-md mt-6 md:mt-0" />

              <Skeleton className="aspect-[1.58/1] w-full rounded-4xl" />
            </div>

            <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-4xl flex-1">
              <Skeleton className="h-4 w-32 mb-4 rounded-md" />
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-2 w-8 rounded-md" />
                  </div>
                ))}
              </div>

              <Skeleton className="w-full h-8 mt-6 rounded-xl" />
            </div>
          </div>

          {/* RIGHT COLUMN: RECENT TRANSACTIONS */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-4xl overflow-hidden divide-y divide-slate-800 flex-1 flex flex-col">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 flex-1 min-h-17.5"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 md:w-48 rounded-md" />

                      <Skeleton className="h-2 w-24 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-4 w-20 rounded-md" />

                    <Skeleton className="h-2 w-12 ml-auto rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;
