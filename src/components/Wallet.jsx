import React, { useEffect, useState } from "react";
import {
  Plus,
  CreditCard,
  ShieldCheck,
  PieChart,
  Settings,
  Smartphone,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AccountsCard from "./AccountsCard";

const Wallet = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/accounts/");
        if (!res.ok) throw new Error("Failed to fetch accounts");
        const data = await res.json();
        console.log("Fetched accounts:", data);
        setAccounts(data.admin?.accounts || []); // <-- fixed here
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between sticky top-0 md:top-[75px] z-30 bg-slate-900 p-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-slate-400 hover:text-white active:scale-90"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Centered Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-lg md:text-xl font-bold text-white tracking-tight pointer-events-auto">
            Wallets
          </h1>
        </div>

        {/* Plus Button */}
        <button className="h-6 w-6 bg-indigo-500 text-white rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 active:scale-90 transition-all">
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto pb-10 px-4">
        {/* Loading/Error States */}
        {isLoading && (
          <div className="text-center text-slate-400 py-12">
            Loading accounts...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-12">Error: {error}</div>
        )}

        {/* Accounts Swiper */}
        {!isLoading && !error && <AccountsCard accounts={accounts} />}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-[-20px]">
          <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-3 hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="h-10 w-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <ShieldCheck size={20} />
            </div>
            <p className="text-xs font-bold text-white">Freeze Card</p>
          </div>
          <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-3 hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <Smartphone size={20} />
            </div>
            <p className="text-xs font-bold text-white">Apple Pay</p>
          </div>
        </div>

        {/* Security & Limits */}
        <div className="space-y-4">
          <h3 className="text-xs text-slate-300/80 font-bold tracking-widest px-1 space-y-2">
            Security & Limits
          </h3>
          <div className="bg-slate-800/20 border border-slate-800/50 rounded-3xl overflow-hidden">
            {[
              {
                icon: <CreditCard size={18} />,
                label: "Online Payments",
                active: true,
              },
              {
                icon: <PieChart size={18} />,
                label: "Monthly Limit",
                value: "$2,000",
              },
              {
                icon: <Settings size={18} />,
                label: "Pin & Security",
                value: "Manage",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="text-indigo-400">{item.icon}</div>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                <div className="text-xs font-bold text-slate-500">
                  {item.active ? (
                    <div className="h-5 w-10 bg-indigo-500 rounded-full relative">
                      <div className="h-3 w-3 bg-white rounded-full absolute right-1 top-1" />
                    </div>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
