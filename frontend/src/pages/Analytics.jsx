import { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Target,
  ShoppingBag,
  Coffee,
  Play,
  Layers,
  Fuel,
  ShoppingCart,
  Home,
  Activity,
} from "lucide-react";
import { getAnalytics } from "../api/api";
import AnalyticsSkeleton from "../Skeletons/AnalyticsSkeloton";
import { useNavigate } from "react-router-dom";

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [budgetLimit, setBudgetLimit] = useState(() => {
    const saved = localStorage.getItem("budgetLimit");
    return saved ? Number(saved) : 4000;
  });

  const navigate = useNavigate();

  const Nav = ({ onBack }) => (
    <div className="flex items-center justify-between sticky top-0 md:top-18.75 z-30 bg-slate-900 p-4 mb-5">
      <button
        onClick={onBack}
        className="p-2 text-slate-400 hover:text-white active:scale-90"
      >
        <ChevronLeft size={22} />
      </button>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
          Spending Analytics
        </h1>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (loading) {
      document.title = "Trust Bank | Loading...";
    } else {
      document.title = "Trust Bank | Analytics";
    }
  }, [loading]);

  useEffect(() => {
    localStorage.setItem("budgetLimit", budgetLimit);
  }, [budgetLimit]);

  const income = data?.income || 0;
  const expenses = data?.expenses || 0;
  const netFlow = data?.net_flow || income - expenses;

  const limitPercentage = Math.min(
    Math.round((expenses / budgetLimit) * 100),
    100,
  );

  // convert backend categories → array
  const sortedCategories = useMemo(() => {
    return Object.entries(data?.categories || {})
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [data]);

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

  if (loading) {
    return (
      <>
        <Nav />
        <AnalyticsSkeleton />
      </>
    );
  }

  if (!data) {
    return <div className="p-8 text-white">No data found</div>;
  }

  return (
    <div className="min-h-screen text-slate-200 p-2 pb-20 mb-2">
      {/* HEADER */}
      <Nav title="Spending Analytics" onBack={() => navigate(-1)} />
      <div className="max-w-2xl mx-auto space-y-6">
        {/* TOP STATS */}
        <div className="relative bg-slate-800/40 border border-slate-800 rounded-[2.5rem] p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px]" />

          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-10 w-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <TrendingUp size={20} />
              </div>

              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Total Income
              </p>
              <h2
                className={`text-2xl font-bold transition-colors ${
                  expenses > budgetLimit
                    ? "text-rose-500 animate-pulse"
                    : "text-white"
                }`}
              >
                ${expenses.toLocaleString()}
              </h2>
            </div>

            <div className="space-y-4 border-l border-slate-800 pl-6">
              <div className="h-10 w-10 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400">
                <TrendingDown size={20} />
              </div>

              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Total Spent
              </p>

              <h2 className="text-2xl font-bold text-white">
                ${expenses.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* PROJECTED SAVINGS */}
        <div className="relative bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8 overflow-hidden group hover:bg-indigo-600/15 transition">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <Target size={14} /> 2026 Forecast
              </div>

              <h3 className="text-xl font-bold text-white mt-2">
                Projected Yearly Savings
              </h3>

              <p className="text-xs text-slate-400 mt-2">
                Net flow:{" "}
                <span className="text-emerald-400 font-bold">
                  ${netFlow.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="text-left md:text-right">
              <h2 className="text-4xl font-black text-white">
                ${(netFlow * 10).toLocaleString()}
              </h2>
              <p className="text-[10px] text-slate-500 uppercase mt-1">
                Est. Dec 31
              </p>
            </div>
          </div>

          {/* animated bars */}
          <div className="mt-8 flex items-end gap-1 h-10">
            {[30, 45, 35, 60, 75, 70, 90, 85, 95, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-indigo-500/40 rounded-t-sm group-hover:bg-indigo-500 transition-all duration-500"
                style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}
              />
            ))}
          </div>
        </div>

        {/* BUDGET SLIDER */}
        <div className="bg-slate-800/20 border border-slate-800 rounded-4xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-400tracking-widest">
              Adjust Budget Limit
            </h3>

            <p className="font-bold text-white">
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
            className="w-full accent-indigo-500"
          />

          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                limitPercentage > 90 ? "bg-rose-500" : "bg-indigo-500"
              }`}
              style={{ width: `${limitPercentage}%` }}
            />
          </div>
        </div>

        {/* SPENDING BREAKDOWN */}
        <div className="space-y-4">
          <h3 className="text-[12px] font-black text-slate-500 px-2">
            Spending Breakdown
          </h3>

          {sortedCategories.slice(0, 5).map((cat, i) => (
            <div
              key={i}
              className="bg-slate-800/40 border border-slate-800 p-5 rounded-3xl flex justify-between items-center hover:bg-slate-800 transition cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-slate-900/50 rounded-2xl flex items-center justify-center text-indigo-400">
                  {getIcon(cat.name)}
                </div>

                <div>
                  <p className="font-bold text-white">{cat.name}</p>
                  <p className="text-[10px] text-slate-500">
                    Outflow this month
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-black text-white">
                  -${cat.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-emerald-400">
                  {expenses ? Math.round((cat.amount / expenses) * 100) : 0}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
