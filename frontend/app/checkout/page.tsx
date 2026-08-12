"use client";

import { getCurrentUser } from "../services/authService";

import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  EventApiItem,
  getEventById,
} from "../services/eventService";

type TicketCategory = {
  id: string;
  name: string;
  multiplier: number;
  description: string;
  rows: string[];
};

type CreatedTicket = {
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

const TICKET_SERVICE_URL = "/backend/api/tickets";
const ticketCategories: TicketCategory[] = [
  {
    id: "cat1",
    name: "1. Kategori",
    multiplier: 1.35,
    description:
      "Sahneye en yakın bölüm",
    rows: ["A", "B"],
  },
  {
    id: "cat2",
    name: "2. Kategori",
    multiplier: 1.15,
    description:
      "Orta bölüm",
    rows: ["C", "D", "E"],
  },
  {
    id: "cat3",
    name: "3. Kategori",
    multiplier: 1,
    description:
      "Arka bölüm",
    rows: ["F", "G", "H"],
  },
];

const seats = Array.from(
  { length: 64 },
  (_, index) => {
    const rowIndex =
      Math.floor(index / 8);

    const row =
      String.fromCharCode(
        65 + rowIndex
      );

    const number =
      (index % 8) + 1;

    const unavailableIndexes = [
      2,
      5,
      11,
      14,
      17,
      23,
      26,
      30,
      35,
      39,
      42,
      47,
      51,
      55,
      60,
    ];

    return {
      id: `${row}${number}`,
      row,
      number,
      unavailable:
        unavailableIndexes.includes(
          index
        ),
    };
  }
);

function CheckoutContent() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const eventId =
    searchParams.get("event") ??
    "1";

  const sessionIndex =
    Math.max(
      0,
      Number(
        searchParams.get(
          "session"
        ) ?? "0"
      )
    );

  const [
    event,
    setEvent,
  ] =
    useState<EventApiItem | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState("");

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] =
    useState("cat3");

  const [
    selectedSeats,
    setSelectedSeats,
  ] =
    useState<string[]>([]);

  const [
    quantity,
    setQuantity,
  ] =
    useState(1);

  const [
    reserving,
    setReserving,
  ] =
    useState(false);

  const [
    reservationError,
    setReservationError,
  ] =
    useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const data =
          await getEventById(
            eventId
          );

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
  }, [eventId]);

  const session =
    event?.sessions?.[
      sessionIndex
    ] ??
    event?.sessions?.[0];

  const selectedCategory =
    ticketCategories.find(
      (category) =>
        category.id ===
        selectedCategoryId
    ) ??
    ticketCategories[2];

  const isSeated =
    session?.ticketType ===
    "Koltuk Seçmeli";

  const basePrice =
    session?.price ?? 0;

  const unitPrice =
    event?.soon
      ? 0
      : Math.round(
          basePrice *
            selectedCategory.multiplier
        );

  const ticketCount =
    isSeated
      ? selectedSeats.length
      : quantity;

  const subtotal =
    useMemo(
      () =>
        unitPrice *
        ticketCount,
      [
        unitPrice,
        ticketCount,
      ]
    );

  const serviceFee =
    ticketCount > 0
      ? ticketCount * 35
      : 0;

  const total =
    subtotal +
    serviceFee;

  const visibleSeats =
    seats.filter(
      (seat) =>
        selectedCategory.rows.includes(
          seat.row
        )
    );

  function toggleSeat(
    seatId: string
  ) {
    setReservationError("");

    setSelectedSeats(
      (current) => {
        if (
          current.includes(
            seatId
          )
        ) {
          return current.filter(
            (item) =>
              item !==
              seatId
          );
        }

        if (
          current.length >= 6
        ) {
          return current;
        }

        return [
          ...current,
          seatId,
        ];
      }
    );
  }

  function changeCategory(
    categoryId: string
  ) {
    setSelectedCategoryId(
      categoryId
    );

    setSelectedSeats([]);

    setReservationError("");
  }

  async function createReservation() {
    if (
      !event ||
      !session
    ) {
      return;
    }

    if (
      isSeated &&
      selectedSeats.length === 0
    ) {
      setReservationError(
        "Devam etmek için en az bir koltuk seçmelisin."
      );

      return;
    }

    setReservationError("");

    setReserving(true);

    try {
      const seatNumbers =
        isSeated
          ? selectedSeats
          : Array.from(
              {
                length:
                  quantity,
              },
              (_, index) =>
                `GENERAL-${
                  index + 1
                }`
            );

      const createdTickets:
        CreatedTicket[] = [];

      for (
        const seatNumber
        of seatNumbers
      ) {
        const response =
          await fetch(
            TICKET_SERVICE_URL,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  eventId:
                    String(
                      event.id
                    ),

                  userId:
                    requireCurrentUserId(),

                  eventTitle:
                    event.title,

                  eventDate:
                    session.date,

                  venue:
                    session.venue,

                  seatNumber,

                  ticketType:
                    selectedCategory.name,

                  price:
                    unitPrice,

                  status:
                    "RESERVED",
                }),
            }
          );

        if (
          !response.ok
        ) {
          throw new Error(
            `API Gateway HTTP ${response.status}`
          );
        }

        const ticket:
          CreatedTicket =
          await response.json();

        createdTickets.push(
          ticket
        );
      }

      const ticketIds =
        createdTickets
          .map(
            (ticket) =>
              ticket.id
          )
          .join(",");

      const seatValue =
        selectedSeats.join(
          ","
        );

      router.push(
        `/payment?event=${encodeURIComponent(
          String(event.id)
        )}` +
          `&session=${sessionIndex}` +
          `&category=${encodeURIComponent(
            selectedCategory.id
          )}` +
          `&count=${ticketCount}` +
          `&seats=${encodeURIComponent(
            seatValue
          )}` +
          `&ticketIds=${encodeURIComponent(
            ticketIds
          )}`
      );
    } catch (error) {
      console.error(error);

      setReservationError(
        "Bilet rezervasyonu oluşturulamadı. API Gateway bağlantısını kontrol et."
      );
    } finally {
      setReserving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="font-bold text-slate-500">
          Bilet seçenekleri
          yükleniyor...
        </p>
      </main>
    );
  }

  if (
    error ||
    !event ||
    !session
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-4xl">
            ğŸŸï¸
          </div>

          <h1 className="mt-4 text-2xl font-black">
            Etkinlik bulunamadı
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <Link
            href="/events"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 font-bold text-white"
          >
            Etkinliklere Dön
          </Link>
        </div>
      </main>
    );
  }

  if (event.soon) {
    return (
      <main className="min-h-screen bg-[#f5f5f5]">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">
              â³
            </div>

            <h1 className="mt-5 text-3xl font-black">
              Biletler Yakında
              Satışta
            </h1>

            <p className="mt-4 text-slate-500">
              {event.title} için
              bilet satışı henüz
              başlamadı.
            </p>

            <Link
              href={`/event/${event.id}`}
              className="mt-7 inline-flex rounded-xl bg-violet-600 px-7 py-3 font-black text-white"
            >
              Etkinliğe Dön
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#20283a]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="text-[29px] font-black tracking-[-1.5px]"
          >
            Bilet
            <span className="text-violet-600">
              ixa
            </span>
          </Link>

          <div className="hidden items-center gap-2 text-xs font-bold text-slate-400 sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white">
              1
            </span>

            <span className="text-violet-600">
              Bilet Seçimi
            </span>

            <span className="mx-2 h-px w-10 bg-slate-200" />

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
              2
            </span>

            <span>
              Ödeme
            </span>

            <span className="mx-2 h-px w-10 bg-slate-200" />

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
              3
            </span>

            <span>
              Tamamlandı
            </span>
          </div>

          <Link
            href={`/event/${event.id}`}
            className="text-sm font-bold text-violet-600"
          >
            â† EtkinliÄŸe DÃ¶n
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1450px] px-5 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row">
                <img
                  src={
                    event.image
                  }
                  alt={
                    event.title
                  }
                  className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-28"
                />

                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-700">
                      {
                        event.category
                      }
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                      {
                        event.city
                      }
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl font-black">
                    {event.title}
                  </h1>

                  <p className="mt-3 text-sm font-bold text-slate-700">
                    {session.date}

                    <span className="mx-2 text-slate-300">
                      •
                    </span>

                    {session.time}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {session.venue}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    {
                      event.district
                    }{" "}
                    • {event.city}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Adım 1
              </p>

              <h2 className="mt-2 text-xl font-black">
                Bilet Kategorini
                Seç
              </h2>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {ticketCategories.map(
                  (category) => {
                    const categoryPrice =
                      Math.round(
                        basePrice *
                          category.multiplier
                      );

                    const selected =
                      selectedCategoryId ===
                      category.id;

                    return (
                      <button
                        key={
                          category.id
                        }
                        type="button"
                        onClick={() =>
                          changeCategory(
                            category.id
                          )
                        }
                        className={`relative rounded-2xl border p-5 text-left transition ${
                          selected
                            ? "border-violet-600 bg-violet-50"
                            : "border-slate-200 hover:border-violet-300"
                        }`}
                      >
                        {selected && (
                          <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">
                            ✓
                          </span>
                        )}

                        <h3 className="font-black">
                          {
                            category.name
                          }
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {
                            category.description
                          }
                        </p>

                        <p className="mt-2 text-xs font-bold text-slate-400">
                          Sıralar:{" "}
                          {
                            category.rows.join(
                              ", "
                            )
                          }
                        </p>

                        <p className="mt-5 text-lg font-black text-violet-700">
                          {categoryPrice.toLocaleString(
                            "tr-TR"
                          )}{" "}
                          ₺
                        </p>
                      </button>
                    );
                  }
                )}
              </div>
            </section>

            {isSeated ? (
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                  Adım 2
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Koltuğunu Seç
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {
                    selectedCategory.name
                  }{" "}
                  için{" "}
                  {
                    selectedCategory.rows.join(
                      ", "
                    )
                  }{" "}
                  sıraları
                  kullanılabilir.
                  En fazla 6
                  koltuk seçebilirsin.
                </p>

                <div className="mx-auto mt-9 max-w-3xl overflow-x-auto pb-3">
                  <div className="min-w-[560px]">
                    <div className="mx-auto w-[70%] rounded-t-[80px] bg-slate-900 px-8 py-4 text-center text-xs font-black tracking-[0.3em] text-white">
                      SAHNE
                    </div>

                    <div className="mt-10 space-y-4">
                      {selectedCategory.rows.map(
                        (row) => {
                          const rowSeats =
                            visibleSeats.filter(
                              (seat) =>
                                seat.row ===
                                row
                            );

                          return (
                            <div
                              key={
                                row
                              }
                              className="flex items-center justify-center gap-3"
                            >
                              <span className="w-5 text-xs font-black text-slate-400">
                                {row}
                              </span>

                              {rowSeats.map(
                                (
                                  seat
                                ) => {
                                  const selected =
                                    selectedSeats.includes(
                                      seat.id
                                    );

                                  return (
                                    <button
                                      key={
                                        seat.id
                                      }
                                      type="button"
                                      disabled={
                                        seat.unavailable
                                      }
                                      onClick={() =>
                                        toggleSeat(
                                          seat.id
                                        )
                                      }
                                      className={`flex h-10 w-10 items-center justify-center rounded-t-xl rounded-b-md text-[11px] font-black transition ${
                                        seat.unavailable
                                          ? "cursor-not-allowed bg-slate-500 text-slate-300"
                                          : selected
                                          ? "bg-violet-600 text-white"
                                          : "bg-slate-200 text-slate-600 hover:bg-violet-200"
                                      }`}
                                    >
                                      {
                                        seat.number
                                      }
                                    </button>
                                  );
                                }
                              )}

                              <span className="w-5 text-xs font-black text-slate-400">
                                {row}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-5 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded bg-slate-200" />
                        Müsait
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded bg-violet-600" />
                        Seçilen
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded bg-slate-500" />
                        Dolu
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSeats.length >
                  0 && (
                  <div className="mt-8 rounded-2xl bg-violet-50 p-5">
                    <p className="text-sm font-black">
                      Seçilen
                      Koltuklar
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedSeats.map(
                        (seat) => (
                          <span
                            key={
                              seat
                            }
                            className="rounded-lg bg-white px-3 py-2 text-xs font-black text-violet-700"
                          >
                            {seat}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </section>
            ) : (
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                  Adım 2
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Bilet Adedini
                  Seç
                </h2>

                <div className="mt-7 flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        (
                          current
                        ) =>
                          Math.max(
                            1,
                            current -
                              1
                          )
                      )
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-full border text-2xl"
                  >
                    −
                  </button>

                  <span className="w-12 text-center text-2xl font-black">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        (
                          current
                        ) =>
                          Math.min(
                            6,
                            current +
                              1
                          )
                      )
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-2xl text-white"
                  >
                    +
                  </button>
                </div>
              </section>
            )}
          </div>

          <aside>
            <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black">
                Sipariş Özeti
              </h2>

              <div className="mt-6 flex gap-4 border-b pb-6">
                <img
                  src={
                    event.image
                  }
                  alt={
                    event.title
                  }
                  className="h-24 w-20 rounded-xl object-cover"
                />

                <div>
                  <p className="font-black">
                    {
                      event.title
                    }
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {
                      session.date
                    }
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {
                      session.time
                    }
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Kategori
                  </span>

                  <span className="font-bold">
                    {
                      selectedCategory.name
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Bölüm
                  </span>

                  <span className="font-bold">
                    {
                      selectedCategory.rows.join(
                        ", "
                      )
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Birim Fiyat
                  </span>

                  <span className="font-bold">
                    {unitPrice.toLocaleString(
                      "tr-TR"
                    )}{" "}
                    ₺
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Bilet Adedi
                  </span>

                  <span className="font-bold">
                    {
                      ticketCount
                    }
                  </span>
                </div>
              </div>

              <div className="my-6 border-t" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Bilet Tutarı
                  </span>

                  <span>
                    {subtotal.toLocaleString(
                      "tr-TR"
                    )}{" "}
                    ₺
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Hizmet Bedeli
                  </span>

                  <span>
                    {serviceFee.toLocaleString(
                      "tr-TR"
                    )}{" "}
                    ₺
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-6">
                <span className="font-black">
                  Toplam
                </span>

                <span className="text-2xl font-black text-violet-700">
                  {total.toLocaleString(
                    "tr-TR"
                  )}{" "}
                  ₺
                </span>
              </div>

              <button
                type="button"
                disabled={
                  reserving ||
                  ticketCount ===
                    0
                }
                onClick={
                  createReservation
                }
                className="mt-6 w-full rounded-xl bg-violet-600 py-4 text-sm font-black text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {reserving
                  ? "Biletler Rezerve Ediliyor..."
                  : "Devam Et"}
              </button>

              {reservationError && (
                <p className="mt-4 text-center text-xs font-bold leading-5 text-rose-600">
                  {
                    reservationError
                  }
                </p>
              )}

              <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-semibold leading-5 text-emerald-700">
                  ğŸ”’ SeÃ§ilen
                  biletler ödeme
                  öncesinde
                  RESERVED durumuna
                  alınır.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}


function requireCurrentUserId(): string {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    throw new Error("Bu işlem için giriş yapmalısın.");
  }

  return currentUser.id;
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
          <p className="font-bold text-slate-500">
            Bilet seçenekleri
            yükleniyor...
          </p>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
