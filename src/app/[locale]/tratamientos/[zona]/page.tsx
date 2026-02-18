import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZonaTratamientos from "@/components/ZonaTratamientos";
import {
  getTratamientosPorZona,
  getZonaConfig,
  urlFor,
} from "@/lib/sanity";
import { slugToZona, allZoneSlugs, zonaToSlug } from "@/lib/zonas";
import ZonaHero from "@/components/ZonaHero";
import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://landing-raffaele.vercel.app";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; zona: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, zona: zonaSlug } = await params;
  const zona = slugToZona[zonaSlug];
  if (!zona) return {};

  const t = await getTranslations({ locale, namespace: "zonas" });
  const zonaKey = zona as "facial" | "corporal" | "skin-quality" | "capilar";
  const title = `${t(`${zonaKey}.title`)} | Dr. Raffaele Del Prete`;
  const description = t(`${zonaKey}.heroDescription`);

  const esSlug = zonaToSlug.es[zona];
  const itSlug = zonaToSlug.it[zona];
  const url =
    locale === "es"
      ? `${BASE_URL}/es/tratamientos/${esSlug}`
      : `${BASE_URL}/it/trattamenti/${itSlug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    alternates: {
      canonical: url,
      languages: {
        es: `${BASE_URL}/es/tratamientos/${esSlug}`,
        it: `${BASE_URL}/it/trattamenti/${itSlug}`,
      },
    },
  };
}

export function generateStaticParams() {
  return allZoneSlugs.map((zona) => ({ zona }));
}

export default async function ZonaPage({ params }: Props) {
  const { locale, zona: zonaSlug } = await params;

  const zona = slugToZona[zonaSlug];
  if (!zona) notFound();

  const [tratamientos, zonaConfig] = await Promise.all([
    getTratamientosPorZona(zona),
    getZonaConfig(zona),
  ]);

  const doctorImageUrl = zonaConfig?.imagenDoctor
    ? urlFor(zonaConfig.imagenDoctor).width(800).auto("format").url()
    : null;

  const t = await getTranslations({ locale, namespace: "zonas" });
  const zonaKey = zona as "facial" | "corporal" | "skin-quality" | "capilar";

  const heroTitle =
    (locale === "es" ? zonaConfig?.tituloES : zonaConfig?.tituloIT) ||
    t(`${zonaKey}.heroTitle`);
  const heroDescription =
    (locale === "es" ? zonaConfig?.descripcionES : zonaConfig?.descripcionIT) ||
    t(`${zonaKey}.heroDescription`);
  const heroImage = zonaConfig?.imagen
    ? urlFor(zonaConfig.imagen).width(1200).height(600).url()
    : null;

  return (
    <>
      <Navbar />
      <main
        className="relative"
        style={{ clipPath: "inset(0)", contain: "paint" }}
      >
        <ZonaHero
          heroImage={heroImage}
          doctorImageUrl={doctorImageUrl}
          sectionLabel={t("sectionLabel")}
          heroTitle={heroTitle}
          heroTitleHighlight={t(`${zonaKey}.heroTitleHighlight`)}
          heroDescription={heroDescription}
          readMoreLabel={t("readMore")}
        />

        <ZonaTratamientos
          tratamientos={tratamientos}
          zona={zona}
        />

        <Footer />
      </main>
    </>
  );
}
