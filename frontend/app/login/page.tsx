"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  loginUser,
  saveCurrentUser,
} from "../services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await loginUser(
        email,
        password
      );

      saveCurrentUser(user);

      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Giriş yapılamadı.";

      if (
        message
          .toLocaleLowerCase("tr-TR")
          .includes("doğrulanmam")
      ) {
        router.push(
          `/verify?email=${encodeURIComponent(
            email
          )}`
        );
        return;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <Link
          href="/"
          className="text-3xl font-black"
        >
          Bilet
          <span className="text-violet-600">
            ixa
          </span>
        </Link>

        <h1 className="mt-8 text-3xl font-black">
          Giriş Yap
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Hesabına giriş yaparak
          biletlerini ve favorilerini
          görüntüleyebilirsin.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-bold">
              E-posta
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Şifre
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 px-5 py-3 font-black text-white disabled:opacity-50"
          >
            {loading
              ? "Giriş yapılıyor..."
              : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Hesabın yok mu?{" "}
          <Link
            href="/register"
            className="font-black text-violet-600"
          >
            Üye Ol
          </Link>
        </p>
      </div>
    </main>
  );
}