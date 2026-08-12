"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getCurrentUser,
} from "../services/authService";

import {
  addFavorite,
  checkFavorite,
  removeFavorite,
} from "../services/favoriteService";

type FavoriteButtonProps = {
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  venue: string;
};

export default function FavoriteButton({
  eventId,
  eventTitle,
  eventImage,
  eventDate,
  venue,
}: FavoriteButtonProps) {
  const router = useRouter();

  const [userId, setUserId] =
    useState<string | null>(null);

  const [favorite, setFavorite] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    async function loadUserAndFavoriteStatus() {
      try {
        const user =
          await Promise.resolve(
            getCurrentUser()
          );

        if (!user) {
          setUserId(null);
          setFavorite(false);
          return;
        }

        setUserId(user.id);

        const result =
          await checkFavorite(
            user.id,
            eventId
          );

        setFavorite(result);
      } catch (error) {
        console.error(
          "Favori durumu alınamadı:",
          error
        );
      }
    }

    loadUserAndFavoriteStatus();
  }, [eventId]);

  async function toggleFavorite(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (loading) {
      return;
    }

    if (!userId) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      if (favorite) {
        await removeFavorite(
          userId,
          eventId
        );

        setFavorite(false);
      } else {
        await addFavorite({
          userId,
          eventId,
          eventTitle,
          eventImage,
          eventDate,
          venue,
        });

        setFavorite(true);
      }
    } catch (error) {
      console.error(
        "Favori işlemi başarısız:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={
        favorite
          ? "Favorilerden çıkar"
          : "Favorilere ekle"
      }
      title={
        favorite
          ? "Favorilerden çıkar"
          : "Favorilere ekle"
      }
      className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full text-[20px] text-white backdrop-blur-sm transition ${
        favorite
          ? "bg-violet-600"
          : "bg-black/35 hover:bg-violet-600"
      } disabled:opacity-60`}
    >
      {favorite ? "♥" : "♡"}
    </button>
  );
}