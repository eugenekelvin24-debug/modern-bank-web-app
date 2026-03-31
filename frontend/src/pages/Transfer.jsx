import { useState, useEffect, useRef } from "react";
import { recentContacts } from "../api/api";
import {
  Search,
  User,
  ChevronRight,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import TransferSkeleton from "../Skeletons/TransferSkeleton";
import AdSlider from "../components/AdSlider";
import api from "../api/api";

const TransferPage = () => {
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [recents, setRecents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const debounceRef = useRef(null);

  const fetchContacts = async (query = "") => {
    try {
      const data = await recentContacts(query);
      setRecents(data);
      setInitialLoading(false);
    } catch (err) {
      console.log(err);
      setInitialLoading(false);
    }
  };
  useEffect(() => {
    fetchContacts("");
  }, []);

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearch("");
    fetchContacts("");
  };

  useEffect(() => {
    if (initialLoading) {
      document.title = "Trust Bank | Loading...";
    } else {
      document.title = "Trust Bank | Send Money";
    }
  }, [initialLoading]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // clear previous timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // set new timer
    debounceRef.current = setTimeout(() => {
      fetchContacts(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const Nav = () => {
    return (
      <div className="sticky top-0 md:top-18.75 z-20">
        <Navigation
          PageName={"Transfer to Bank"}
          PageLink={
            <Link
              className="text-emerald-400 text-xs font-bold tracking-wider hover:opacity-80"
              to="/transactions"
            >
              History
            </Link>
          }
        />
      </div>
    );
  };

  const visibleRecents = showAll ? recents.slice(0, 10) : recents.slice(0, 5);

  const handleConfirmTransfer = async () => {
    if (!accountNumber || !amount) {
      setError("Enter account number and amount");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/transfer", {
        accountNumber,
        amount: parseFloat(amount),
      });

      if (res.status === 200 || res.status === 201) {
        setStep(3);
        setAmount("");
      } else {
        setError(res.data?.error || "Transfer failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading || (recents.length === 0 && step === 1)) {
    return (
      <div className="relative min-h-screen bg-slate-900">
        <Nav />
        <div className="max-w-2xl mx-auto p-4">
          <TransferSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Nav />
      <div className="max-w-2xl mx-auto pb-10 px-4">
        {/* TOP SECTION */}
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

        {/* STEP CONTENT */}
        {/* STEP 1 */}
        <div className="w-full">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* ACCOUNT INPUT */}
              <div className="relative group overflow-hidden bg-slate-800/40 border border-slate-800 rounded-4xl p-6 space-y-6 min-h-58">
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
                    className={`w-full py-3 bg-transparent text-white focus:outline-none transition-all peer ${
                      accountNumber.length > 10 ? "text-red-400" : ""
                    }`}
                  />
                  <span className="absolute bottom-0 left-0 w-full h-px bg-slate-700 transition-all duration-300 peer-focus:h-0.5 peer-focus:bg-indigo-500 opacity-70 peer-focus:shadow-[0_0_15px_#6366f1]"></span>
                  {accountNumber.length > 10 && (
                    <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-red-800 tracking-widest animate-in fade-in slide-in-from-top-1">
                      Enter exactly 10 digit account number
                    </p>
                  )}
                </div>

                <div className="relative z-10 flex justify-between items-center px-1">
                  <button
                    disabled={accountNumber.length !== 10}
                    onClick={() => setStep(2)}
                    className={`w-full text-left py-3 flex items-center justify-between transition-all duration-300 ${
                      accountNumber.length === 10
                        ? "text-white opacity-100"
                        : "text-slate-500 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <span className="font-bold tracking-wide">Select Bank</span>
                    <ChevronRight
                      className={`transition-transform ${
                        accountNumber.length === 10
                          ? "translate-x-0 opacity-100"
                          : "opacity-20"
                      }`}
                      size={20}
                    />
                  </button>
                </div>
              </div>

              {/* RECENTS SECTION */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between items-center px-1 mb-2">
                  <p className="text-xs font-bold text-slate-500 tracking-[0.2em]">
                    Recents
                  </p>

                  {/* SEARCH */}
                  {!searchOpen ? (
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="p-2 text-slate-400 hover:text-white bg-slate-800/30 rounded-full transition-all"
                    >
                      <Search size={16} />
                    </button>
                  ) : (
                    <div className="relative">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search contacts..."
                        value={search}
                        onChange={handleSearch}
                        className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg focus:outline-none w-32 md:w-40 transition-all"
                      />
                      {search ? (
                        <button
                          onClick={() => {
                            setSearch("");
                            fetchContacts("");
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                          x
                        </button>
                      ) : (
                        <button
                          onClick={handleCloseSearch}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
                        >
                          <span className="md:hidden font-bold">X</span>
                          <span className="hidden md:block">cancel</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* CONTACT LIST */}
                <div className="bg-slate-800/20 rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300 flex flex-col">
                  {visibleRecents.length === 0 && !loading && (
                    <p className="text-slate-500 text-sm px-4 py-3">
                      No matching contacts
                    </p>
                  )}

                  {visibleRecents.map((acc, i) => (
                    <div
                      key={i}
                      className="transition-all duration-300 ease-in-out"
                    >
                      <button
                        onClick={() => {
                          setAccountNumber(acc.account_number);
                          setStep(2);
                        }}
                        className="w-full flex justify-between items-center p-4 hover:bg-slate-800/40 active:scale-[0.98] text-left"
                      >
                        {/* LEFT */}
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-700/40 border border-slate-700 flex items-center justify-center text-slate-400">
                            <User size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white opacity-80">
                              {acc.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {acc.account_number}
                            </p>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <ChevronRight size={16} className="text-slate-500" />
                      </button>

                      {/* SEPARATOR */}
                      {i !== visibleRecents.length - 1 && (
                        <div className="h-px bg-slate-800 w-full"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* VIEW ALL / SHOW LESS BUTTON */}
                {recents.length > 5 && (
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="text-indigo-400 text-xs font-bold"
                    >
                      {showAll ? "Show Less" : "View All"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: TRANSFER */}
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-5xl font-black text-white w-40 focus:outline-none placeholder:text-slate-800"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleConfirmTransfer}
                  disabled={loading}
                  className="w-full bg-white text-slate-950 font-black py-5 rounded-2xl text-lg shadow-xl active:scale-95 transition-all"
                >
                  {loading ? "Processing..." : "Confirm Transfer"}
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

          {/* STEP 3: SUCCESS */}
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
                  setAmount("");
                  setError("");
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
