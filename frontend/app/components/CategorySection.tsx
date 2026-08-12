const categories = [
  {
    icon: "🎵",
    title: "Konser",
    description: "Sevdiğin sanatçıları canlı dinle.",
  },
  {
    icon: "🎪",
    title: "Festival",
    description: "Müzik ve eğlence dolu günler.",
  },
  {
    icon: "🎭",
    title: "Tiyatro",
    description: "Sahnenin büyüsünü keşfet.",
  },
  {
    icon: "🎤",
    title: "Stand-up",
    description: "Kahkaha dolu gösterilere katıl.",
  },
  {
    icon: "🧒",
    title: "Çocuk",
    description: "Çocuklara özel eğlenceli aktiviteler.",
  },
  {
    icon: "🎨",
    title: "Workshop",
    description: "Yeni beceriler kazan ve üret.",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-600">
            İlgi alanını seç
          </span>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Etkinlik Kategorileri
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Konserden tiyatroya, festivalden workshoplara kadar sana
            uygun etkinlikleri kolayca keşfet.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.title}
              type="button"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-3xl transition group-hover:bg-violet-600">
                {category.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {category.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {category.description}
              </p>

              <span className="mt-5 inline-block font-semibold text-violet-700">
                Etkinlikleri Gör →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
