import React, { useState, useEffect, useMemo } from "react";
import {
  Eye,
  EyeOff,
  Send,
  Download,
  TrendingUp,
  TrendingDown,
  Target,
  CreditCard,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import Greeting from "../components/Greeting";
import { getAccountOverview } from "../api/api";
import { Link } from "react-router-dom";
import OverviewSkeleton from "../Skeletons/OverviewSkeleton";

const Overview = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showBalance, setShowBalance] = useState(true);


  const card = useMemo(() => data?.card_info?.[0] || {}, [data]);
  const transactions = useMemo(() => {
    return data?.transactions || [];
  }, [data]);
  const contacts = useMemo(() => data?.recent_contacts || [], [data]);
  const totalBalance = data?.balance || 0;

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await getAccountOverview();
        setData(res);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    fetchOverview();
  }, []);

  useEffect(() => {
    if (!data) {
      document.title = "Trust Bank | Loading...";
    } else {
      document.title = "Trust Bank | Overview";
    }
  }, [data]);

  // Dynamic Calculations (keeping everything in USD)
  const totalIncome = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "credit")
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "debit")
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const limitPercentage = useMemo(() => {
    if (!totalIncome) return 0;
    return Math.min(100, (totalExpenses / totalIncome) * 100);
  }, [totalIncome, totalExpenses]);

  // Helper for formatting USD
  const formatUSD = (amount) => {
    return (
      "$" +
      Math.abs(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  if (!data) {
    return <OverviewSkeleton />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="relative">
      <div className="md:space-y-8 p-2">
        <section className="hidden md:block mt-1">
          <Greeting name={data?.name || "User"} />
          <div className="text-slate-400 text-sm">
            Here is your account status.
          </div>
        </section>

        {/* --- TOP SECTION: HERO & ANALYTICS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT: HERO CARD (TOTAL BALANCE) */}
          <div className="bg-slate-800/40 border border-slate-800 p-8 rounded-4xl relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-12">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-400 text-sm font-medium tracking-wide">
                      Total Balance
                    </p>
                    <button
                      aria-label="Toggle balance visibility"
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1.5 hover:bg-slate-700/50 rounded-lg text-slate-500 hover:text-white transition-all"
                    >
                      {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <ArrowUpRight size={12} /> +2.5%
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {showBalance ? formatUSD(totalBalance) : "••••••••"}
                  </h2>
                  <p className="text-slate-500 text-[10px] mt-1 font-mono uppercase tracking-widest opacity-60">
                    Verified Portfolio
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.97] shadow-xl shadow-indigo-600/20 group/btn"
                  to={"/transfer"}
                >
                  <Send
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                  Transfer
                </Link>
                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.97] border border-slate-600/30">
                  <Download size={18} /> Request
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: ANALYTICS CARD */}
          <Link to="/analys">
            <div className="bg-slate-800/40 border border-slate-800 p-8 rounded-4xl relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
              <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      Spending Analytics
                    </h3>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                      Monthly Overview
                    </p>
                  </div>
                  <div className="p-2 bg-slate-700/30 rounded-xl text-slate-400 group-hover:text-emerald-400 transition-colors">
                    <TrendingUp size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 items-center py-6">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold uppercase">
                        <TrendingUp size={12} /> Income
                      </div>
                      <p className="text-lg font-bold text-white">
                        {formatUSD(totalIncome)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-rose-400 text-[10px] font-bold uppercase">
                        <TrendingDown size={12} /> Expenses
                      </div>
                      <p className="text-lg font-bold text-white">
                        {formatUSD(totalExpenses)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center border-l border-slate-700/50 pl-8">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-slate-700"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray="251.2"
                          strokeDashoffset={
                            251.2 - (251.2 * limitPercentage) / 100
                          }
                          className="text-indigo-500 transition-all duration-1000 group-hover:stroke-indigo-400"
                        />
                      </svg>
                      <span className="absolute text-lg font-bold text-white">
                        {Number(limitPercentage.toFixed(1))}%
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-4 flex items-center gap-1 text-center">
                      <Target size={12} /> Budget Used
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* --- BOTTOM SECTION: CARDS & CONTACTS (Left) vs TRANSACTIONS (Right) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {/* LEFT COLUMN: Card + Quick Transfer */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mt-6 md:mt-0">
                My Cards
              </h2>
              <Link to={"/wallets"}>
                <div className="bg-linear-to-br from-indigo-600 to-violet-800 p-6 rounded-4xl shadow-2xl aspect-[1.58/1] flex flex-col justify-between text-white relative overflow-hidden group cursor-pointer transition-transform active:scale-95">
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                  <div className="flex justify-between items-start relative z-10">
                    <Wallet size={24} />
                    <span className="italic font-black text-sm tracking-tighter uppercase">
                      {card?.type || "VISA"}
                    </span>
                  </div>
                  <p className="text-lg tracking-[0.2em] font-mono relative z-10">
                    **** **** **** {card?.number}
                  </p>
                  <div className="flex justify-between items-end relative z-10">
                    <div>
                      <p className="text-[8px] uppercase opacity-60 font-bold">
                        Card Holder
                      </p>
                      <p className="text-xs font-bold uppercase">
                        {card?.holder}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] uppercase opacity-60 font-bold">
                        Expiry
                      </p>
                      <p className="text-xs font-bold">{card?.expiry}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-4xl flex-1 group">
              <h3 className="text-sm font-semibold text-white mb-4">
                Quick Transfer
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {contacts.map((contact, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 cursor-pointer group/item"
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-300">
                      {contact.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <p className="text-[10px] text-slate-500">
                      {contact.name?.slice(0, 8)}
                    </p>
                  </div>
                ))}
              </div>
              <Link to={"/transfer"}>
                <button className="w-full mt-6 py-2 border border-slate-700 rounded-xl text-xs text-slate-400 font-medium hover:bg-slate-700/30 transition-all">
                  View All
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: RECENT TRANSACTIONS */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Recent Activity
              </h2>
              <Link
                to={"/Transactions"}
                className="text-xs text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-4xl overflow-hidden divide-y divide-slate-800 flex-1 flex flex-col">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-slate-800/60 transition-colors flex-1 min-h-17.5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {tx.entity}
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase font-medium">
                        {tx.date} {tx.category && `• ${tx.category}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${tx.type === "credit" ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {tx.type === "credit" ? "+" : "-"} {formatUSD(tx.amount)}
                    </p>
                    <p
                      className={`text-[9px] font-bold uppercase tracking-widest ${tx.status === "Pending" ? "text-amber-500" : "text-slate-500"}`}
                    >
                      {tx.status}
                    </p>
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

export default Overview;
