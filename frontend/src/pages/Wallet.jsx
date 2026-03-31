import { useEffect, useState } from "react";
import { getAccounts } from "../api/api";
import { Plus, CreditCard, ShieldCheck, PieChart, Settings, Smartphone } from "lucide-react";
import AccountsCard from "../components/AccountsCard";
import WalletsSkeleton from "../Skeletons/WalletsSkeleton";
import Navigation from "../components/Navigation";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Nav = () => (
    <div className="sticky top-0 md:top-18.75 z-20">
      <Navigation
        PageName={"Wallet"}
        PageLink={
          <button className="h-6 w-6 bg-indigo-500 text-white rounded-lg flex items-center justify-center shadow-indigo-500/20 active:scale-90 transition-all">
            <Plus size={16} />
          </button>
        }
      />
    </div>
  );

  useEffect(() => {
    let isMounted = true;
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        const res = await getAccounts();
        if (isMounted) {
          setAccounts(Array.isArray(res.data) ? res.data : []);
        }
      } catch {
        // 
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchAccounts();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    document.title = isLoading ? "Trust Bank | Loading..." : "Trust Bank | Wallet";
  }, [isLoading]);

  if (isLoading || accounts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Nav />
        <div className="max-w-2xl mx-auto p-4">
          <WalletsSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-900">
      <Nav />
      <div className="space-y-4 max-w-2xl mx-auto pb-10 px-4 w-full">
        {/* Accounts Card */}
        <div className="pt-2">
          <AccountsCard accounts={accounts} />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4 mt-5">
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

        {/* Security & Limits Section */}
        <div className="space-y-4">
          <h3 className="text-xs text-slate-300/80 font-bold tracking-widest px-1 ml-2 mt-2">
            Security & Limits
          </h3>

          <div className="bg-slate-800/20 border border-slate-800 rounded-3xl overflow-hidden">
            {[
              { icon: <CreditCard size={18} />, label: "Online Payments", active: true },
              { icon: <PieChart size={18} />, label: "Monthly Limit", value: "$2,000" },
              { icon: <Settings size={18} />, label: "Pin & Security", value: "Manage" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border-b border-slate-800 last:border-b-0 hover:bg-slate-800/40 transition-colors"
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

export default Accounts;