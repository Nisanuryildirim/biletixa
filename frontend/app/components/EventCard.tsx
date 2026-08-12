import Link from "next/link";

type EventCardProps = {
  id: number;
  image: string;
  title: string;
  category: string;
  location: string;
  date: string;
  price: string;
};

export default function EventCard({
  id,
  image,
  title,
  category,
  location,
  date,
  price,
}: EventCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <img
        src={image}
        alt={title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          {category}
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          📍 {location}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          📅 {date}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-lg font-bold text-violet-700">
            {price}
          </p>

          <Link
            href={`/event/${id}`}
            className="rounded-lg bg-violet-600 px-5 py-2 font-medium text-white transition hover:bg-violet-700"
          >
            İncele
          </Link>
        </div>
      </div>
    </div>
  );
}