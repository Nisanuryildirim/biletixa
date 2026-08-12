"use client";

import { getCurrentUser } from "../services/authService";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FormEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getEventById } from "../services/eventService";

const PAYMENT_SERVICE_URL = "/backend/api/payments";

const TICKET_SERVICE_URL = "/backend/api/tickets";

const ticketCategories = {
  cat1: {
    name: "1. Kategori",
    multiplier: 1.35,
  },

  cat2: {
    name: "2. Kategori",
    multiplier: 1.15,
  },

  cat3: {
    name: "3. Kategori",
    multiplier: 1,
  },
};

type PaymentResult = {
  id: string;
  userId: string;
  eventId: string;
  ticketIds: string[];
  amount: number;
  cardHolder: string;
  maskedCardNumber: string;
  status: string;
  createdAt: string;
};

function PaymentContent() {
  const searchParams = useSearchParams();

  const eventId =
    searchParams.get("event") ?? "1";

  const sessionIndex = Math.max(
    0,
    Number(searchParams.get("session") ?? "0")
  );

  const categoryId =
    searchParams.get("category") ?? "cat3";

  const count = Math.max(
    1,
    Number(searchParams.get("count") ?? "1")
  );

  const selectedSeats = (
    searchParams.get("seats") ?? ""
  )
    .split(",")
    .filter(Boolean);

  const ticketIds = (
    searchParams.get("ticketIds") ?? ""
  )
    .split(",")
    .filter(Boolean);

  const [event, setEvent] =
    useState<any>(null);

  const [loadingEvent, setLoadingEvent] =
    useState(true);

  const [eventError, setEventError] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [cardHolder, setCardHolder] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const [agreement, setAgreement] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const [paymentError, setPaymentError] =
    useState("");

  const [paymentResult, setPaymentResult] =
    useState<PaymentResult | null>(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data =
          await getEventById(eventId);

        setEvent(data);
      } catch (error) {
        console.error(error);

        setEventError(
          "Etkinlik bilgileri alınamadı."
        );
      } finally {
        setLoadingEvent(false);
      }
    }

    loadEvent();
  }, [eventId]);

  const session =
    event?.sessions?.[sessionIndex] ??
    event?.sessions?.[0];

  const category =
    ticketCategories[
      categoryId as keyof typeof ticketCategories
    ] ?? ticketCategories.cat3;

  const basePrice =
    session?.price ?? 0;

  const unitPrice =
    Math.round(
      basePrice * category.multiplier
    );

  const subtotal = useMemo(
    () => unitPrice * count,
    [unitPrice, count]
  );

  const serviceFee =
    count * 35;

  const total =
    subtotal + serviceFee;

  function formatCardNumber(
    value: string
  ) {
    const numbers =
      value.replace(/\D/g, "");

    return numbers
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiry(
    value: string
  ) {
    const numbers =
      value
        .replace(/\D/g, "")
        .slice(0, 4);

    if (numbers.length <= 2) {
      return numbers;
    }

    return `${numbers.slice(
      0,
      2
    )}/${numbers.slice(2)}`;
  }

  function maskCardNumber() {
    const clean =
      cardNumber.replace(/\s/g, "");

    const lastFour =
      clean.slice(-4);

    return `**** **** **** ${lastFour}`;
  }

  async function markTicketsPaid() {
    for (const ticketId of ticketIds) {
      const response =
        await fetch(
          `${TICKET_SERVICE_URL}/${ticketId}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status: "PAID",
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          `Ticket ${ticketId} PAID yapılamadı.`
        );
      }
    }
  }

  async function createPayment() {
    const response =
      await fetch(
        PAYMENT_SERVICE_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId:
              requireCurrentUserId(),

            eventId:
              String(eventId),

            ticketIds,

            amount:
              total,

            cardHolder,

            maskedCardNumber:
              maskCardNumber(),

            status:
              "SUCCESS",
          }),
        }
      );

    if (!response.ok) {
      throw new Error(
        `Payment Service HTTP ${response.status}`
      );
    }

    return response.json();
  }

  async function handleSubmit(
    formEvent:
      FormEvent<HTMLFormElement>
  ) {
    formEvent.preventDefault();

    setPaymentError("");

    if (!agreement) {
      setPaymentError(
        "Lütfen sözleşme ve bilgilendirme metinlerini kabul et."
      );

      return;
    }

    if (
      !fullName ||
      !email ||
      !phone ||
      !cardHolder ||
      cardNumber.replace(/\s/g, "")
        .length !== 16 ||
      expiry.length !== 5 ||
      cvv.length !== 3
    ) {
      setPaymentError(
        "Lütfen tüm alanları eksiksiz doldur."
      );

      return;
    }

    if (ticketIds.length === 0) {
      setPaymentError(
        "Rezervasyon bilgisi bulunamadı. Lütfen bileti yeniden seç."
      );

      return;
    }

    setLoading(true);

    try {
      const payment: PaymentResult =
        await createPayment();

      await markTicketsPaid();

      setPaymentResult(payment);

      setCompleted(true);
    } catch (error) {
      console.error(error);

      setPaymentError(
        "Ödeme tamamlanamadı. API Gateway bağlantısını kontrol et."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingEvent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="font-bold text-slate-500">
          Ödeme bilgileri yükleniyor...
        </p>
      </main>
    );
  }

  if (
    eventError ||
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
            Sipariş bulunamadı
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {eventError}
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

  if (
    completed &&
    paymentResult
  ) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] text-slate-900">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-[1450px] items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="text-3xl font-black tracking-[-1.5px]"
            >
              Bilet
              <span className="text-violet-600">
                ixa
              </span>
            </Link>

            <span className="text-sm font-bold text-emerald-600">
              Ödeme Başarılı
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="bg-gradient-to-r from-violet-700 to-fuchsia-600 px-8 py-10 text-center text-white">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl font-black text-violet-600">
                ✓
              </div>

              <h1 className="mt-5 text-3xl font-black">
                Biletin Hazır!
              </h1>

              <p className="mt-2 text-violet-100">
                Ödeme başarıyla tamamlandı
                ve biletlerin PAID
                durumuna geçirildi.
              </p>
            </div>

            <div className="p-7 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-28"
                />

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                    {event.category}
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {event.title}
                  </h2>

                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    {session.date}

                    <span className="mx-2 text-slate-300">
                      •
                    </span>

                    {session.time}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {session.venue}
                  </p>
                </div>
              </div>

              <div className="my-8 border-t border-dashed border-slate-200" />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase text-slate-400">
                    Bilet Sahibi
                  </p>

                  <p className="mt-2 font-bold">
                    {fullName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-slate-400">
                    Bilet Sayısı
                  </p>

                  <p className="mt-2 font-bold">
                    {count}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-slate-400">
                    Kategori
                  </p>

                  <p className="mt-2 font-bold">
                    {category.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-slate-400">
                    Toplam
                  </p>

                  <p className="mt-2 text-lg font-black text-violet-700">
                    {total.toLocaleString(
                      "tr-TR"
                    )}{" "}
                    ₺
                  </p>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Koltuklar
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSeats.map(
                      (seat) => (
                        <span
                          key={seat}
                          className="rounded-lg bg-white px-3 py-2 text-sm font-black text-violet-700 shadow-sm"
                        >
                          {seat}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="mt-7 rounded-2xl bg-slate-50 p-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Ödeme ID
                </p>

                <p className="mt-2 break-all font-mono text-sm font-black">
                  {paymentResult.id}
                </p>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Kart
                </p>

                <p className="mt-2 font-mono font-black">
                  {
                    paymentResult.maskedCardNumber
                  }
                </p>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Durum
                </p>

                <span className="mt-2 inline-flex rounded-lg bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-700">
                  SUCCESS
                </span>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/"
                  className="rounded-xl border border-violet-200 px-6 py-4 text-center font-black text-violet-700"
                >
                  Ana Sayfa
                </Link>

                <Link
                  href="/tickets"
                  className="rounded-xl bg-violet-600 px-6 py-4 text-center font-black text-white"
                >
                  Biletlerim
                </Link>
              </div>
            </div>
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
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
              ✓
            </span>

            <span className="text-emerald-600">
              Bilet Seçimi
            </span>

            <span className="mx-2 h-px w-10 bg-slate-200" />

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white">
              2
            </span>

            <span className="text-violet-600">
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
            href={`/checkout?event=${event.id}&session=${sessionIndex}`}
            className="text-sm font-bold text-violet-600"
          >
            â† Bilet SeÃ§imine DÃ¶n
          </Link>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-[1320px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_390px]"
      >
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
              Adım 1
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Bilet Bilgileri
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-black">
                  Ad Soyad
                </label>

                <input
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black">
                  E-posta
                </label>

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black">
                  Telefon
                </label>

                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  type="tel"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
              Adım 2
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Ödeme Bilgileri
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Bu demo ödeme
              akışıdır. Gerçek kart
              işlemi yapılmaz.
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-black">
                  Kart Üzerindeki İsim
                </label>

                <input
                  value={cardHolder}
                  onChange={(e) =>
                    setCardHolder(
                      e.target.value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 uppercase outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black">
                  Kart Numarası
                </label>

                <input
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      formatCardNumber(
                        e.target.value
                      )
                    )
                  }
                  required
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-black">
                    Son Kullanma
                  </label>

                  <input
                    value={expiry}
                    onChange={(e) =>
                      setExpiry(
                        formatExpiry(
                          e.target.value
                        )
                      )
                    }
                    required
                    placeholder="AA/YY"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black">
                    CVV
                  </label>

                  <input
                    value={cvv}
                    onChange={(e) =>
                      setCvv(
                        e.target.value
                          .replace(
                            /\D/g,
                            ""
                          )
                          .slice(
                            0,
                            3
                          )
                      )
                    }
                    required
                    type="password"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={agreement}
                onChange={(e) =>
                  setAgreement(
                    e.target.checked
                  )
                }
                className="mt-1 h-5 w-5 accent-violet-600"
              />

              <span className="text-sm leading-6 text-slate-600">
                Ön bilgilendirme
                formunu, satış
                koşullarını ve
                etkinlik kurallarını
                kabul ediyorum.
              </span>
            </label>
          </section>
        </div>

        <aside>
          <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">
              Sipariş Özeti
            </h2>

            <div className="mt-6 flex gap-4 border-b border-slate-100 pb-6">
              <img
                src={event.image}
                alt={event.title}
                className="h-24 w-20 rounded-xl object-cover"
              />

              <div>
                <p className="font-black">
                  {event.title}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {session.date}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {session.time}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Kategori
                </span>

                <span className="font-bold">
                  {category.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Adet
                </span>

                <span className="font-bold">
                  {count}
                </span>
              </div>

              {selectedSeats.length >
                0 && (
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Koltuklar
                  </span>

                  <span className="text-right font-bold">
                    {selectedSeats.join(
                      ", "
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className="my-6 border-t border-slate-100" />

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

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
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

            {paymentError && (
              <p className="mt-4 rounded-xl bg-rose-50 p-3 text-center text-xs font-bold leading-5 text-rose-600">
                {paymentError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-violet-600 py-4 text-sm font-black text-white transition hover:bg-violet-700 disabled:bg-violet-400"
            >
              {loading
                ? "Ödeme İşleniyor..."
                : `${total.toLocaleString(
                    "tr-TR"
                  )} ₺ Öde`}
            </button>
          </div>
        </aside>
      </form>
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

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
          <p className="font-bold text-slate-500">
            Ödeme sayfası
            yükleniyor...
          </p>
        </main>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
