import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const AdSlider = () => {
  const ads = [
    { id: 1, img: "/TrustBankAd1.png", color: "from-blue-600 to-indigo-900" },
    { id: 2, img: "/TrustBankAd2.png", color: "from-emerald-600 to-teal-900" },
    { id: 3, img: "/TrustBankAd3.png", color: "from-purple-600 to-pink-900" },
  ];

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true} // Makes the slide cycle infinitely
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-28 md:h-40"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div
              className={`relative w-full h-full bg-gradient-to-br ${ad.color} flex items-center p-6 text-white`}
            >
              <div className="absolute right-0 top-0 h-full w-full flex justify-end">
                <img
                  src={ad.img}
                  alt="Ad"
                  className="absolute right-0 top-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdSlider;
