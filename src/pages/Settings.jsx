import React, { useState } from "react";
import {
  Plus,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Shield,
  Smartphone,
  Bell,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { MOCK_DATA } from "../Data/user";

const SettingsPage = () => {
  const { user, accounts } = MOCK_DATA;
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const formatUSD = (amount) => {
    return (
      "$" +
      Math.abs(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  // settings list
  const settingsOptions = [
    {
      label: "Personal Information",
      icon: <User size={18} />,
      color: "text-blue-400",
    },
    {
      label: "Security & Privacy",
      icon: <Shield size={18} />,
      color: "text-emerald-400",
    },
    {
      label: "Linked Devices",
      icon: <Smartphone size={18} />,
      color: "text-purple-400",
    },
    {
      label: "Notifications",
      icon: <Bell size={18} />,
      color: "text-orange-400",
    },
    {
      label: "Card Management",
      icon: <CreditCard size={18} />,
      color: "text-indigo-400",
    },
    {
      label: "Support & Help",
      icon: <HelpCircle size={18} />,
      color: "text-slate-400",
    },
  ];

  return (
    // Navigation
    <div className="relative">
      <div className="mb-5 items-center justify-between flex sticky top-0 md:top-[75px]  z-30">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-400 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={22} />
        </button>

        <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
          Settings
        </h1>

        <Link
          to="/login"
          className="flex items-center gap-2 text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded-xl transition-all active:scale-95"
        >
          <span className="text-xs font-bold hidden md:block tracking-wider">
            Logout
          </span>
          <LogOut size={18} />
        </Link>
      </div>

      <div className="space-y-7 max-w-2xl mx-auto p-3 md:p-6 pb-10 min-h-screen">
        {/* USER PROFILE CARD */}
        <div className="group bg-slate-800/40 border border-slate-800 relative overflow-hidden rounded-[2.5rem] p-6 lg:p-8">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />

          <div className="relative z-10 flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-indigo-400 shadow-inner">
              {user.initials}
            </div>
            <div className="flex flex-col">
              <p className="text-base font-bold text-white tracking-tight uppercase">
                Hi, {user.name}
              </p>
              <p className="text-[10px] text-slate-500 font-bold tracking-[0.1em]">
                Premium Account
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-slate-400 text-xs font-bold tracking-widest opacity-70">
                Total Balance
              </p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-all"
              >
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                {showBalance ? formatUSD(totalBalance) : "••••••••"}
              </h2>
              <p className="text-slate-400 text-[10px] mt-4 font-mono flex items-center gap-2">
                Interest Earned Today
                <span className="text-emerald-400 font-bold">
                  +{formatUSD(0.42)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Settings list mapped */}
        <div className="bg-slate-800/40 border border-slate-800 relative overflow-hidden rounded-[2.5rem] p-4 lg:p-6 space-y-1">
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-[10px] font-black text-slate-500  tracking-[0.2em] px-2 mb-4">
            Account Preferences
          </h3>

          {settingsOptions.map((opt, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-800/60 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${opt.color} p-2 bg-slate-900/50 rounded-xl group-hover:scale-110 transition-transform`}
                >
                  {opt.icon}
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  {opt.label}
                </p>
              </div>
              <ChevronRight
                size={18}
                className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all"
              />
            </div>
          ))}
        </div>

        {/* Version footer */}
        <div className="text-center">
          <p className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">
            App Version 2.0.42
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
