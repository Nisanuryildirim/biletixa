"use client";

import { useEffect, useState } from "react";

import {
  EventApiItem,
  getAllEvents,
} from "../services/eventService";

export default function ApiTestPage() {
  const [events, setEvents] = useState<EventApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
        setError("Event Service bağlantısı kurulamadı.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) {
    return (
      <main className="p-10">
        Etkinlikler yükleniyor...
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-10 text-red-600">
        {error}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-3xl font-black">
        Event Service Test
      </h1>

      <p className="mt-2 text-slate-500">
        MongoDB üzerinden gelen detaylı etkinlik verileri:
      </p>

      <div className="mt-8 space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl bg-white p-6 shadow"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <img
                src={event.image}
                alt={event.title}
                className="h-44 w-full rounded-xl object-cover md:w-40"
              />

              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                    #{event.rank}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                    {event.category}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                    {event.city} / {event.district}
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-black">
                  {event.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {event.date}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {event.venue}
                </p>

                <p className="mt-3 font-black text-violet-700">
                  {event.priceText}
                </p>

                <p className="mt-2 text-sm font-bold">
                  ★ {event.rating} ({event.reviewCount})
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {event.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {event.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="font-black">
                    Seanslar
                  </p>

                  <div className="mt-2 space-y-2">
                    {event.sessions?.map((session, index) => (
                      <div
                        key={`${session.date}-${index}`}
                        className="rounded-xl bg-slate-50 p-3 text-sm"
                      >
                        {session.date} • {session.time} •{" "}
                        {session.ticketType}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-black">
                    Kurallar
                  </p>

                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                    {event.rules?.map((rule, index) => (
                      <li key={index}>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}