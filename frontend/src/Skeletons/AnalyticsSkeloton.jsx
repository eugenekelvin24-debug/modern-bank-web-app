import React from "react";
import { ChevronLeft } from "lucide-react";
import Skeleton from "./Skeleton";

const AnalyticsSkeleton = () => {
  return (
    <div className="min-h-screen text-slate-200 pb-20 mb-2">
      <div className="max-w-2xl mx-auto space-y-5 px-4">
        {/* TOP STATS SKELETON */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-[2.5rem] p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Skeleton className="h-10 w-10 rounded-2xl" />
              <Skeleton className="h-3 w-20 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
            <div className="space-y-4 border-l border-slate-800 pl-6">
              <Skeleton className="h-10 w-10 rounded-2xl" />
              <Skeleton className="h-3 w-20 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
        </div>

        {/* PROJECTED SAVINGS SKELETON */}
        <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem] p-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-3">
              <Skeleton className="h-3 w-32 rounded-md" />
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
            <div className="text-left md:text-right space-y-2">
              <Skeleton className="h-10 w-32 md:ml-auto rounded-xl" />
              <Skeleton className="h-3 w-16 md:ml-auto rounded-md" />
            </div>
          </div>
          {/* Mocking the animated bars */}
          <div className="mt-8 flex items-end gap-1 h-10">
            {[60, 40, 70, 50, 80, 45, 90, 65, 85, 55].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-slate-800/50 rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* BUDGET SLIDER SKELETON */}
        <div className="bg-slate-800/20 border border-slate-800 rounded-4xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-32 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          <Skeleton className="w-full h-2 rounded-full" />
          <Skeleton className="w-full h-3 rounded-full" />
        </div>

        {/* SPENDING BREAKDOWN SKELETON */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 ml-2 rounded-md" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-800/40 border border-slate-800 p-5 rounded-3xl flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-2.5 w-32 rounded-md" />
                </div>
              </div>
              <div className="space-y-2 text-right">
                <Skeleton className="h-4 w-16 ml-auto rounded-md" />
                <Skeleton className="h-2.5 w-10 ml-auto rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;