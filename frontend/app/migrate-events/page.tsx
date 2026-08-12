"use client";

import { useState } from "react";

import { events } from "../data/events";

const EVENT_SERVICE_URL =
  "http://localhost:8081/api/events";

export default function MigrateEventsPage() {
  const [status, setStatus] =
    useState("Hazır");

  const [completed, setCompleted] =
    useState(0);

  const [failed, setFailed] =
    useState(0);

  const [running, setRunning] =
    useState(false);

  async function migrateEvents() {
    if (running) {
      return;
    }

    setRunning(true);
    setCompleted(0);
    setFailed(0);

    setStatus(
      "Etkinlikler Event Service'e aktarılıyor..."
    );

    let successCount = 0;
    let failureCount = 0;

    for (const event of events) {
      try {
        const response = await fetch(
          EVENT_SERVICE_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              ...event,

              // Backend tarafında id String
              // kullandığımız için string'e çeviriyoruz.
              id: String(event.id),

              featured:
                event.featured ?? false,

              campaign:
                event.campaign ?? false,

              soon:
                event.soon ?? false,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        successCount++;

        setCompleted(
          successCount
        );
      } catch (error) {
        console.error(
          `${event.title} aktarılamadı:`,
          error
        );

        failureCount++;

        setFailed(
          failureCount
        );
      }
    }

    setRunning(false);

    if (failureCount === 0) {
      setStatus(
        `${successCount} etkinliğin tamamı başarıyla MongoDB'ye aktarıldı.`
      );
    } else {
      setStatus(
        `${successCount} başarılı, ${failureCount} başarısız aktarım.`
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">
          Biletixa Migration
        </p>

        <h1 className="mt-3 text-3xl font-black">
          Event Service Veri Aktarımı
        </h1>

        <p className="mt-3 leading-7 text-slate-500">
          Mevcut events.ts dosyasındaki
          etkinlikler Event Service
          üzerinden MongoDB&apos;ye
          aktarılacak.
        </p>

        <div className="mt-7 rounded-2xl bg-slate-50 p-5">
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Toplam etkinlik
            </span>

            <span className="font-black">
              {events.length}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-sm text-slate-500">
              Başarılı
            </span>

            <span className="font-black text-emerald-600">
              {completed}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-sm text-slate-500">
              Başarısız
            </span>

            <span className="font-black text-rose-600">
              {failed}
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-violet-50 p-4 text-sm font-semibold leading-6 text-violet-800">
          {status}
        </div>

        <button
          type="button"
          disabled={running}
          onClick={migrateEvents}
          className="mt-6 w-full rounded-xl bg-violet-600 py-4 font-black text-white transition hover:bg-violet-700 disabled:cursor-wait disabled:bg-violet-400"
        >
          {running
            ? "Aktarılıyor..."
            : "Etkinlikleri MongoDB'ye Aktar"}
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
          Aynı ID&apos;ye sahip kayıtlar
          Event Service tarafından
          güncellenecektir.
        </p>
      </div>
    </main>
  );
}