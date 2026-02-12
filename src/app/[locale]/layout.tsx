import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppBubble from "@/components/WhatsAppBubble";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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

type Props = {
  params: Promise<{ locale: string }>;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://landing-raffaele.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(BASE_URL),
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "it_IT",
      alternateLocale: locale === "es" ? "it_IT" : "es_ES",
      siteName: "Dr. Raffaele Del Prete",
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}`,
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        it: `${BASE_URL}/it`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "es" | "it")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppBubble />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
