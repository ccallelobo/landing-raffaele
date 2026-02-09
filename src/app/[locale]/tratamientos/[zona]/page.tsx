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
import { slugToZona, allZoneSlugs } from "@/lib/zonas";
import Image from "next/image";
import type { Metadata } from "next";

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

  return {
    title: `${t(`${zonaKey}.title`)} | Dr. Raffaele Del Prete`,
    description: t(`${zonaKey}.heroDescription`),
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
        {/* Zone Hero */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end bg-noir overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage}
              alt={heroTitle}
              fill
              className="object-cover opacity-40"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 pb-16 md:pb-24 w-full">
            <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              {t("sectionLabel")}
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] text-white mb-6">
              {heroTitle}
              <br />
              <em className="italic text-gold">
                {t(`${zonaKey}.heroTitleHighlight`)}
              </em>
            </h1>
            <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed max-w-xl">
              {heroDescription}
            </p>
          </div>
        </section>

        <ZonaTratamientos
          tratamientos={tratamientos}
          zona={zona}
        />

        <Footer />
      </main>
    </>
  );
}
