import { MOCK_DATA } from "../Data/user";
import { Bell, Headphones } from "lucide-react";

const { user } = MOCK_DATA;

const Mobileheader = () => {
  return (
    // justify-between spreads the two main divs to the far edges
    // items-center keeps them vertically aligned
    <div className="flex items-center justify-between w-full py-4 px-2 md:hidden">
      
      {/* LEFT: Profile Section */}
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-indigo-400 shadow-inner">
          {user.initials}
        </div>
        <div className="flex flex-col">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest leading-none">Hi,</p>
          <p className="text-sm font-bold text-white tracking-tight">{user.name.split(' ')[0]}</p>
        </div>
      </div> 
     
      {/* RIGHT: Action Icons */}
      <div className="flex items-center">
        <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full transition-all active:scale-90">
          <Headphones size={20} />
        </button>

        <button className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full transition-all active:scale-90">
          <Bell size={20} />
          {/* Notification Dot */}
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-emerald-500 rounded-full border-2 border-slate-950" />
        </button>
      </div>
    </div>
  );
};
 
export default Mobileheader;