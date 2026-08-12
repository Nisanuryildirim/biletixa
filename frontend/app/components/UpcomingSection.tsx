import EventCard from "./EventCard";

const upcomingEvents = [
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    title: "Summer Beats",
    category: "Festival",
    location: "Antalya Açıkhava",
    date: "18 Eylül 2026",
    price: "650 TL'den başlayan",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    title: "Rock Night",
    category: "Konser",
    location: "İzmir Arena",
    date: "24 Eylül 2026",
    price: "540 TL'den başlayan",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    title: "Komedi Kulübü",
    category: "Stand-up",
    location: "Bursa Merinos AKKM",
    date: "30 Eylül 2026",
    price: "320 TL'den başlayan",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80",
    title: "Romeo ve Juliet",
    category: "Tiyatro",
    location: "Ankara Devlet Tiyatrosu",
    date: "5 Ekim 2026",
    price: "450 TL'den başlayan",
  },
];

export default function UpcomingSection() {
  return (
    <section className="bg-slate-100 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-violet-600">
              Yakında
            </span>

            <h2 className="mt-2 text-3xl font-bold">
              Yaklaşan Etkinlikler
            </h2>

            <p className="mt-2 text-slate-500">
              Önümüzdeki haftalarda gerçekleşecek etkinlikleri kaçırma.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl border border-violet-300 bg-white px-5 py-3 font-semibold text-violet-700 hover:bg-violet-50"
          >
            Takvimi Gör
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {upcomingEvents.map((event) => (
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