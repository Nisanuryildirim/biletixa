"use client";

type CityHeroProps = {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
};

export default function CityHero({
  cities,
  selectedCity,
  onSelectCity,
}: CityHeroProps) {
  const repeatedCities = [
    ...cities,
    ...cities,
    ...cities,
    ...cities,
  ];

  return (
    <section className="relative min-h-[515px] overflow-hidden bg-black text-white">
      {/* Arka plan */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=90"
          alt=""
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-violet-950/25 to-black/75" />
      </div>

      {/* Orta içerik */}
      <div className="relative z-10 mx-auto flex min-h-[390px] max-w-7xl flex-col items-center justify-center px-6 pt-4 text-center">
        <h1 className="text-[44px] font-black leading-[1.05] tracking-tight sm:text-[58px]">
          <span className="bg-gradient-to-r from-fuchsia-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
            Şehrin tadını
          </span>

          <span className="mt-1 block">
            <span className="text-violet-400">
              Biletixa
            </span>
            <span className="text-white">
              &apos;yla çıkar!
            </span>
          </span>
        </h1>

        <button
          type="button"
          className="mt-7 flex items-center gap-3 rounded-full border border-white/80 bg-black/10 px-9 py-4 text-[17px] font-extrabold uppercase backdrop-blur-sm transition hover:bg-white/10"
        >
          <span className="text-violet-400">
            ◉
          </span>

          Şehrini Seç

          <span className="text-violet-400">
            ↗
          </span>
        </button>

        <p className="mt-7 text-[16px] font-medium italic text-white/90">
          Şehrindeki etkinlikleri görmek için bulunduğun şehri seç
        </p>
      </div>

      {/* Otomatik şehir bandı */}
      <div className="absolute bottom-9 left-0 right-0 z-10 overflow-hidden">
        <div className="city-marquee flex w-max items-center gap-5 hover:[animation-play-state:paused]">
          {repeatedCities.map((city, index) => (
            <button
              key={`${city}-${index}`}
              type="button"
              onClick={() => onSelectCity(city)}
              className={`flex min-w-[145px] shrink-0 items-center justify-center gap-3 rounded-full border px-7 py-[14px] text-[16px] font-bold backdrop-blur-sm transition ${
                selectedCity === city
                  ? "border-violet-400 bg-violet-600/30 text-white"
                  : "border-white/80 bg-black/25 text-white hover:border-violet-400"
              }`}
            >
              <span className="h-3.5 w-3.5 rounded-full bg-violet-500" />

              {city}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes cityMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-25%);
          }
        }

        .city-marquee {
          animation: cityMarquee 27s linear infinite;
          will-change: transform;
        }

        @media (max-width: 640px) {
          .city-marquee {
            animation-duration: 19s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .city-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}