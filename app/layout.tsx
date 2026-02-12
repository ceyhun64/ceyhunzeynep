import type { Metadata } from "next";
import { Inter, Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Zeynep❤️Ceyhun - Sevgililer Günü",
  description: "Sevgililer günümüz kutlu olsun yavrum!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${dancing.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
