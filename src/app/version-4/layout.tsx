import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import CookieBanner from "@/components/CookieBanner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Versión 4 | Dr. Raffaele Del Prete",
  description: "Vista previa de la versión 4 del sitio web.",
};

export default async function VersionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load Spanish messages for version pages
  const messages = (await import("@/messages/es.json")).default;

  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <NextIntlClientProvider locale="es" messages={messages}>
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
