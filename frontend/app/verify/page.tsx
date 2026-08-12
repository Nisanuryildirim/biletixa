"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email =
    searchParams.get("email") ?? "";

  const [code, setCode] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/backend/api/users/verify",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            "Doğrulama başarısız."
        );
      }

      router.push("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Doğrulama başarısız."
      );
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
          E-posta Doğrulama
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {email
            ? `${email} adresine gönderilen 6 haneli kodu gir.`
            : "E-posta adresine gönderilen 6 haneli kodu gir."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-bold">
              Doğrulama Kodu
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(event) =>
                setCode(
                  event.target.value
                    .replace(/\D/g, "")
                )
              }
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-2xl font-black tracking-[0.35em] outline-none focus:border-violet-500"
              placeholder="000000"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full rounded-xl bg-violet-600 px-5 py-3 font-black text-white disabled:opacity-50"
          >
            {loading
              ? "Doğrulanıyor..."
              : "E-postayı Doğrula"}
          </button>
        </form>
      </div>
    </main>
  );
}