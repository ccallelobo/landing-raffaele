import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SobreMiPageContent from "@/components/SobreMiPageContent";
import { getDoctorProfile, urlFor } from "@/lib/sanity";
import Image from "next/image";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutMePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function SobreMiPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutMePage" });
  const profile = await getDoctorProfile();

  const cvUrl = profile?.curriculumPDF?.asset?.url || undefined;

  const sellos = profile?.sellos?.map((s) => ({
    _key: s._key,
    nombre: s.nombre,
    imagenUrl: urlFor(s.imagen).width(288).height(288).url(),
    url: s.url,
  }));

  const imagenPaginaUrl = profile?.imagenPagina
    ? urlFor(profile.imagenPagina).width(800).auto("format").url()
    : undefined;

  return (
    <>
      <Navbar />
      <main
        className="relative"
        style={{ clipPath: "inset(0)", contain: "paint" }}
      >
        {/* Hero */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end bg-noir overflow-hidden">
          <Image
            src={imagenPaginaUrl || "/sobre-mi-doctor-v4.webp"}
            alt="Dr. Raffaele Del Prete"
            fill
            className="object-cover opacity-20 object-top"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 pb-16 md:pb-24 w-full">
            <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              {t("heroLabel")}
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] text-white">
              {t("heroTitle")}
              <br />
              <em className="italic text-gold">{t("heroTitleHighlight")}</em>
            </h1>
          </div>
        </section>

        <SobreMiPageContent
          cvUrl={cvUrl}
          sellos={sellos}
          imagenPaginaUrl={imagenPaginaUrl}
        />

        <Footer />
      </main>
    </>
  );
}
