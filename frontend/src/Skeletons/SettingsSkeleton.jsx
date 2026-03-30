import Skeleton from "./Skeleton";

const SettingsSkeleton = () => {
  return (
    <div className="relative">

      <div className="space-y-7 max-w-2xl mx-auto p-3 md:p-6 pb-9 min-h-screen w-full">
        
        {/* User Profile Card Skeleton */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-[2.5rem] p-6 lg:p-8 space-y-8">

          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-2 w-20 rounded-md" />
            </div>
          </div>

          <div className="space-y-4.5 md:space-y-5">
            <Skeleton className="h-3 w-24 rounded-md" />
            <Skeleton className="h-10 w-48 md:w-64 rounded-xl" />
            <Skeleton className="h-2 w-40 rounded-md mt-4" />
          </div>
        </div>

        {/* Settings List Skeleton */}
        <div className="space-y-5">
          <Skeleton className="h-3 w-36 ml-5 rounded-md" />
          
          <div className="bg-slate-800/20 border border-slate-800 rounded-3xl overflow-hidden ">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border-b border-slate-800 last:border-0"
              >
                <div className="flex items-center gap-4">
     
                  <Skeleton className="h-9 w-9 rounded-xl" />
   
                  <Skeleton className="h-4 w-32 rounded-md" />
                </div>

                <Skeleton className="h-4 w-4 rounded-md mr-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-center pt-4">
          <Skeleton className="h-2 w-28 rounded-md opacity-40" />
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeleton;