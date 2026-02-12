import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Valentine's Day, Zeynep Sude 💌",
  description:
    "Seninle her gün bir kutlama. 14 Şubat sevgililer günün kutlu olsun.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
