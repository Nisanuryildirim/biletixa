"use client";

import { getCurrentUser } from "../services/authService";

import Link from "next/link";
import { useEffect, useState } from "react";

type Ticket = {
  id: string;
  eventId: string;
  userId: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  seatNumber: string;
  ticketType: string;
  price: number;
  status: string;
};

const TICKET_SERVICE_URL =
  "/backend/api/tickets";


function requireCurrentUserId(): string {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    throw new Error("Bu işlem için giriş yapmalısın.");
  }

  return currentUser.id;
}

export default function TicketsPage() {
  const [tickets, setTickets] =
    useState<Ticket[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadTickets() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${TICKET_SERVICE_URL}?userId=${encodeURIComponent(requireCurrentUserId())}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const data: Ticket[] =
          await response.json();

        setTickets(data);
      } catch (error) {
        console.error(error);

        setError(
          "Biletler yüklenemedi."
        );
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="font-bold text-slate-500">
          Biletlerin yükleniyor...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#20283a]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="text-[29px] font-black tracking-[-1.5px]"
          >
            Bilet
            <span className="text-violet-600">
              ixa
            </span>
          </Link>

          <Link
            href="/"
            className="text-sm font-bold text-violet-600"
          >
            â† Ana Sayfa
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">
            HESABIM
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Biletlerim
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Satın aldığın ve rezerve ettiğin
            biletleri buradan görüntüleyebilirsin.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl bg-rose-50 p-5 text-sm font-bold text-rose-600">
            {error}
          </div>
        )}

        {!error && tickets.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">
              ğŸŸï¸
            </div>

            <h2 className="mt-5 text-xl font-black">
              Henüz biletin yok
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Etkinlikleri keşfet ve ilk
              biletini satın al.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-black text-white"
            >
              Etkinlikleri Keşfet
            </Link>
          </div>
        )}

        <div className="grid gap-5">
          {tickets.map((ticket) => {
            const isPaid =
              ticket.status === "PAID";

            return (
              <article
                key={ticket.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="grid md:grid-cols-[1fr_230px]">
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          isPaid
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {isPaid
                          ? "ÖDENDİ"
                          : "REZERVE"}
                      </span>

                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                        {ticket.ticketType}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-black">
                      {ticket.eventTitle}
                    </h2>

                    <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-bold text-slate-400">
                          TARİH
                        </p>

                        <p className="mt-1 font-bold">
                          {ticket.eventDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-400">
                          MEKAN
                        </p>

                        <p className="mt-1 font-bold">
                          {ticket.venue}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-400">
                          KOLTUK
                        </p>

                        <p className="mt-1 font-bold">
                          {ticket.seatNumber}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-t border-dashed border-slate-200 bg-slate-50 p-6 md:border-l md:border-t-0">
                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        BİLET TUTARI
                      </p>

                      <p className="mt-1 text-2xl font-black text-violet-700">
                        {ticket.price.toLocaleString(
                          "tr-TR"
                        )}{" "}
                        ₺
                      </p>
                    </div>

                    <Link
                      href={`/event/${ticket.eventId}`}
                      className="mt-6 text-sm font-black text-violet-600"
                    >
                      Etkinliği Gör →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
