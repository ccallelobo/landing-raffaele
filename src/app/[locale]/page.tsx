import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tratamientos from "@/components/Tratamientos";
import MarcasTecnologias from "@/components/MarcasTecnologias";
import SobreMi from "@/components/SobreMi";
import Resultados from "@/components/Resultados";
import Resenas from "@/components/Resenas";
import FormularioMedicos from "@/components/FormularioMedicos";
import Footer from "@/components/Footer";
import { getResultados, getResenas, getDoctorProfile, urlFor } from "@/lib/sanity";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://landing-raffaele.vercel.app";

// Revalidate Sanity data every 60 seconds
export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}`,
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

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const [resultados, resenas, doctorProfile] = await Promise.all([
    getResultados(),
    getResenas(),
    getDoctorProfile(),
  ]);

  const heroImageUrl = doctorProfile?.imagenHero
    ? urlFor(doctorProfile.imagenHero).width(1100).auto("format").url()
    : undefined;
  const sobreMiImageUrl = doctorProfile?.imagenSobreMi
    ? urlFor(doctorProfile.imagenSobreMi).width(800).auto("format").url()
    : undefined;

  const jsonLd = buildHomeJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main
        className="relative"
        style={{ clipPath: "inset(0)", contain: "paint" }}
      >
        <Hero heroImage={heroImageUrl} />
        <Tratamientos />
        <MarcasTecnologias />
        <SobreMi sobreMiImage={sobreMiImageUrl} />
        <Resultados data={resultados} />
        <Resenas data={resenas} />
        <FormularioMedicos />
        <Footer />
      </main>
    </>
  );
}

/* ── JSON-LD Structured Data ─────────────────────────── */

function buildHomeJsonLd(locale: string) {
  const isES = locale === "es";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${BASE_URL}/#clinica-es`,
        name: "Dr. Raffaele Del Prete - Medicina Estética",
        description: isES
          ? "Clínica de medicina estética y cirugía plástica en Dos Hermanas, Sevilla. Tratamientos faciales, corporales y procedimientos con los más altos estándares de calidad."
          : "Clinica di medicina estetica e chirurgia plastica a Dos Hermanas, Siviglia. Trattamenti facciali, corporei e procedure con i più alti standard di qualità.",
        url: `${BASE_URL}/es`,
        telephone: "+34604894697",
        email: "dr.rafdelprete@gmail.com",
        image: `${BASE_URL}/hero-doctor-v3.webp`,
        priceRange: "$$",
        medicalSpecialty: "PlasticSurgery",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calle Paris n 28",
          addressLocality: "Dos Hermanas",
          addressRegion: "Sevilla",
          postalCode: "41089",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 37.2832,
          longitude: -5.9222,
        },
        sameAs: [
          "https://www.instagram.com/dr_raffaele_delprete/",
          "https://wa.me/34604894697",
        ],
      },
      {
        "@type": "MedicalBusiness",
        "@id": `${BASE_URL}/#clinica-it`,
        name: "Dr. Raffaele Del Prete - Medicina Estetica",
        description: isES
          ? "Consulta de medicina estética en Frattamaggiore, Nápoles. Tratamientos personalizados con enfoque artístico y tecnología de vanguardia."
          : "Studio di medicina estetica a Frattamaggiore, Napoli. Trattamenti personalizzati con approccio artistico e tecnologia all'avanguardia.",
        url: `${BASE_URL}/it`,
        telephone: "+393760976953",
        email: "dr.rafdelprete@gmail.com",
        image: `${BASE_URL}/hero-doctor-v3.webp`,
        priceRange: "$$",
        medicalSpecialty: "PlasticSurgery",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via Riscatto n 5",
          addressLocality: "Frattamaggiore",
          addressRegion: "Napoli",
          postalCode: "80027",
          addressCountry: "IT",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 40.9386,
          longitude: 14.2745,
        },
        sameAs: [
          "https://www.instagram.com/dr_raffaele_delprete/",
          "https://wa.me/393760976953",
        ],
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#doctor`,
        name: "Dr. Raffaele Del Prete",
        jobTitle: isES ? "Médico Estético" : "Medico Estetico",
        description: isES
          ? "Médico-cirujano especializado en medicina estética, con formación en la Universidad Federico II de Nápoles."
          : "Medico-chirurgo specializzato in medicina estetica, formato all'Università Federico II di Napoli.",
        image: `${BASE_URL}/hero-doctor-v3.webp`,
        email: "dr.rafdelprete@gmail.com",
        telephone: "+34604894697",
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Università Luigi Vanvitelli di Napoli",
          },
          {
            "@type": "EducationalOrganization",
            name: "Università Federico II di Napoli",
          },
        ],
        worksFor: [
          { "@id": `${BASE_URL}/#clinica-es` },
          { "@id": `${BASE_URL}/#clinica-it` },
        ],
        sameAs: ["https://www.instagram.com/dr_raffaele_delprete/"],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        name: "Dr. Raffaele Del Prete",
        url: BASE_URL,
        inLanguage: ["es", "it"],
        publisher: { "@id": `${BASE_URL}/#doctor` },
      },
    ],
  };
}
