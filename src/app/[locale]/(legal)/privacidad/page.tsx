import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://landing-raffaele.vercel.app";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  const url =
    locale === "es"
      ? `${BASE_URL}/es/privacidad`
      : `${BASE_URL}/it/privacy`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        es: `${BASE_URL}/es/privacidad`,
        it: `${BASE_URL}/it/privacy`,
      },
    },
  };
}

export default async function PrivacidadPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <main className="bg-stone min-h-screen">
      {/* Header */}
      <div className="bg-noir py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-8 md:px-12">
          <Link
            href="/"
            className="text-gold text-[12px] font-semibold tracking-[0.2em] uppercase hover:text-white transition-colors"
          >
            &larr; {t("backToHome")}
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-white mt-6">
            {t("privacy.title")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="prose prose-lg max-w-none text-noir/70 space-y-8">
          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section1.title")}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: t.raw("privacy.section1.content"),
              }}
            />
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section2.title")}
            </h2>
            <p>{t("privacy.section2.intro")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {(t.raw("privacy.section2.items") as string[]).map(
                (item: string, i: number) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section3.title")}
            </h2>
            <p>{t("privacy.section3.intro")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {(t.raw("privacy.section3.items") as string[]).map(
                (item: string, i: number) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section4.title")}
            </h2>
            <p>{t("privacy.section4.intro")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {(t.raw("privacy.section4.items") as string[]).map(
                (item: string, i: number) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section5.title")}
            </h2>
            <p>{t("privacy.section5.content")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section6.title")}
            </h2>
            <p>{t("privacy.section6.content")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section7.title")}
            </h2>
            <p>{t("privacy.section7.intro")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {(t.raw("privacy.section7.items") as string[]).map(
                (item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                )
              )}
            </ul>
            <p className="mt-4">{t("privacy.section7.outro")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section8.title")}
            </h2>
            <p>{t("privacy.section8.content")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("privacy.section9.title")}
            </h2>
            <p>{t("privacy.section9.content")}</p>
          </section>

          <p className="text-sm text-noir/50 pt-8 border-t border-noir/10">
            {t("lastUpdated")}
          </p>
        </div>
      </div>
    </main>
  );
}
