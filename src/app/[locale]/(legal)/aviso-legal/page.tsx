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
  const t = await getTranslations({ locale, namespace: "legal.legalNotice" });
  const url =
    locale === "es"
      ? `${BASE_URL}/es/aviso-legal`
      : `${BASE_URL}/it/note-legali`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        es: `${BASE_URL}/es/aviso-legal`,
        it: `${BASE_URL}/it/note-legali`,
      },
    },
  };
}

export default async function AvisoLegalPage({ params }: Props) {
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
            {t("legalNotice.title")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="prose prose-lg max-w-none text-noir/70 space-y-8">
          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section1.title")}
            </h2>
            <p>{t("legalNotice.section1.intro")}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: t.raw("legalNotice.section1.content"),
              }}
            />
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section2.title")}
            </h2>
            <p>{t("legalNotice.section2.paragraph1")}</p>
            <p>{t("legalNotice.section2.paragraph2")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section3.title")}
            </h2>
            <p>{t("legalNotice.section3.intro")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {(t.raw("legalNotice.section3.items") as string[]).map(
                (item: string, i: number) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section4.title")}
            </h2>
            <p>{t("legalNotice.section4.paragraph1")}</p>
            <p>{t("legalNotice.section4.paragraph2")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section5.title")}
            </h2>
            <p>{t("legalNotice.section5.intro")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {(t.raw("legalNotice.section5.items") as string[]).map(
                (item: string, i: number) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section6.title")}
            </h2>
            <p>{t("legalNotice.section6.content")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section7.title")}
            </h2>
            <p>
              {t("legalNotice.section7.content")}{" "}
              <Link href="/privacidad" className="text-gold hover:underline">
                {t("privacy.title")}
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section8.title")}
            </h2>
            <p>
              {t("legalNotice.section8.content")}{" "}
              <Link href="/cookies" className="text-gold hover:underline">
                {t("cookiePolicy.title")}
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section9.title")}
            </h2>
            <p>{t("legalNotice.section9.content")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("legalNotice.section10.title")}
            </h2>
            <p>{t("legalNotice.section10.content")}</p>
          </section>

          <p className="text-sm text-noir/50 pt-8 border-t border-noir/10">
            {t("lastUpdated")}
          </p>
        </div>
      </div>
    </main>
  );
}
