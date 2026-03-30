import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowUpRight,
  Settings,
  Activity
} from "lucide-react";

const MobileNav = () => {
  const location = useLocation();

 const navLinks = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/" },
    { name: "Transactions", icon: <Activity />, path: "/transactions" },
    { name: "Transfer", icon: <ArrowUpRight />, path: "/transfer" },
    { name: "Wallets", icon: <Wallet />, path: "/wallets" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
  ];
  
  return ( 
    <nav className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-lg border-t border-white/5 px-2 pb-safe-area pt-3 flex justify-around items-end z-50 md:hidden">
      {navLinks.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 min-w-16 transition-all duration-200 active:scale-90 ${
              isActive ? "text-bank-yellow" : "text-gray-500"
            }`}
          >
            {/* Icon Wrapper with bounce effect if active */}
            <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-bank-yellow/10" : ""}`}>
              {item.icon}
            </div>
            
            {/* Label */}
            <span className={`text-[10px] font-semibold tracking-wide transition-opacity ${
                isActive ? "opacity-100" : "opacity-70"
            }`}>
              {item.name}
            </span>

            {/* Active Indicator Dot */}
            <div className={`w-1 h-1 rounded-full bg-bank-yellow transition-all duration-300 ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`} />
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;