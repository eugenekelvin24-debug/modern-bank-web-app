import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const colorMap = {
  Savings: "from-blue-500 to-indigo-600",
  Checking: "from-purple-500 to-pink-500",
  Investment: "from-gray-500 to-gray-700",
  default: "from-slate-500 to-slate-700",
};

const AccountsCard = ({ accounts }) => {
  if (!accounts.length) return <p className="text-white text-center">No accounts found</p>;

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full max-w-[320px]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {accounts.map((account) => {
            const gradient = colorMap[account.type] || colorMap.default;
            return (
              <SwiperSlide key={account.id} className="rounded-2xl">
                <div
                  className={`relative overflow-hidden h-full w-full p-5 bg-linear-to-br ${gradient} text-white flex flex-col justify-between rounded-2xl shadow-2xl border border-white/10`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-70">
                        {account.type}
                      </p>
                      <div className="h-0.5 w-4 bg-white/30 rounded-full" />
                    </div>
                    <span className="italic font-black text-xl tracking-tighter opacity-90">
                      {account.brand || "VISA"}
                    </span>
                  </div>

                  <div className="mt-2">
                    <p className="text-[10px] font-bold tracking-wider opacity-80 mb-1">
                      Card Balance
                    </p>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                      ${account.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h3>
                  </div>

                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-mono tracking-[0.15em] opacity-90">
                      •••• {account.lastFour || "1234"}
                    </span>
                    <div className="w-10 h-8 bg-linear-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-md shadow-inner opacity-90 relative overflow-hidden">
                      <div className="absolute inset-0 border-[0.5px] border-black/10 rounded-md" />
                      <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-black/10" />
                      <div className="absolute left-1/2 top-0 h-full w-[0.5px] bg-black/10" />
                    </div>
                  </div>
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
