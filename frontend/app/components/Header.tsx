import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white">
            B
          </div>

          <div>
            <h1 className="text-2xl font-bold text-violet-700">
              Biletixa
            </h1>

            <p className="text-xs text-slate-500">
              Etkinlik Platformu
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 font-medium text-slate-700 lg:flex">
          <Link
            href="/events"
            className="transition hover:text-violet-600"
          >
            Etkinlikler
          </Link>

          <Link
            href="/events?category=Konser"
            className="transition hover:text-violet-600"
          >
            Konser
          </Link>

          <Link
            href="/events?category=Festival"
            className="transition hover:text-violet-600"
          >
            Festival
          </Link>

          <Link
            href="/events?category=Tiyatro"
            className="transition hover:text-violet-600"
          >
            Tiyatro
          </Link>

          <Link
            href="/events?category=Stand-up"
            className="transition hover:text-violet-600"
          >
            Stand-up
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Giriş Yap
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-violet-600 px-5 py-2 font-medium text-white transition hover:bg-violet-700"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </header>
  );
}