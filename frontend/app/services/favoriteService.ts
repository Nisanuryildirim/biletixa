export type FavoriteApiItem = {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  venue: string;
};

const FAVORITE_SERVICE_URL =
  "/backend/api/favorites";

export async function getFavorites(
  userId: string
): Promise<FavoriteApiItem[]> {
  const response = await fetch(
    `${FAVORITE_SERVICE_URL}?userId=${encodeURIComponent(
      userId
    )}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Favoriler alınamadı."
    );
  }

  return response.json();
}

export async function checkFavorite(
  userId: string,
  eventId: string
): Promise<boolean> {
  const response = await fetch(
    `${FAVORITE_SERVICE_URL}/check?userId=${encodeURIComponent(
      userId
    )}&eventId=${encodeURIComponent(
      eventId
    )}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return false;
  }

  if (!response.ok) {
    throw new Error(
      "Favori durumu kontrol edilemedi."
    );
  }

  return true;
}

export async function addFavorite(
  favorite: Omit<
    FavoriteApiItem,
    "id"
  >
): Promise<FavoriteApiItem> {
  const response = await fetch(
    FAVORITE_SERVICE_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        favorite
      ),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Favoriye eklenemedi."
    );
  }

  return response.json();
}

export async function removeFavorite(
  userId: string,
  eventId: string
): Promise<void> {
  const response = await fetch(
    `${FAVORITE_SERVICE_URL}?userId=${encodeURIComponent(
      userId
    )}&eventId=${encodeURIComponent(
      eventId
    )}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Favoriden çıkarılamadı."
    );
  }
}