export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-600 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            Türkiye’nin etkinlik platformu
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Eğlenceye açılan kapın:
            <span className="block text-yellow-300">Biletixa</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-violet-100">
            Konser, festival, tiyatro, stand-up ve daha birçok etkinliği
            keşfet. Biletini hızlıca al, eğlenceyi kaçırma.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50">
              Etkinlikleri Keşfet
            </button>

            <button className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Kampanyaları Gör
            </button>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold">250+</p>
              <p className="text-sm text-violet-200">Etkinlik</p>
            </div>

            <div>
              <p className="text-2xl font-bold">40+</p>
              <p className="text-sm text-violet-200">Şehir</p>
            </div>

            <div>
              <p className="text-2xl font-bold">100K+</p>
              <p className="text-sm text-violet-200">Kullanıcı</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-yellow-300/30 blur-3xl" />
          <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-fuchsia-300/30 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-slate-950/40 p-6">
              <p className="text-sm font-medium text-violet-200">
                Haftanın öne çıkan etkinliği
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                Neon Nights Festival
              </h3>

              <p className="mt-3 text-violet-100">
                Canlı müzik, DJ performansları ve unutulmaz bir gece.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <p>📅 22 Ağustos 2026</p>
                <p>📍 KüçükÇiftlik Park, İstanbul</p>
                <p>🎟️ 750 TL’den başlayan fiyatlarla</p>
              </div>

              <button className="mt-8 w-full rounded-xl bg-yellow-300 px-5 py-3 font-bold text-slate-900 transition hover:bg-yellow-200">
                Bilet Al
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}