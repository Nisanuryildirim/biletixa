"use client";

import { getCurrentUser } from "../services/authService";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FavoriteApiItem,
  getFavorites,
  removeFavorite,
} from "../services/favoriteService";

function requireCurrentUserId(): string {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    throw new Error("Bu işlem için giriş yapmalısın.");
  }

  return currentUser.id;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] =
    useState<FavoriteApiItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getFavorites(requireCurrentUserId());

        setFavorites(data);
      } catch (error) {
        console.error(error);

        setError(
          "Favoriler yüklenemedi."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  async function handleRemove(
    eventId: string
  ) {
    try {
      await removeFavorite(
        requireCurrentUserId(),
        eventId
      );

      setFavorites(
        (current) =>
          current.filter(
            (favorite) =>
              favorite.eventId !==
              eventId
          )
      );
    } catch (error) {
      console.error(error);

      setError(
        "Favori kaldırılamadı."
      );
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="font-bold text-slate-500">
          Favorilerin yükleniyor...
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
            Favorilerim
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Beğendiğin etkinlikleri
            burada saklayabilirsin.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-rose-50 p-5 text-sm font-bold text-rose-600">
            {error}
          </div>
        )}

        {!error &&
          favorites.length === 0 && (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <div className="text-5xl">
                ♡
              </div>

              <h2 className="mt-5 text-xl font-black">
                Henüz favorin yok
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Etkinliklerdeki kalp
                butonuna basarak
                favorilerine ekleyebilirsin.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-black text-white"
              >
                Etkinlikleri Keşfet
              </Link>
            </div>
          )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map(
            (favorite) => (
              <article
                key={favorite.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="relative aspect-[1.4] overflow-hidden bg-slate-200">
                  <img
                    src={
                      favorite.eventImage
                    }
                    alt={
                      favorite.eventTitle
                    }
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(
                        favorite.eventId
                      )
                    }
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-xl text-white shadow"
                    aria-label="Favorilerden çıkar"
                  >
                    ♥
                  </button>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-black">
                    {
                      favorite.eventTitle
                    }
                  </h2>

                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    {
                      favorite.eventDate
                    }
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {favorite.venue}
                  </p>

                  <Link
                    href={`/event/${favorite.eventId}`}
                    className="mt-5 inline-flex text-sm font-black text-violet-600"
                  >
                    Etkinliği Gör →
                  </Link>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </main>
  );
}
