import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    title: "Neon Nights Festival",
    category: "Festival",
    location: "KüçükÇiftlik Park, İstanbul",
    date: "22 Ağustos 2026",
    price: "750 TL’den başlayan",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80",
    title: "Yıldızların Altında Konser",
    category: "Konser",
    location: "CerModern, Ankara",
    date: "29 Ağustos 2026",
    price: "500 TL’den başlayan",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
    title: "Bir Yaz Gecesi Rüyası",
    category: "Tiyatro",
    location: "Zorlu PSM, İstanbul",
    date: "5 Eylül 2026",
    price: "420 TL’den başlayan",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80",
    title: "Kahkaha Gecesi",
    category: "Stand-up",
    location: "Bostanlı Suat Taşer, İzmir",
    date: "12 Eylül 2026",
    price: "350 TL’den başlayan",
  },
];

export default function EventSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-violet-600">
              En çok ilgi görenler
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Popüler Etkinlikler
            </h2>

            <p className="mt-2 text-slate-500">
              Şehrindeki en sevilen konser, festival, tiyatro ve
              stand-up etkinliklerini keşfet.
            </p>
          </div>

          <button className="w-fit rounded-xl border border-violet-200 bg-white px-5 py-3 font-semibold text-violet-700 transition hover:bg-violet-50">
            Tüm Etkinlikleri Gör
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image}
              title={event.title}
              category={event.category}
              location={event.location}
              date={event.date}
              price={event.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}