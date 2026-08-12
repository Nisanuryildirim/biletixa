import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biletixa",
  description: "Etkinlik ve bilet platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}