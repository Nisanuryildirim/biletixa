export type EventSessionApi = {
  date: string;
  time: string;
  venue: string;
  price: number;
  priceText: string;
  ticketType: string;
};

export type EventApiItem = {
  id: string;
  rank: number;

  title: string;
  city: string;
  district: string;
  category: string;
  image: string;

  date: string;
  venue: string;

  price: number;
  priceText: string;

  rating: number;
  reviewCount: number;

  artist: string;
  organizer: string;

  featured: boolean | null;
  campaign: boolean | null;
  soon: boolean | null;

  description: string;

  tags: string[];

  sessions: EventSessionApi[];

  rules: string[];
};

const EVENT_SERVICE_URL = "/backend/api/events";

export async function getAllEvents(): Promise<
  EventApiItem[]
> {
  const response = await fetch(
    EVENT_SERVICE_URL
  );

  if (!response.ok) {
    throw new Error(
      "Etkinlikler API Gateway üzerinden alınamadı."
    );
  }

  return response.json();
}

export async function getEventById(
  id: string | number
): Promise<EventApiItem> {
  const response = await fetch(
    `${EVENT_SERVICE_URL}/${id}`
  );

  if (!response.ok) {
    throw new Error(
      "Etkinlik bulunamadı."
    );
  }

  return response.json();
}

export async function getEventsByCity(
  city: string
): Promise<EventApiItem[]> {
  const response = await fetch(
    `${EVENT_SERVICE_URL}?city=${encodeURIComponent(
      city
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Şehir etkinlikleri alınamadı."
    );
  }

  return response.json();
}

export async function getEventsByCategory(
  category: string
): Promise<EventApiItem[]> {
  const response = await fetch(
    `${EVENT_SERVICE_URL}?category=${encodeURIComponent(
      category
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Kategori etkinlikleri alınamadı."
    );
  }

  return response.json();
}