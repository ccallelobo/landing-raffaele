import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.cookiePolicy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CookiesPage({ params }: Props) {
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
            {t("cookiePolicy.title")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="prose prose-lg max-w-none text-noir/70 space-y-8">
          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("cookiePolicy.section1.title")}
            </h2>
            <p>{t("cookiePolicy.section1.content")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("cookiePolicy.section2.title")}
            </h2>

            <h3 className="font-display text-xl text-noir mb-2 mt-6">
              {t("cookiePolicy.section2.technical.title")}
            </h3>
            <p>{t("cookiePolicy.section2.technical.content")}</p>

            <h3 className="font-display text-xl text-noir mb-2 mt-6">
              {t("cookiePolicy.section2.analytics.title")}
            </h3>
            <p>{t("cookiePolicy.section2.analytics.content")}</p>

            <h3 className="font-display text-xl text-noir mb-2 mt-6">
              {t("cookiePolicy.section2.preferences.title")}
            </h3>
            <p>{t("cookiePolicy.section2.preferences.content")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("cookiePolicy.section3.title")}
            </h2>
            <p>{t("cookiePolicy.section3.intro")}</p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-noir/20">
                    <th className="text-left py-3 pr-4 font-semibold text-noir">
                      {t("cookiePolicy.section3.table.service")}
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold text-noir">
                      {t("cookiePolicy.section3.table.purpose")}
                    </th>
                    <th className="text-left py-3 font-semibold text-noir">
                      {t("cookiePolicy.section3.table.moreInfo")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-noir/10">
                    <td className="py-3 pr-4">
                      {t("cookiePolicy.section3.table.vercel")}
                    </td>
                    <td className="py-3 pr-4">
                      {t("cookiePolicy.section3.table.vercelPurpose")}
                    </td>
                    <td className="py-3">
                      <a
                        href="https://vercel.com/legal/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline"
                      >
                        {t("cookiePolicy.section3.table.vercelLink")}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("cookiePolicy.section4.title")}
            </h2>
            <p>{t("cookiePolicy.section4.intro")}</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p className="mt-4">{t("cookiePolicy.section4.outro")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("cookiePolicy.section5.title")}
            </h2>
            <p>{t("cookiePolicy.section5.content")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">
              {t("cookiePolicy.section6.title")}
            </h2>
            <p>{t("cookiePolicy.section6.intro")}</p>
            <p
              className="mt-2"
              dangerouslySetInnerHTML={{
                __html: t.raw("cookiePolicy.section6.content"),
              }}
            />
          </section>

          <p className="text-sm text-noir/50 pt-8 border-t border-noir/10">
            {t("lastUpdated")}
          </p>
        </div>
      </div>
    </main>
  );
}
