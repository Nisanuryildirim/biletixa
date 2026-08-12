"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  EventApiItem,
  getAllEvents,
} from "../services/eventService";

const categories = [
  "Tümü",
  "Konser",
  "Tiyatro",
  "Stand-up",
  "Festival",
];

const cities = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bursa",
  "Eskişehir",
];

function EventsContent() {
  const searchParams = useSearchParams();

  const cityFromUrl =
    searchParams.get("city") || "İstanbul";

  const validCity = cities.includes(cityFromUrl)
    ? cityFromUrl
    : "İstanbul";

  const [events, setEvents] = useState<EventApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCity, setSelectedCity] =
    useState(validCity);

  const [selectedCategory, setSelectedCategory] =
    useState("Tümü");

  const [search, setSearch] = useState("");
  const [venueSearch, setVenueSearch] = useState("");

  const [selectedVenues, setSelectedVenues] =
    useState<string[]>([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [campaignOnly, setCampaignOnly] =
    useState(false);

  const [soonOnly, setSoonOnly] =
    useState(false);

  const [sort, setSort] =
    useState("Öne Çıkanlar");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
        setError("Etkinlikler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const cityEvents = useMemo(() => {
    return events.filter(
      (event) => event.city === selectedCity
    );
  }, [events, selectedCity]);

  const cityVenues = useMemo(() => {
    const venueMap = new Map<string, number>();

    cityEvents.forEach((event) => {
      venueMap.set(
        event.venue,
        (venueMap.get(event.venue) ?? 0) + 1
      );
    });

    return Array.from(venueMap.entries())
      .map(([venue, count]) => ({
        venue,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [cityEvents]);

  const visibleVenues = useMemo(() => {
    const normalized = venueSearch
      .trim()
      .toLocaleLowerCase("tr-TR");

    if (!normalized) {
      return cityVenues;
    }

    return cityVenues.filter((item) =>
      item.venue
        .toLocaleLowerCase("tr-TR")
        .includes(normalized)
    );
  }, [venueSearch, cityVenues]);

  const filteredEvents = useMemo(() => {
    let result = cityEvents.filter((event) => {
      const normalizedSearch = search
        .trim()
        .toLocaleLowerCase("tr-TR");

      const matchesSearch =
        normalizedSearch === "" ||
        event.title
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedSearch) ||
        event.artist
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedSearch) ||
        event.venue
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Tümü" ||
        event.category === selectedCategory;

      const matchesVenue =
        selectedVenues.length === 0 ||
        selectedVenues.includes(event.venue);

      const matchesMin =
        minPrice === "" ||
        event.price >= Number(minPrice);

      const matchesMax =
        maxPrice === "" ||
        event.price <= Number(maxPrice);

      const matchesCampaign =
        !campaignOnly || event.campaign === true;

      const matchesSoon =
        !soonOnly || event.soon === true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesVenue &&
        matchesMin &&
        matchesMax &&
        matchesCampaign &&
        matchesSoon
      );
    });

    if (sort === "Fiyat: Artan") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "Fiyat: Azalan") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "En Yüksek Puan") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [
    cityEvents,
    search,
    selectedCategory,
    selectedVenues,
    minPrice,
    maxPrice,
    campaignOnly,
    soonOnly,
    sort,
  ]);

  const bestSellers = useMemo(() => {
    return [...cityEvents]
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10);
  }, [cityEvents]);

  function toggleVenue(venue: string) {
    setSelectedVenues((current) =>
      current.includes(venue)
        ? current.filter((item) => item !== venue)
        : [...current, venue]
    );
  }

  function clearFilters() {
    setSelectedCategory("Tümü");
    setSearch("");
    setVenueSearch("");
    setSelectedVenues([]);
    setMinPrice("");
    setMaxPrice("");
    setCampaignOnly(false);
    setSoonOnly(false);
    setSort("Öne Çıkanlar");
  }

  function changeCity(city: string) {
    setSelectedCity(city);
    clearFilters();

    window.history.replaceState(
      {},
      "",
      `/events?city=${encodeURIComponent(city)}`
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="font-bold text-slate-500">
          Etkinlikler yükleniyor...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <p className="font-black text-rose-600">
            {error}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Event Service 8081 portunda çalışıyor mu kontrol et.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#20283a]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1450px] items-center gap-6 px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="shrink-0 text-[29px] font-black tracking-[-1.5px]"
          >
            Bilet
            <span className="text-violet-600">
              ixa
            </span>
          </Link>

          <div className="relative hidden flex-1 lg:block">
            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Etkinlik, mekan, sanatçı ara..."
              className="w-full rounded-full border border-slate-200 bg-[#f7f7f7] px-5 py-3 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <Link
            href="/login"
            className="ml-auto text-sm font-bold"
          >
            Giriş Yap
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white"
          >
            Üye Ol
          </Link>
        </div>

        <div className="border-t border-slate-100">
          <div className="mx-auto flex max-w-[1450px] gap-7 overflow-x-auto px-5 py-3 text-sm font-bold sm:px-8">
            <button
              type="button"
              onClick={() =>
                setSelectedCategory("Tümü")
              }
              className={
                selectedCategory === "Tümü"
                  ? "text-violet-600"
                  : "text-slate-600"
              }
            >
              Trendler
            </button>

            {categories
              .filter((item) => item !== "Tümü")
              .map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={
                    selectedCategory === category
                      ? "text-violet-600"
                      : "text-slate-600"
                  }
                >
                  {category}
                </button>
              ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1450px] px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="text-3xl font-black sm:text-[38px]">
              {selectedCity} Etkinlikleri
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {selectedCity}&apos;daki etkinlikleri keşfet.
            </p>
          </div>

          <select
            value={selectedCity}
            onChange={(event) =>
              changeCity(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold"
          >
            {cities.map((city) => (
              <option
                key={city}
                value={city}
              >
                {city}
              </option>
            ))}
          </select>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[22px] bg-[#161616] px-6 py-7 text-white">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">
            Biletixa Trend
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Günün En Çok Satanları
          </h2>

          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {bestSellers.map((event, index) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="flex min-w-[245px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
              >
                <span className="text-[48px] font-black text-violet-400">
                  {index + 1}
                </span>

                <div>
                  <p className="text-sm font-black">
                    {event.title}
                  </p>

                  <p className="mt-2 text-xs text-white/45">
                    {event.venue}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[285px_1fr]">
          <aside>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black">
                  Filtreler
                </h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-black text-violet-600"
                >
                  Temizle
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-black">
                  Kategori
                </h3>

                <div className="mt-3 space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(category)
                      }
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                        selectedCategory === category
                          ? "bg-violet-50 text-violet-700"
                          : "text-slate-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="text-sm font-black">
                  Fiyat Aralığı
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <input
                    value={minPrice}
                    onChange={(event) =>
                      setMinPrice(event.target.value)
                    }
                    type="number"
                    placeholder="Min"
                    className="rounded-xl border px-3 py-3 text-sm"
                  />

                  <input
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(event.target.value)
                    }
                    type="number"
                    placeholder="Max"
                    className="rounded-xl border px-3 py-3 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="text-sm font-black">
                  Mekan
                </h3>

                <input
                  value={venueSearch}
                  onChange={(event) =>
                    setVenueSearch(event.target.value)
                  }
                  placeholder="Mekan ara..."
                  className="mt-3 w-full rounded-xl border px-4 py-3 text-sm"
                />

                <div className="mt-4 max-h-[220px] space-y-3 overflow-y-auto">
                  {visibleVenues.map((item) => (
                    <label
                      key={item.venue}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedVenues.includes(
                            item.venue
                          )}
                          onChange={() =>
                            toggleVenue(item.venue)
                          }
                        />

                        <span>
                          {item.venue}
                        </span>
                      </div>

                      <span className="text-xs text-slate-400">
                        {item.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={soonOnly}
                    onChange={(event) =>
                      setSoonOnly(event.target.checked)
                    }
                  />
                  Yakında Satışta
                </label>

                <label className="mt-4 flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={campaignOnly}
                    onChange={(event) =>
                      setCampaignOnly(event.target.checked)
                    }
                  />
                  Kampanyalı
                </label>
              </div>
            </div>
          </aside>

          <section>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Öne Çıkanlar
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {filteredEvents.length} etkinlik bulundu
                </p>
              </div>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="rounded-xl border bg-white px-4 py-3 text-sm font-bold"
              >
                <option>
                  Öne Çıkanlar
                </option>
                <option>
                  Fiyat: Artan
                </option>
                <option>
                  Fiyat: Azalan
                </option>
                <option>
                  En Yüksek Puan
                </option>
              </select>
            </div>

            <div className="mt-7 grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/event/${event.id}`}
                  className="group"
                >
                  <div className="relative aspect-[0.76] overflow-hidden rounded-[14px] bg-slate-200">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                    />

                    {event.campaign && (
                      <span className="absolute bottom-3 left-3 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-black text-white">
                        Kampanyalı
                      </span>
                    )}

                    {event.soon && (
                      <span className="absolute bottom-3 left-3 rounded-lg bg-black px-3 py-1.5 text-xs font-black text-white">
                        Yakında
                      </span>
                    )}
                  </div>

                  <div className="px-1 pt-4">
                    <h3 className="text-[16px] font-black">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-[13px] font-semibold text-slate-600">
                      {event.date}
                    </p>

                    <p className="mt-1 text-[12px] text-slate-400">
                      {event.venue}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {event.district} • {event.city}
                    </p>

                    <p className="mt-3 text-[14px] font-black">
                      {event.soon
                        ? "YAKINDA"
                        : event.priceText}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
          <p className="font-bold text-slate-500">
            Etkinlikler yükleniyor...
          </p>
        </main>
      }
    >
      <EventsContent />
    </Suspense>
  );
}