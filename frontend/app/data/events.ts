export type EventSession = {
  date: string;
  time: string;
  venue: string;
  price: number;
  priceText: string;
  ticketType: string;
};

export type EventItem = {
  id: number;
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

  featured?: boolean;
  campaign?: boolean;
  soon?: boolean;

  description: string;
  tags: string[];

  sessions: EventSession[];

  rules: string[];
};

const posterImages = [
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1200&q=85",
];

const standardRules = [
  "Etkinlik alanına giriş için geçerli bilet ibraz edilmelidir.",
  "Etkinlik başladıktan sonra giriş organizatörün belirlediği koşullara bağlıdır.",
  "Organizatör etkinlik saatinde ve programında değişiklik yapma hakkını saklı tutar.",
  "Profesyonel ses ve görüntü kayıt ekipmanlarının etkinlik alanına alınması yasaktır.",
  "Satın alınan bilet yalnızca belirtilen etkinlik ve seans için geçerlidir.",
];

type Seed = {
  title: string;
  category: string;
  venue: string;
  district: string;
  date: string;
  price: number;
  soon?: boolean;
  campaign?: boolean;
};

function createEvent(
  id: number,
  rank: number,
  city: string,
  seed: Seed
): EventItem {
  const priceText = seed.soon
    ? "YAKINDA"
    : `${seed.price.toLocaleString("tr-TR")} ₺'den itibaren`;

  return {
    id,
    rank,

    title: seed.title,
    city,
    district: seed.district,
    category: seed.category,

    image:
      posterImages[(id - 1) % posterImages.length],

    date: seed.date,
    venue: seed.venue,

    price: seed.price,
    priceText,

    rating: Number(
      (4.5 + ((id % 5) * 0.1)).toFixed(1)
    ),

    reviewCount:
      20 + ((id * 13) % 120),

    artist: seed.title,

    organizer: "Biletixa Events",

    featured: rank <= 3,

    campaign: seed.campaign,

    soon: seed.soon,

    description: `${seed.title}, ${city} şehrinin ${seed.district} ilçesinde yer alan ${seed.venue} sahnesinde etkinlikseverlerle buluşuyor. Etkinlik tarihini, seans bilgilerini ve bilet seçeneklerini Biletixa üzerinden inceleyebilirsin.`,

    tags: [
      city,
      seed.district,
      seed.category,
      rank <= 3
        ? "Trendler"
        : "Popüler Etkinlik",
    ],

    sessions: [
      {
        date: seed.date,

        time:
          seed.category === "Festival"
            ? "17:00"
            : "21:00",

        venue: seed.venue,

        price: seed.price,

        priceText,

        ticketType:
          seed.category === "Festival"
            ? "Ayakta"
            : "Koltuk Seçmeli",
      },
    ],

    rules: standardRules,
  };
}

/* =========================
   İSTANBUL
========================= */

const istanbulSeeds: Seed[] = [
  {
    title: "Mabel Matiz",
    category: "Konser",
    venue:
      "Harbiye Cemil Topuzlu Açıkhava Tiyatrosu",
    district: "Şişli",
    date: "21 Ağustos 2026",
    price: 1400,
  },

  {
    title: "Melike Şahin",
    category: "Konser",
    venue:
      "Harbiye Cemil Topuzlu Açıkhava Tiyatrosu",
    district: "Şişli",
    date: "27 Ağustos 2026",
    price: 2300,
  },

  {
    title: "Black Veil Brides",
    category: "Konser",
    venue: "JJ Arena",
    district: "Ataşehir",
    date: "13 Şubat 2027",
    price: 2230,
  },

  {
    title: "Ricky Martin",
    category: "Konser",
    venue: "KüçükÇiftlik Park",
    district: "Şişli",
    date: "11 Eylül 2026",
    price: 4000,
  },

  {
    title: "Edis",
    category: "Konser",
    venue:
      "Harbiye Cemil Topuzlu Açıkhava Tiyatrosu",
    district: "Şişli",
    date: "19 Ağustos 2026",
    price: 1950,
  },

  {
    title: "Don Quixote (Don Kişot)",
    category: "Tiyatro",
    venue:
      "Harbiye Cemil Topuzlu Açıkhava Tiyatrosu",
    district: "Şişli",
    date: "16 Eylül 2026",
    price: 1695,
  },

  {
    title: "Hayko Cepkin",
    category: "Konser",
    venue: "KüçükÇiftlik Park",
    district: "Şişli",
    date: "24 Ekim 2026",
    price: 1500,
  },

  {
    title: "Emir Can İğrek",
    category: "Konser",
    venue:
      "Harbiye Cemil Topuzlu Açıkhava Tiyatrosu",
    district: "Şişli",
    date: "20 Ağustos 2026",
    price: 1100,
  },

  {
    title: "Yıldız Tilbe Konseri",
    category: "Konser",
    venue:
      "Harbiye Cemil Topuzlu Açıkhava Tiyatrosu",
    district: "Şişli",
    date: "29 Ağustos 2026",
    price: 2280,
  },

  {
    title:
      "Harry Potter ve Ateş Kadehi In Concert",
    category: "Konser",
    venue: "Volkswagen Arena",
    district: "Sarıyer",
    date: "28 Kasım 2026",
    price: 0,
    soon: true,
  },
];

/* =========================
   ANKARA
========================= */

const ankaraSeeds: Seed[] = [
  {
    title: "mor ve ötesi",
    category: "Konser",
    venue: "ODTÜ MD Vişnelik",
    district: "Çankaya",
    date: "3 Ekim 2026",
    price: 1599,
  },

  {
    title: "Gökhan Türkmen",
    category: "Konser",
    venue: "Oran Açıkhava Sahnesi",
    district: "Çankaya",
    date: "15 Ağustos 2026",
    price: 1250,
  },

  {
    title: "Simge Konseri",
    category: "Konser",
    venue: "Atılım Sahne",
    district: "Gölbaşı",
    date: "19 Eylül 2026",
    price: 850,
  },

  {
    title: "Nilüfer Konseri",
    category: "Konser",
    venue: "Oran Açıkhava Sahnesi",
    district: "Çankaya",
    date: "12 Ağustos 2026",
    price: 1500,
  },

  {
    title: "Sertab Erener Konseri",
    category: "Konser",
    venue: "Oran Açıkhava Sahnesi",
    district: "Çankaya",
    date: "12 Eylül 2026",
    price: 2350,
  },

  {
    title: "Buray",
    category: "Konser",
    venue: "Oran Açıkhava Sahnesi",
    district: "Çankaya",
    date: "19 Ağustos 2026",
    price: 1250,
  },

  {
    title: "Hayko Cepkin Ankara",
    category: "Konser",
    venue: "ODTÜ MD Vişnelik",
    district: "Çankaya",
    date: "11 Eylül 2026",
    price: 1900,
  },

  {
    title:
      "Kik5o 2026 Türkiye Turnesi",
    category: "Konser",
    venue:
      "TED Ankara Koleji Ata Sahne",
    district: "Gölbaşı",
    date: "6 Eylül 2026",
    price: 1500,
  },

  {
    title: "Kerimcan Durmaz Konseri",
    category: "Konser",
    venue:
      "JW Marriott Ankara Açıkhava",
    district: "Çankaya",
    date: "22 Ağustos 2026",
    price: 1000,
  },

  {
    title: "Fındıkkıran Balesi",
    category: "Tiyatro",
    venue: "Congresium Ankara",
    district: "Çankaya",
    date: "20 Aralık 2026",
    price: 995,
  },
];

/* =========================
   İZMİR
========================= */

const izmirSeeds: Seed[] = [
  {
    title: "Yalın Bir Büyülü Gece",
    category: "Konser",
    venue:
      "Bornova Aşık Veysel Açıkhava",
    district: "Bornova",
    date: "21 Ağustos 2026",
    price: 0,
    soon: true,
  },

  {
    title: "Blok3 Kayıp Persona",
    category: "Konser",
    venue: "İzmir Arena",
    district: "Bayraklı",
    date: "13 Ağustos 2026",
    price: 1750,
  },

  {
    title: "Gırgıriye Müzikali",
    category: "Tiyatro",
    venue:
      "Bornova Aşık Veysel Açıkhava",
    district: "Bornova",
    date: "7 Eylül 2026",
    price: 1315,
  },

  {
    title: "Boheme Beach x ZAMNA",
    category: "Festival",
    venue: "Boheme Beach",
    district: "Çeşme",
    date: "24 Ağustos 2026",
    price: 2500,
  },

  {
    title: "Gratis Fest İzmir",
    category: "Festival",
    venue: "İzmir Arena",
    district: "Bayraklı",
    date: "11 Eylül 2026",
    price: 2000,
    campaign: true,
  },

  {
    title: "Mahmut Orhan",
    category: "Konser",
    venue: "Sommer Klein Çeşme",
    district: "Çeşme",
    date: "18 Ağustos 2026",
    price: 2250,
  },

  {
    title:
      "Hayrettin ile Kaos Night",
    category: "Stand-up",
    venue:
      "Kültürpark Açıkhava Tiyatrosu",
    district: "Konak",
    date: "11 Eylül 2026",
    price: 2964,
  },

  {
    title:
      "Ata Demirer Gazinosu İzmir",
    category: "Stand-up",
    venue:
      "Kültürpark Açıkhava Tiyatrosu",
    district: "Konak",
    date: "20 Eylül 2026",
    price: 3520,
  },

  {
    title: "Hayko Cepkin İzmir",
    category: "Konser",
    venue:
      "Alsancak Tarihi Havagazı Fabrikası",
    district: "Konak",
    date: "19 Eylül 2026",
    price: 1350,
  },

  {
    title: "Zengin Mutfağı",
    category: "Tiyatro",
    venue:
      "Kültürpark Açıkhava Tiyatrosu",
    district: "Konak",
    date: "23 Eylül 2026",
    price: 1850,
  },
];

/* =========================
   ANTALYA
========================= */

const antalyaSeeds: Seed[] = [
  {
    title: "Antalya Festivali",
    category: "Festival",
    venue: "Lara Beach",
    district: "Muratpaşa",
    date: "17 Ağustos 2026",
    price: 1500,
  },

  {
    title: "Derya Bedavacı Konseri",
    category: "Konser",
    venue: "Antalya Açıkhava",
    district: "Muratpaşa",
    date: "18 Ağustos 2026",
    price: 2000,
  },

  {
    title: "Dedublüman",
    category: "Konser",
    venue: "Antalya Açıkhava",
    district: "Muratpaşa",
    date: "17 Eylül 2026",
    price: 1250,
  },

  {
    title: "Anadolu Ateşi",
    category: "Tiyatro",
    venue: "Aspendos Antik Tiyatro",
    district: "Serik",
    date: "7 Eylül 2026",
    price: 1600,
  },

  {
    title: "Sertab Erener Antalya",
    category: "Konser",
    venue: "Antalya Açıkhava",
    district: "Muratpaşa",
    date: "8 Eylül 2026",
    price: 2350,
  },

  {
    title: "Emir Can İğrek Antalya",
    category: "Konser",
    venue: "Antalya Açıkhava",
    district: "Muratpaşa",
    date: "11 Eylül 2026",
    price: 1650,
  },

  {
    title:
      "Kerimcan Durmaz Roman Gecesi",
    category: "Konser",
    venue: "Antalya Bahçe",
    district: "Muratpaşa",
    date: "19 Eylül 2026",
    price: 990,
  },

  {
    title: "Jekyll & Hyde",
    category: "Tiyatro",
    venue: "Antalya Açıkhava",
    district: "Muratpaşa",
    date: "29 Eylül 2026",
    price: 1429,
  },

  {
    title: "Candles and Echoes",
    category: "Konser",
    venue: "Day One Beach Club",
    district: "Konyaaltı",
    date: "10 Ekim 2026",
    price: 1190,
  },

  {
    title: "Mabel Matiz Antalya",
    category: "Konser",
    venue: "Antalya Açıkhava",
    district: "Muratpaşa",
    date: "11 Ekim 2026",
    price: 2100,
  },
];

/* =========================
   BURSA
========================= */

const bursaSeeds: Seed[] = [
  {
    title: "Yıldız Tilbe Bursa",
    category: "Konser",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "17 Ağustos 2026",
    price: 3705,
  },

  {
    title:
      "Aşkın Nur Yengi Konseri",
    category: "Konser",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "8 Eylül 2026",
    price: 1100,
  },

  {
    title:
      "Gırgıriye Müzikali Bursa",
    category: "Tiyatro",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "24 Eylül 2026",
    price: 2192,
  },

  {
    title: "Yaşar",
    category: "Konser",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "26 Eylül 2026",
    price: 5016,
  },

  {
    title: "Mert Demir",
    category: "Konser",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "14 Eylül 2026",
    price: 1026,
  },

  {
    title: "7 Kocalı Hürmüz",
    category: "Tiyatro",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "26 Eylül 2026",
    price: 0,
    soon: true,
  },

  {
    title:
      "Ata Demirer Gazinosu Bursa",
    category: "Stand-up",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "12 Ekim 2026",
    price: 3520,
  },

  {
    title:
      "Gökhan Türkmen Bursa",
    category: "Konser",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "31 Ekim 2026",
    price: 1250,
  },

  {
    title: "mor ve ötesi Bursa",
    category: "Konser",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "20 Ekim 2026",
    price: 1500,
  },

  {
    title: "Semicenk Konseri",
    category: "Konser",
    venue:
      "Bursa Kültürpark Açıkhava Tiyatrosu",
    district: "Osmangazi",
    date: "8 Kasım 2026",
    price: 2250,
  },
];

/* =========================
   ESKİŞEHİR
========================= */

const eskisehirSeeds: Seed[] = [
  {
    title:
      "Eskişehir Gençlik Festivali",
    category: "Festival",
    venue: "Milyon Performance Hall",
    district: "Tepebaşı",
    date: "9 Ekim 2026",
    price: 490,
  },

  {
    title: "Stand-up Eskişehir",
    category: "Stand-up",
    venue:
      "Atatürk Kültür Merkezi",
    district: "Odunpazarı",
    date: "14 Ekim 2026",
    price: 300,
  },

  {
    title:
      "Eskişehir Konser Gecesi",
    category: "Konser",
    venue:
      "Vecihi Hürkuş Havacılık Parkı",
    district: "Tepebaşı",
    date: "22 Ekim 2026",
    price: 620,
  },

  {
    title: "Tiyatro Akşamı",
    category: "Tiyatro",
    venue:
      "Eskişehir Kültür Merkezi",
    district: "Odunpazarı",
    date: "28 Ekim 2026",
    price: 350,
  },

  {
    title:
      "Porsuk Müzik Festivali",
    category: "Festival",
    venue: "Eskişehir Açıkhava",
    district: "Tepebaşı",
    date: "3 Kasım 2026",
    price: 580,
  },

  {
    title: "Eskişehir Live",
    category: "Konser",
    venue: "Milyon Performance Hall",
    district: "Tepebaşı",
    date: "8 Kasım 2026",
    price: 650,
  },

  {
    title: "Komedi Sahnesi",
    category: "Stand-up",
    venue:
      "Atatürk Kültür Merkezi",
    district: "Odunpazarı",
    date: "13 Kasım 2026",
    price: 380,
  },

  {
    title: "Rock Eskişehir",
    category: "Konser",
    venue: "Eskişehir Arena",
    district: "Tepebaşı",
    date: "19 Kasım 2026",
    price: 720,
  },

  {
    title: "Porsuk Nights",
    category: "Konser",
    venue: "Kanlıkavak Parkı",
    district: "Odunpazarı",
    date: "24 Kasım 2026",
    price: 470,
  },

  {
    title: "Sahne Eskişehir",
    category: "Tiyatro",
    venue:
      "Eskişehir Kültür Merkezi",
    district: "Odunpazarı",
    date: "30 Kasım 2026",
    price: 420,
  },
];

/* =========================
   EVENT ÜRETİMİ
========================= */

function createCityEvents(
  startId: number,
  city: string,
  seeds: Seed[]
) {
  return seeds.map(
    (seed, index) =>
      createEvent(
        startId + index,
        index + 1,
        city,
        seed
      )
  );
}

export const events: EventItem[] = [
  ...createCityEvents(
    1,
    "İstanbul",
    istanbulSeeds
  ),

  ...createCityEvents(
    11,
    "Ankara",
    ankaraSeeds
  ),

  ...createCityEvents(
    21,
    "İzmir",
    izmirSeeds
  ),

  ...createCityEvents(
    31,
    "Antalya",
    antalyaSeeds
  ),

  ...createCityEvents(
    41,
    "Bursa",
    bursaSeeds
  ),

  ...createCityEvents(
    51,
    "Eskişehir",
    eskisehirSeeds
  ),
];

/* =========================
   YARDIMCI FONKSİYONLAR
========================= */

export function getEventById(
  id: number | string
) {
  return events.find(
    (event) =>
      String(event.id) === String(id)
  );
}

export function getEventsByCity(
  city: string
) {
  return events.filter(
    (event) =>
      event.city === city
  );
}

export function getEventsByCategory(
  category: string
) {
  return events.filter(
    (event) =>
      event.category === category
  );
}

export function getEventsByDistrict(
  district: string
) {
  return events.filter(
    (event) =>
      event.district === district
  );
}

export function getDistrictsByCity(
  city: string
) {
  return Array.from(
    new Set(
      events
        .filter(
          (event) =>
            event.city === city
        )
        .map(
          (event) =>
            event.district
        )
    )
  );
}