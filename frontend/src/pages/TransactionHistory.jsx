import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getTransactions } from "../api/api";
import TransactionsSkeleton from "../Skeletons/TransactionsSkeleton";
import Navigation from "../components/Navigation";
import {
  ShoppingBag,
  Coffee,
  Zap,
  Heart,
  Activity,
  ArrowDownLeft,
  Search,
  X,
} from "lucide-react";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAmountColor = (tx) => {
    const status = tx.status.toLowerCase();
    if (status === "pending") return "text-yellow-400";
    if (status === "failed") return "text-red-400";
    return tx.amount > 0 ? "text-emerald-400" : "text-red-400";
  };

  const Nav = () => {
    return (
      <div className="sticky top-0 md:top-18.75 z-20">
        <Navigation
          PageName={"Transactions"}
          PageLink={
            <Link
              to="/analytics"
              className="text-emerald-400 text-xs font-bold tracking-wider hover:opacity-80"
            >
              Analys
            </Link>
          }
        />
      </div>
    );
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchTransactions = async () => {
        setIsLoading(true);

        try {
          const res = await getTransactions(searchTerm);
          const data = res.data;
          console.log("API response:", res.data);

          setTransactions(data.transactions || []);
          setMonthlyTotals(data.monthly_totals || {});
        } catch {
          setError("Failed to fetch transactions");
        } finally {
          setIsLoading(false);
        }
      };

      fetchTransactions();
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm]);
  console.log("Search term sent:", searchTerm);

  // Month filter pills
  const allMonths = useMemo(() => {
    const months = Object.keys(monthlyTotals)
      .map((key) => {
        const [year, month] = key.split("-");
        const date = new Date(`${year}-${month}-01`);
        return date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      })
      .sort((a, b) => new Date(b) - new Date(a));

    return ["All", ...months];
  }, [monthlyTotals]);

  // Filter and group transactions by month
  const groupedTransactions = useMemo(() => {
    const filtered = transactions.filter((tx) => {
      const date = new Date(tx.date);

      const month = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      const matchesMonth = selectedMonth === "All" || month === selectedMonth;

      return matchesMonth;
    });

    return filtered.reduce((acc, tx) => {
      const date = new Date(tx.date);

      const monthKey = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!acc[monthKey]) {
        const isoKey = date.toISOString().slice(0, 7);
        acc[monthKey] = { items: [], total: monthlyTotals[isoKey] || 0 };
      }

      acc[monthKey].items.push(tx);
      return acc;
    }, {});
  }, [transactions, selectedMonth, monthlyTotals]);

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

  useEffect(() => {
    if (isLoading) {
      document.title = "Trust Bank | Loading...";
    } else {
      document.title = "Trust Bank | Transaction History";
    }
  }, [isLoading]);

if (isLoading || (transactions.length === 0 && !searchTerm)) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Nav />
        <div className="max-w-2xl mx-auto p-4">
          <TransactionsSkeleton />
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="p-8 text-center text-red-500 text-sm">Error: {error}</div>
    );

  return (
    <div className="relative">
      <Nav />
      <div className="space-y-7 max-w-2xl mx-auto pb-10 p-4">
        {/* Search Bar */}
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
            size={18}
          />
          <input
            autoFocus
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

        {/* Month Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
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

        {/* Transaction Groups */}
        <div className="w-full space-y-10">
          {Object.entries(groupedTransactions).map(([month, data]) => (
            <div key={month} className="space-y-3">
              <div className="top-0 z-10 px-1 py-2 flex justify-between items-end">
                <h3 className="text-[11px] font-black text-slate-400 tracking-[0.25em] uppercase">
                  {month}
                </h3>

                <p
                  className={`text-xs font-bold ${
                    data.total >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  Net: {(data.total || 0) >= 0 ? "+" : ""}
                  {(data.total || 0).toLocaleString()}
                </p>
              </div>

              {/* TRANSACTIONS CONTAINER */}
              <div className="bg-slate-800/20 rounded-4xl border border-slate-800 overflow-hidden">
                {data.items.map((tx, index) => (
                  <div key={index}>
                    {/* TRANSACTION ROW */}
                    <div className="flex items-center justify-between p-4 hover:bg-slate-800/40 transition-all">
                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-11 w-11 rounded-full flex items-center justify-center ${
                            tx.type === "credit"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {getIcon(tx.category)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {tx.entity}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {tx.date} • {tx.category}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="text-right">
                        <p
                          className={`text-sm font-black ${getAmountColor(tx)}`}
                        >
                          {tx.amount > 0
                            ? `+ $${tx.amount}`
                            : `- $${Math.abs(tx.amount)}`}
                        </p>

                        <p
                          className={`text-[10px] font-bold tracking-widest ${
                            tx.status === "Pending"
                              ? "text-amber-400 animate-pulse"
                              : "text-slate-500"
                          }`}
                        >
                          {tx.status}
                        </p>
                      </div>
                    </div>

                    {/* TRANSACTION DIVIDER */}
                    {index !== data.items.length - 1 && (
                      <div className="h-px bg-slate-800/60 mx-4" />
                    )}
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

export default TransactionsPage;
