import React, { useEffect, useState } from "react";
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
import { userSummary } from "../api/api";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import SettingsSkeleton from "../Skeletons/SettingsSkeleton";

const SettingsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  const formatUSD = (amount) => {
    return (
      "$" +
      Math.abs(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const Nav = () => {
    return (
      <div className="sticky top-0 md:top-18.75 z-20">
        <Navigation
          PageName={"Settings"}
          PageLink={
            <Link
              to="/login"
              className="flex items-center gap-2 text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded-xl transition-all active:scale-95"
            >
              <span className="text-xs font-bold hidden md:block tracking-wider">
                Logout
              </span>
              <LogOut size={18} />
            </Link>
          }
        />
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userSummary();

        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) {
      document.title = "Trust Bank | Loading...";
    } else {
      document.title = "Trust Bank | Settings";
    }
  }, [loading]);

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

  if (loading || !data) {
    return (
      <>
        <Nav />
        <SettingsSkeleton />
      </>
    );
  }

  return (
    <div className="relative">
      <Nav />

      <div className="space-y-7 max-w-2xl mx-auto p-3 md:p-6 pb-5 min-h-screen">
        {/* USER PROFILE CARD */}
        <div className="group bg-slate-800/40 border border-slate-800 relative overflow-hidden rounded-[2.5rem] p-6 lg:p-8">
          <div className="absolute -left-30 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
          <div className="absolute -right-40 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />

          <div className="relative z-10 flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-indigo-400 shadow-inner">
              {data.initials}
            </div>
            <div className="flex flex-col">
              <p className="text-base font-bold text-white tracking-tight">
                Hi, {data.name}
              </p>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest">
                {data?.account_type}
              </p>
            </div>
          </div>

          <div className="relative z-10">
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
                {showBalance ? formatUSD(data?.total_balance || 0) : "••••••••"}
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
        <h3 className="text-xs text-slate-300/80 font-bold tracking-widest px-1 mb-4 ml-5">
          Account Preferences
        </h3>
        <div className="bg-slate-800/20 border border-slate-800 relative overflow-hidden rounded-3xl">
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          {settingsOptions.map((opt, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition-colors cursor-pointer group space-y-1"
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
