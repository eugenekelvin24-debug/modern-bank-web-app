import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Bell, Search, ChevronDown } from "lucide-react";
import { getUser } from "../api/api";

const Header = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUser();
        setData(res);
      } catch (err) {
        console.error("Error fetching Data:", err);
      }
    };

    fetchUserData();
  }, []);

  // Primary navigation for the app
  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Transfer", path: "/transfer" },
    { name: "Wallets", path: "/wallets" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="md:block hidden sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR: Context & Utilities */}
        <div className="flex h-16 items-center justify-between">
          <div className="ml-2 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="font-bold text-white text-lg">T</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
                TRUSTBANK
              </span>
            </div>
            <div className="hidden md:block w-px bg-slate-800" />
          </div>

          {/* Search, Notifications, Profile */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-40 lg:w-72 bg-slate-800/40 rounded-full py-2 pl-10 pr-4 text-xs 
                 border border-slate-700/50 focus:border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10
                 transition-all placeholder:text-slate-500"
              />
            </div>

            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </button>

            <div className="flex items-center gap-2 pl-2 ml-2 border-l border-slate-800 group cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400">
                {data?.initials}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[11px] font-semibold text-white leading-none">
                  {data?.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {data?.account_type}
                </p>
              </div>
              <ChevronDown
                size={14}
                className="text-slate-500 group-hover:text-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Primary Navigation */}
        <div className="flex items-center gap-4 h-full">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative flex h-full items-center px-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "text-slate-50"
                      : "text-slate-400 hover:text-slate-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Link Text */}
                    {link.name}

                    {/* Active Underline */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-t-full shadow-[0_-4px_10px_rgba(99,102,241,0.4)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
