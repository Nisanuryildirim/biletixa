"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import {
  EventApiItem,
  getEventById,
} from "../../services/eventService";

export default function EventPage() {
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const [event, setEvent] =
    useState<EventApiItem | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadEvent() {
      if (!id) {
        setError("Etkinlik bulunamadı.");
        setLoading(false);
        return;
      }

      try {
        const data =
          await getEventById(id);

        setEvent(data);
      } catch (error) {
        console.error(error);

        setError(
          "Etkinlik bilgileri alınamadı."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="font-bold text-slate-500">
          Etkinlik yükleniyor...
        </p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-4xl">
            🎟️
          </div>

          <h1 className="mt-4 text-2xl font-black">
            Etkinlik bulunamadı
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <Link
            href="/events"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 font-black text-white"
          >
            Etkinliklere Dön
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-slate-900">
      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-6 px-6 py-5">
          <Link
            href="/"
            className="text-3xl font-black tracking-[-1.5px]"
          >
            Bilet
            <span className="text-violet-600">
              ixa
            </span>
          </Link>

          <div className="hidden flex-1 px-10 lg:block">
            <input
              placeholder="Etkinlik, mekan veya sanatçı ara..."
              className="mx-auto block w-full max-w-3xl rounded-full border border-slate-200 bg-slate-50 px-6 py-3 outline-none transition focus:border-violet-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50"
            >
              Giriş Yap
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              Üye Ol
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1450px] px-5 py-8 sm:px-8">
        <Link
          href={`/events?city=${encodeURIComponent(
            event.city
          )}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition hover:text-violet-800"
        >
          ← Etkinliklere Dön
        </Link>

        {/* ÜST BÖLÜM */}

        <section className="mt-6 grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <img
              src={event.image}
              alt={event.title}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-700">
                      {event.category}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {event.city}
                    </span>

                    {event.district && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {event.district}
                      </span>
                    )}
                  </div>

                  <h1 className="mt-4 text-3xl font-black tracking-[-0.8px] sm:text-4xl">
                    {event.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="font-black text-amber-500">
                      ★ {event.rating}
                    </span>

                    <span className="text-sm text-slate-500">
                      ({event.reviewCount} değerlendirme)
                    </span>

                    <button
                      type="button"
                      className="text-sm font-bold text-violet-600"
                    >
                      Değerlendir
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Favorilere ekle"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-xl transition hover:border-violet-500 hover:bg-violet-50 hover:text-violet-600"
                >
                  ♡
                </button>
              </div>

              {/* SEANSLAR */}

              <div className="mt-8 space-y-4">
                {event.sessions?.map(
                  (session, index) => (
                    <div
                      key={`${session.date}-${index}`}
                      className="rounded-2xl border border-slate-200 p-5 transition hover:border-violet-300"
                    >
                      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                        <div>
                          <p className="text-lg font-black">
                            {session.date}

                            <span className="mx-2 text-slate-300">
                              •
                            </span>

                            {session.time}
                          </p>

                          <div className="mt-3 flex items-start gap-2">
                            <span className="text-violet-600">
                              ⌖
                            </span>

                            <p className="text-sm font-semibold text-slate-600">
                              {session.venue}
                            </p>
                          </div>

                          <span className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                            {session.ticketType}
                          </span>
                        </div>

                        <div className="md:min-w-[190px] md:text-right">
                          <p className="text-xs text-slate-400">
                            Başlangıç fiyatı
                          </p>

                          <p
                            className={`mt-1 text-xl font-black ${
                              event.soon
                                ? "text-violet-600"
                                : "text-slate-900"
                            }`}
                          >
                            {event.soon
                              ? "YAKINDA"
                              : session.priceText}
                          </p>

                          {event.soon ? (
                            <button
                              type="button"
                              disabled
                              className="mt-4 inline-flex cursor-not-allowed rounded-xl bg-slate-200 px-7 py-3 text-sm font-black text-slate-400"
                            >
                              Yakında
                            </button>
                          ) : (
                            <Link
                              href={`/checkout?event=${event.id}&session=${index}`}
                              className="mt-4 inline-flex rounded-xl bg-violet-600 px-7 py-3 text-sm font-black text-white transition hover:bg-violet-700"
                            >
                              Biletler
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {(!event.sessions ||
                event.sessions.length === 0) && (
                <div className="mt-8 rounded-2xl bg-slate-50 p-6">
                  <p className="font-black">
                    Seans bilgisi bulunamadı.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ALT BÖLÜM */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-black">
                Etkinlik Hakkında
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {event.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {event.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-black">
                Etkinlik Kuralları
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Etkinliğe katılmadan önce aşağıdaki kuralları incele.
              </p>

              <div className="mt-6 space-y-4">
                {event.rules?.map(
                  (rule, index) => (
                    <div
                      key={`${rule}-${index}`}
                      className="flex gap-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-700">
                        {index + 1}
                      </span>

                      <p>{rule}</p>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Sanatçı / Etkinlik
              </p>

              <h3 className="mt-3 text-xl font-black">
                {event.artist}
              </h3>

              <button
                type="button"
                className="mt-5 w-full rounded-xl border border-violet-200 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                Takip Et
              </button>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Organizatör
              </p>

              <h3 className="mt-3 text-lg font-black">
                {event.organizer}
              </h3>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Mekân
              </p>

              <h3 className="mt-3 font-black leading-6">
                {event.venue}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {event.district} • {event.city}
              </p>

              <div className="mt-5 flex h-40 items-center justify-center rounded-xl bg-slate-100">
                <div className="text-center">
                  <p className="text-2xl">
                    ⌖
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-400">
                    Harita Alanı
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-violet-50 p-6">
              <div className="flex gap-3">
                <span className="text-xl">
                  🔒
                </span>

                <div>
                  <h3 className="font-black text-violet-900">
                    Güvenli Bilet
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-violet-700">
                    Biletixa işlemleri güvenli ödeme akışı ile korunur.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <footer className="mt-16 bg-[#101216] text-white">
        <div className="mx-auto max-w-[1450px] px-6 py-12">
          <div className="text-2xl font-black tracking-[-1px]">
            Bilet
            <span className="text-violet-500">
              ixa
            </span>
          </div>

          <p className="mt-3 text-sm text-white/40">
            Sevdiğin etkinlikleri keşfet, biletini güvenle al.
          </p>
        </div>
      </footer>
    </main>
  );
}