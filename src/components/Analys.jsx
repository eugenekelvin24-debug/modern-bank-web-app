import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Target,
  ArrowUpRight,
  ShoppingBag,
  Coffee,
  Zap,
  Play,
  DollarSign,
  Layers,
  Tv,
  Fuel,
  Car,
  ShoppingCart,
  Home,
  Activity,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_DATA } from "../Data/user";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { transactions } = MOCK_DATA;

  // State for the interactive budget goal
  const [budgetLimit, setBudgetLimit] = useState(4000);

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "debit")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const categories = transactions
      .filter((t) => t.type === "debit")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const sortedCategories = Object.entries(categories)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);

    return { income, expenses, sortedCategories };
  }, [transactions]);

  const limitPercentage = Math.min(
    Math.round((stats.expenses / budgetLimit) * 100),
    100,
  );

  const getIcon = (cat) => {
    const icons = {
      Shopping: <ShoppingBag size={18} />,
      "Food & Drink": <Coffee size={18} />,
      Transport: <Fuel size={18} />,
      Groceries: <ShoppingCart size={18} />,
      Housing: <Home size={18} />,
      Subscription: <Layers size={18} />,
      Entertainment: <Play size={18} />,
    };
    return icons[cat] || <Activity size={18} />;
  };

  return (
    <div className="min-h-screen text-slate-200 p-6 pb-20">
      {/* HEADER */}
      <div className="relative mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 z-20 text-slate-400 active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-lg font-bold text-white tracking-tight">
            Financial Analysis
          </h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* TOP STATS: FLOW CARD */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-[2.5rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px]" />

          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-10 w-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Total Income
                </p>
                <h2 className="text-2xl font-bold text-white mt-1">
                  ${stats.income.toLocaleString()}
                </h2>
              </div>
            </div>

            <div className="space-y-4 border-l border-slate-800 pl-6">
              <div className="h-10 w-10 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400">
                <TrendingDown size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Total Spent
                </p>
                <h2 className="text-2xl font-bold text-white mt-1">
                  ${stats.expenses.toLocaleString()}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTED SAVINGS CARD */}
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group transition-all hover:bg-indigo-600/15">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <Target size={14} /> 2026 Forecast
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Projected Yearly Savings
              </h3>
              <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed">
                Current net flow:{" "}
                <span className="text-emerald-400 font-bold">
                  ${(stats.income - stats.expenses).toLocaleString()} /mo
                </span>
              </p>
            </div>

            <div className="text-left md:text-right">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter transition-all">
                ${((stats.income - stats.expenses) * 10).toLocaleString()}
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">
                Est. Dec 31
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-end gap-1 h-10">
            {[30, 45, 35, 60, 75, 70, 90, 85, 95, 100].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-indigo-500/40 rounded-t-sm group-hover:bg-indigo-500 transition-all duration-500"
                style={{ height: `${height}%`, transitionDelay: `${i * 30}ms` }}
              />
            ))}
          </div>
        </div>

        {/* INTERACTIVE BUDGET SLIDER */}
        <div className="bg-slate-800/20 border border-slate-800 rounded-[2rem] p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Adjust Budget Limit
              </h3>
              <Info size={14} className="text-slate-600" />
            </div>
            <p className="text-lg font-bold text-white font-mono">
              ${budgetLimit.toLocaleString()}
            </p>
          </div>

          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="pt-2 border-t border-slate-800/50">
            <div className="flex justify-between items-end mb-3">
              <p className="text-[10px] font-black text-slate-500">
                Monthly Capacity Used
              </p>
              <p
                className={`text-xs font-black transition-colors ${limitPercentage > 90 ? "text-rose-400" : "text-indigo-400"}`}
              >
                {limitPercentage}%
              </p>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${limitPercentage > 90 ? "bg-rose-500" : "bg-gradient-to-r from-indigo-600 to-indigo-400"}`}
                style={{ width: `${limitPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* SPENDING BY CATEGORY */}
        <div className="space-y-4">
          <h3 className="text-[12px] font-black text-slate-500 px-2">
            Spending Breakdown
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {stats.sortedCategories.slice(0, 5).map((cat, i) => (
              <div
                key={i}
                className="bg-slate-800/40 border border-slate-800 p-5 rounded-3xl flex items-center justify-between group hover:bg-slate-800 transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-slate-900/50 rounded-2xl flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-110 transition-transform">
                    {getIcon(cat.name)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{cat.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Outflow this month
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">
                    -${cat.amount.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">
                    {Math.round((cat.amount / stats.expenses) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
