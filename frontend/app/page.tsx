"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import CityHero from "./components/CityHero";
import FavoriteButton from "./components/FavoriteButton";

import {
  EventApiItem,
  getAllEvents,
} from "./services/eventService";

const cities = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bursa",
  "Eskişehir",
];

export default function Home() {
  const [selectedCity, setSelectedCity] =
    useState("İstanbul");

  const [events, setEvents] =
    useState<EventApiItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const sliderRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  useEffect(() => {
    async function loadEvents() {
      try {
        const data =
          await getAllEvents();

        setEvents(data);
      } catch (error) {
        console.error(error);

        setError(
          "Etkinlikler yüklenemedi."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  function getEventsByCity(
    city: string
  ) {
    return events.filter(
      (event) =>
        event.city === city
    );
  }

  function goToCity(city: string) {
    setSelectedCity(city);

    document
      .getElementById(city)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  function slide(
    city: string,
    direction: "left" | "right"
  ) {
    sliderRefs.current[
      city
    ]?.scrollBy({
      left:
        direction === "right"
          ? 760
          : -760,

      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-[#f4f4f4] text-[#19243a]">
      <CityHero
        cities={cities}
        selectedCity={
          selectedCity
        }
        onSelectCity={goToCity}
      />

      <div className="relative z-20 -mt-2 rounded-t-[28px] bg-white pb-20 pt-10 shadow-[0_-5px_30px_rgba(0,0,0,0.04)] sm:-mt-3 sm:rounded-t-[34px]">
        <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

          {loading && (
            <div className="py-20 text-center">
              <p className="font-bold text-slate-500">
                Etkinlikler yükleniyor...
              </p>
            </div>
          )}

          {error && (
            <div className="py-20 text-center">
              <p className="font-bold text-rose-600">
                {error}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Etkinlik bilgileri
                alınamadı.
              </p>
            </div>
          )}

          {!loading &&
            !error && (
              <div className="space-y-[72px]">
                {cities.map(
                  (
                    city,
                    sectionIndex
                  ) => {
                    const cityEvents =
                      getEventsByCity(
                        city
                      );

                    return (
                      <section
                        key={city}
                        id={city}
                        className="scroll-mt-8"
                      >
                        <div className="mb-8 flex items-center justify-between gap-5">
                          <h2 className="text-[25px] font-black tracking-[-0.8px] text-[#1e2940] sm:text-[31px]">
                            {city}
                            &apos;daki
                            Popüler Etkinlikler
                          </h2>

                          <Link
                            href={`/events?city=${encodeURIComponent(
                              city
                            )}`}
                            className="shrink-0 text-[14px] font-extrabold text-violet-600 transition hover:text-violet-800"
                          >
                            Tümünü Gör →
                          </Link>
                        </div>

                        {cityEvents.length ===
                        0 ? (
                          <div className="rounded-2xl bg-slate-50 p-8 text-center">
                            <p className="text-sm font-semibold text-slate-400">
                              Bu şehir için
                              henüz etkinlik
                              bulunmuyor.
                            </p>
                          </div>
                        ) : (
                          <div className="relative">

                            <button
                              type="button"
                              onClick={() =>
                                slide(
                                  city,
                                  "left"
                                )
                              }
                              aria-label="Önceki etkinlikler"
                              className="absolute -left-5 top-[160px] z-30 hidden h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[30px] font-light text-slate-700 shadow-[0_4px_18px_rgba(0,0,0,0.14)] transition hover:border-violet-600 hover:bg-violet-600 hover:text-white lg:flex"
                            >
                              ‹
                            </button>

                            <div
                              ref={(
                                element
                              ) => {
                                sliderRefs.current[
                                  city
                                ] =
                                  element;
                              }}
                              className="flex snap-x snap-mandatory gap-[22px] overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            >
                              {cityEvents.map(
                                (
                                  event
                                ) => (
                                  <Link
                                    key={
                                      event.id
                                    }
                                    href={`/event/${event.id}`}
                                    className="group w-[205px] shrink-0 snap-start cursor-pointer sm:w-[220px] lg:w-[228px]"
                                  >
                                    <div className="relative aspect-[0.69] overflow-hidden rounded-[12px] bg-slate-200 shadow-[0_3px_12px_rgba(0,0,0,0.08)]">

                                      <img
                                        src={
                                          event.image
                                        }
                                        alt={
                                          event.title
                                        }
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                                      />

                                      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                                      <div className="absolute -bottom-[8px] left-[8px] select-none text-[78px] font-black leading-none tracking-[-8px] text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.55)]">
                                        {
                                          event.rank
                                        }
                                      </div>

                                      <FavoriteButton
                                        eventId={String(
                                          event.id
                                        )}
                                        eventTitle={
                                          event.title
                                        }
                                        eventImage={
                                          event.image
                                        }
                                        eventDate={
                                          event.date
                                        }
                                        venue={
                                          event.venue
                                        }
                                      />
                                    </div>

                                    <div className="px-1 pt-3">
                                      <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-extrabold leading-[21px] text-[#20283a] transition group-hover:text-violet-700">
                                        {
                                          event.title
                                        }
                                      </h3>

                                      <div className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-[#5c6472]">
                                        <span className="text-violet-600">
                                          ●
                                        </span>

                                        <span className="line-clamp-1">
                                          {
                                            event.date
                                          }
                                        </span>
                                      </div>

                                      <div className="mt-1 flex items-start gap-2 text-[12px] text-[#8a8f98]">
                                        <span>
                                          ⌖
                                        </span>

                                        <span className="line-clamp-1">
                                          {
                                            event.venue
                                          }
                                        </span>
                                      </div>

                                      <p
                                        className={`mt-2 text-[14px] font-black ${
                                          event.soon
                                            ? "text-violet-600"
                                            : "text-[#252525]"
                                        }`}
                                      >
                                        {event.soon
                                          ? "YAKINDA"
                                          : event.priceText}
                                      </p>
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                slide(
                                  city,
                                  "right"
                                )
                              }
                              aria-label="Sonraki etkinlikler"
                              className="absolute -right-5 top-[160px] z-30 hidden h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[30px] font-light text-slate-700 shadow-[0_4px_18px_rgba(0,0,0,0.14)] transition hover:border-violet-600 hover:bg-violet-600 hover:text-white lg:flex"
                            >
                              ›
                            </button>
                          </div>
                        )}

                        {sectionIndex !==
                          cities.length -
                            1 && (
                          <div className="mt-[58px] h-px bg-slate-100" />
                        )}
                      </section>
                    );
                  }
                )}
              </div>
            )}
        </div>
      </div>

      <footer className="bg-[#101216] text-white">
        <div className="mx-auto max-w-[1450px] px-6 py-14 sm:px-10">
          <div className="grid gap-10 md:grid-cols-4">

            <div>
              <div className="text-[30px] font-black tracking-[-1.5px]">
                Bilet
                <span className="text-violet-500">
                  ixa
                </span>
              </div>

              <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
                Konser, tiyatro,
                festival, stand-up
                ve daha birçok
                etkinliği keşfet.
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                Etkinlikler
              </h3>

              <div className="mt-4 space-y-3 text-sm text-white/55">
                <p>Konser</p>
                <p>Tiyatro</p>
                <p>Stand-up</p>
                <p>Festival</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold">
                Biletixa
              </h3>

              <div className="mt-4 space-y-3 text-sm text-white/55">
                <p>Hakkımızda</p>
                <p>İletişim</p>
                <p>
                  Sıkça Sorulan
                  Sorular
                </p>
                <p>
                  İşlem Rehberi
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold">
                Hesabım
              </h3>

              <div className="mt-4 space-y-3 text-sm text-white/55">

                <Link
                  href="/login"
                  className="block hover:text-white"
                >
                  Giriş Yap
                </Link>

                <Link
                  href="/register"
                  className="block hover:text-white"
                >
                  Üye Ol
                </Link>

                <Link
                  href="/tickets"
                  className="block hover:text-white"
                >
                  Biletlerim
                </Link>

                <Link
                  href="/favorites"
                  className="block hover:text-white"
                >
                  Favorilerim
                </Link>

              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/35">
            © 2026 Biletixa. Tüm
            hakları saklıdır.
          </div>
        </div>
      </footer>
    </main>
  );
}