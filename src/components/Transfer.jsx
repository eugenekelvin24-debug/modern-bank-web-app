import React, { useState } from "react";
import {
  ChevronLeft,
  Search,
  User,
  ChevronRight,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_DATA } from "../Data/user";
import AdSlider from "./AdSlider";
import { Link } from "react-router-dom";

const TransferPage = () => {
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState("");
  const navigate = useNavigate();

  const { transactions } = MOCK_DATA;
  const recents = [...new Set(transactions.map((t) => t.entity))].slice(0, 4);

  return (
    //Navigation
    <div className="relative">
      <div className="mb-5 items-center justify-between flex sticky top-0 md:top-[75px]  z-30">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-400 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
          Transfer to Bank
        </h1>
        <Link 
        to="/transactions"
        className="text-emerald-400 text-xs font-bold tracking-wider hover:opacity-80">
          History
        </Link>
      </div>

      <div className="max-w-2xl mx-auto pb-10 px-4 p-4">
        {/* TOP SECTION: Ads & Activity Status */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="space-y-4">
            <AdSlider />
            <div className="w-full max-w-md mx-auto h-10 flex items-center gap-3 bg-indigo-900/30 rounded-xl px-4">
              <div className="p-1.5 bg-indigo-900/80 rounded-lg flex items-center justify-center">
                <Activity size={12} className="text-indigo-300" />
              </div>
              <p className="text-[11px] md:text-xs font-medium text-indigo-400/80 tracking-wider">
                Free transfers remaining:{" "}
                <span className="text-indigo-400 font-bold">3</span>
              </p>
            </div>
          </div>
        </div>

        {/* STEPS SECTION */}
        <div className="w-full">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* 1. Added 'relative', 'group', and 'overflow-hidden' */}
              <div className="relative group overflow-hidden bg-slate-800/40 border border-slate-800 rounded-[2rem] p-6 space-y-6 min-h-[14.5rem]">
                {/* Background Glows - Ensure these are the first children */}
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <p className="relative z-10 text-sm opacity-70 font-bold text-white tracking-widest px-1">
                  Bank Transfer
                </p>

                <div className="relative z-10">
                  <input
                    type="text"
                    placeholder="Enter 10 digits Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className={`w-full py-3 bg-transparent text-white focus:outline-none transition-all peer ${accountNumber.length > 10 ? "text-red-400" : ""}`}
                  />
                  {/* The Underline Animation */}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-700 transition-all duration-300 peer-focus:h-[2px] peer-focus:bg-indigo-500 peer-focus:shadow-[0_0_15px_#6366f1]"></span>
                  {accountNumber.length > 10 && (
                    <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-red-800 tracking-widest animate-in fade-in slide-in-from-top-1">
                      Enter exactly 10 digit account number
                    </p>
                  )}
                </div>

                <div className="relative z-10 flex justify-between items-center px-1">
                  <button
                    // Logic: Disable if length is not exactly 10
                    disabled={accountNumber.length !== 10}
                    onClick={() => setStep(2)}
                    className={`w-full text-left py-3 flex items-center justify-between transition-all duration-300
    ${
      accountNumber.length === 10
        ? "text-white opacity-100"
        : "text-slate-500 opacity-40 cursor-not-allowed"
    }`}
                  >
                    <span className="font-bold tracking-wide">Select Bank</span>
                    <ChevronRight
                      className={`transition-transform ${accountNumber.length === 10 ? "translate-x-0 opacity-100" : "opacity-20"}`}
                      size={20}
                    />
                  </button>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-slate-700 ${
                      accountNumber.length > 10
                        ? "bg-red-500 shadow-[0_0_10px_#ef4444]"
                        : "bg-slate-700 peer-focus:h-[2px] peer-focus:bg-indigo-500 peer-focus:shadow-[0_0_15px_#6366f1]"
                    }`}
                  ></span>

                  {/* Warning Message */}
                </div>
              </div>

              {/* RECENTS SECTION */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center px-1">
                  <p className="text-xs font-bold text-slate-500 tracking-[0.2em]">
                    Recents
                  </p>
                  <button className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/30 rounded-full">
                    <Search size={16} />
                  </button>
                </div>

                {/* Contact Grid with a bottom fade mask */}
                <div className="relative">
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {recents.map((name, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setAccountNumber("1234567890");
                          setStep(2);
                        }}
                        className="flex justify-between items-center bg-slate-800/30 border border-slate-800/50 p-3 rounded-2xl hover:bg-slate-800 hover:border-slate-700 transition-all group active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner">
                            <User size={18} />
                          </div>
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-white truncate">
                            {name}
                          </span>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-slate-600 group-hover:text-slate-300"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Centered Action Button */}
                <div className="flex justify-center items-center pb-4">
                  <button className="group flex items-center px-5 py-1 bg-slate-800/40 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 rounded-full transition-all active:scale-95">
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-white tracking-widest">
                      View All
                    </span>
                    <ChevronRight
                      size={12}
                      className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in zoom-in-95 duration-300">
              <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 text-center space-y-6">
                <p className="text-slate-400 font-medium uppercase text-xs tracking-widest">
                  Sending to
                </p>
                <p className="text-white font-bold text-xl">
                  {accountNumber || "Direct Transfer"}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-black text-white">$</span>
                  <input
                    autoFocus
                    type="number"
                    placeholder="0"
                    className="bg-transparent text-5xl font-black text-white w-40 focus:outline-none placeholder:text-slate-800"
                  />
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-white text-slate-950 font-black py-5 rounded-2xl text-lg shadow-xl active:scale-95 transition-all"
                >
                  Confirm Transfer
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-500 font-bold text-sm block mx-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="h-24 w-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                <CheckCircle2 size={48} />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tight">
                  Transfer Sent!
                </h2>
                <p className="text-slate-400">Your money is on its way.</p>
              </div>
              <button
                onClick={() => {
                  setStep(1);
                  setAccountNumber("");
                }}
                className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
