import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const AccountsCard = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.log("Error fetching acccounts:", err));
  });

  const colorMap = {
    Checking: "from-blue-600 to-indigo-700",
    Savings: "from-emerald-500 to-teal-700",
    Credit: "from-slate-800 to-slate-900",
    default: "from-gray-600 to-gray-800",
  };

  return (
    <div className="w-full flex justify-center items-center py-5 px-4">
      <div className="w-full max-w-[320px]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {accounts.map(account => {
            const gradient = colorMap[account.type] || colorMap.default;

            return (
              <SwiperSlide key={account.id} className="rounded-2xl">
                <div
                  className={`relative overflow-hidden h-full w-full p-5 bg-gradient-to-br ${gradient} text-white flex flex-col justify-between rounded-2xl shadow-2xl border border-white/10`}
                >
                  {/* 1. TOP SECTION: Brand and Type */}
                  <div className="relative z-10 flex justify-between items-start ">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-70">
                        {accounts.type}
                      </p>
                      {/* Added a small decorative line for premium feel */}
                      <div className="h-[2px] w-4 bg-white/30 rounded-full" />
                    </div>
                    <span className="italic font-black text-xl tracking-tighter opacity-90">
                      VISA
                    </span>
                  </div>

                  {/* 2. MIDDLE SECTION: The Big Numbers */}
                  <div className="relative z-10 mt-2">
                    <p className="text-[10px]  font-bold tracking-wider opacity-80 mb-1">
                      Card Balance
                    </p>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                      $
                      {account.balance?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </h3>
                  </div>

                  {/* 3. BOTTOM SECTION: Numbers and Chip */}
                  <div className="relative z-10 flex justify-between items-end mb-2">
                    <div className="space-y-1">
                      <span className="text-sm font-mono tracking-[0.15em] opacity-90">
                        •••• {account.lastFour || "1234"}
                      </span>
                    </div>

                    {/* EMV CHIP: Added more detail with internal lines */}
                    <div className="w-10 h-8 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-md shadow-inner opacity-90 relative overflow-hidden">
                      <div className="absolute inset-0 border-[0.5px] border-black/10 rounded-md" />
                      <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-black/10" />
                      <div className="absolute left-1/2 top-0 h-full w-[0.5px] bg-black/10" />
                    </div>
                  </div>

                  {/* Background Decorative Gloss (The "Secret Sauce") */}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default AccountsCard;
