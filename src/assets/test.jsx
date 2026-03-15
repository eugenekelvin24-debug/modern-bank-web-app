import React, {useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Coffee,
  Zap,
  Heart,
  Activity,
  ArrowDownLeft,
  Search,
  Filter,
  X,
  ChevronLeft,
} from "lucide-react";

const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [monthlyData, setMonthlyData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Process & Filter Data
  const filteredData = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch =
          tx.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
        const date = new Date(tx.date);
        const monthYear = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        const matchesMonth =
          selectedMonth === "All" || monthYear === selectedMonth;

        return matchesSearch && matchesMonth;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, searchTerm, selectedMonth]);

useEffect(() => {
    const fetchMonthlyTotals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/monthly-totals/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch financial data');
        }

        const data = await response.json();

        // Transform {"2026-03": 4340.53} into [{ month: "2026-03", total: 4340.53 }]
        const formattedArray = Object.entries(data)
          .map(([month, total]) => ({
            month,
            total,
          }))
          // Optional: Sort by date descending
          .sort((a, b) => b.month.localeCompare(a.month));

        setMonthlyData(formattedArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthlyTotals();
  }, []);

  if (isLoading) return <div className="p-8 text-center text-slate-500 text-sm">Loading ledger...</div>;
  if (error) return <div className="p-8 text-center text-red-500 text-sm">Error: {error}</div>;

  const getIcon = (category) => {
    const icons = {
      shopping: <ShoppingBag size={18} />,
      food: <Coffee size={18} />,
      utilities: <Zap size={18} />,
      health: <Heart size={18} />,
      income: <ArrowDownLeft size={18} className="text-emerald-400" />,
    };
    return icons[category?.toLowerCase()] || <Activity size={18} />;
  };

  return (
    <div className="relative">
      <div className="mb-5 items-center justify-between flex sticky top-0 md:top-[75px]  z-30">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-400 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
          Transactions
        </h1>
        <Link 
        to="/analys"
        className="text-emerald-400 text-xs font-bold tracking-wider hover:opacity-80">
          Analys
        </Link>
      </div>

      <div className="space-y-7 max-w-2xl mx-auto pb-10 p-4">
        {/* SEARCH BAR */}
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-slate-800/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* MONTH FILTER PILLS */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allMonths.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider transition-all whitespace-nowrap border ${
                selectedMonth === month
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-indigo-500/20"
                  : "bg-slate-800/30 border border-slate-800/50 text-slate-400 hover:bg-slate-800 hover:border-slate-700"
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        {/* TRANSACTION GROUPS */}
        <div className="space-y-6 w-full">
          {Object.entries(groupedTransactions).map(([month, data]) => (
            <div key={month} className="space-y-4">
              <div className="flex justify-between items-end px-1 sticky top-0 py-2 z-10">
                <h3 className="text-[12px] font-black text-slate-300/80 tracking-[0.2em]">
                  {month}
                </h3>
                <p
                  className={`text-xs font-bold ${data.total >= 0 ? "text-emerald-400" : "text-slate-300"}`}
                >
                  Net: {data.total >= 0 ? "+" : ""}$
                  {data.total.toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                {data.items.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-800 rounded-2xl hover:bg-slate-800/40 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-11 w-11 rounded-full flex items-center justify-center ${tx.type === "credit" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-400"}`}
                      >
                        {getIcon(tx.category)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {tx.entity}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {tx.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-black ${tx.amount > 0 ? "text-emerald-400" : "text-white"}`}
                      >
                        {tx.amount > 0
                          ? `+ $${tx.amount}`
                          : `- $${Math.abs(tx.amount)}`}
                      </p>
                    </div>
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

const Transactions = () => {
  return (
    <div>
      <TransactionList transactions={MOCK_DATA.transactions} />
    </div>
  );
};

export default Transactions;
