export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-violet-400">
            Biletixa
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Konser, tiyatro, festival, stand-up ve daha birçok
            etkinliği tek platformdan keşfet.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">
            Kurumsal
          </h3>

          <ul className="space-y-2 text-slate-300">
            <li>Hakkımızda</li>
            <li>İletişim</li>
            <li>Kariyer</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">
            Etkinlikler
          </h3>

          <ul className="space-y-2 text-slate-300">
            <li>Konser</li>
            <li>Tiyatro</li>
            <li>Festival</li>
            <li>Stand-up</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">
            Bizi Takip Et
          </h3>

          <div className="flex gap-3 text-2xl">
            <span>📘</span>
            <span>📷</span>
            <span>▶️</span>
            <span>🎵</span>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            © 2026 Biletixa
            <br />
            Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}