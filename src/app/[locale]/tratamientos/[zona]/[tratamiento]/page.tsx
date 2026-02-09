import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TratamientoDetalle from "@/components/TratamientoDetalle";
import {
  getTratamientoBySlug,
  getTratamientosPorZona,
  urlFor,
} from "@/lib/sanity";
import { slugToZona, allZoneSlugs, zonaToSlug } from "@/lib/zonas";
import Image from "next/image";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; zona: string; tratamiento: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, zona: zonaSlug, tratamiento: tratamientoSlug } = await params;
  const zona = slugToZona[zonaSlug];
  if (!zona) return {};

  const tratamiento = await getTratamientoBySlug(tratamientoSlug, zona);
  if (!tratamiento) return {};

  return {
    title: `${tratamiento.nombre} | Dr. Raffaele Del Prete`,
    description: tratamiento.resumenCorto || `${tratamiento.nombre} - Dr. Raffaele Del Prete`,
  };
}

export async function generateStaticParams() {
  const params: { zona: string; tratamiento: string }[] = [];

  for (const zonaSlug of allZoneSlugs) {
    const zona = slugToZona[zonaSlug];
    if (!zona) continue;
    const tratamientos = await getTratamientosPorZona(zona);
    for (const t of tratamientos) {
      if (t.slug?.current) {
        params.push({ zona: zonaSlug, tratamiento: t.slug.current });
      }
    }
  }

  return params;
}

export default async function TratamientoPage({ params }: Props) {
  const { locale, zona: zonaSlug, tratamiento: tratamientoSlug } = await params;

  const zona = slugToZona[zonaSlug];
  if (!zona) notFound();

  const tratamiento = await getTratamientoBySlug(tratamientoSlug, zona);
  if (!tratamiento) notFound();

  const t = await getTranslations({ locale, namespace: "zonas" });

  const heroImage = tratamiento.imagen
    ? urlFor(tratamiento.imagen).width(1200).height(600).url()
    : null;

  // Get the localized zona slug for Link hrefs
  const localizedZonaSlug = zonaToSlug[locale]?.[zona] || zonaSlug;

  return (
    <>
      <Navbar />
      <main
        className="relative"
        style={{ clipPath: "inset(0)", contain: "paint" }}
      >
        {/* Treatment Hero */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end bg-noir overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage}
              alt={tratamiento.nombre}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 pb-16 md:pb-24 w-full">
            <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              {t("tratamientoLabel")}
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] text-white mb-4">
              {tratamiento.nombre}
            </h1>
            {tratamiento.resumenCorto && (
              <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed max-w-xl">
                {tratamiento.resumenCorto}
              </p>
            )}
          </div>
        </section>

        <TratamientoDetalle
          tratamiento={tratamiento}
          zona={zona}
          zonaSlug={localizedZonaSlug}
        />

        <Footer />
      </main>
    </>
  );
}
