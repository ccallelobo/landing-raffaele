import type { MetadataRoute } from "next";
import { getTratamientos } from "@/lib/sanity";
import { zonaToSlug } from "@/lib/zonas";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://landing-raffaele.vercel.app";

const ZONES = ["facial", "corporal", "skin-quality", "capilar"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tratamientos = await getTratamientos();
  const now = new Date();

  /* ── Static pages ──────────────────────────────────── */

  const staticPages: MetadataRoute.Sitemap = [
    // Home
    {
      url: `${BASE_URL}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: { es: `${BASE_URL}/es`, it: `${BASE_URL}/it` },
      },
    },
    {
      url: `${BASE_URL}/it`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: { es: `${BASE_URL}/es`, it: `${BASE_URL}/it` },
      },
    },
    // Sobre Mi / Chi Sono
    {
      url: `${BASE_URL}/es/sobre-mi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}/es/sobre-mi`,
          it: `${BASE_URL}/it/chi-sono`,
        },
      },
    },
    {
      url: `${BASE_URL}/it/chi-sono`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}/es/sobre-mi`,
          it: `${BASE_URL}/it/chi-sono`,
        },
      },
    },
    // Legal pages
    ...legalPages("privacidad", "privacy"),
    ...legalPages("aviso-legal", "note-legali"),
    ...legalPages("cookies", "cookie"),
  ];

  /* ── Zone pages ────────────────────────────────────── */

  const zonePages: MetadataRoute.Sitemap = ZONES.flatMap((zona) => {
    const esSlug = zonaToSlug.es[zona];
    const itSlug = zonaToSlug.it[zona];
    const langs = {
      es: `${BASE_URL}/es/tratamientos/${esSlug}`,
      it: `${BASE_URL}/it/trattamenti/${itSlug}`,
    };
    return [
      {
        url: langs.es,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
        alternates: { languages: langs },
      },
      {
        url: langs.it,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
        alternates: { languages: langs },
      },
    ];
  });

  /* ── Treatment pages ───────────────────────────────── */

  const treatmentPages: MetadataRoute.Sitemap = tratamientos.flatMap((t) => {
    if (!t.slug?.current) return [];
    const esZone = zonaToSlug.es[t.zona];
    const itZone = zonaToSlug.it[t.zona];
    if (!esZone || !itZone) return [];

    const slug = t.slug.current;
    const langs = {
      es: `${BASE_URL}/es/tratamientos/${esZone}/${slug}`,
      it: `${BASE_URL}/it/trattamenti/${itZone}/${slug}`,
    };
    return [
      {
        url: langs.es,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: langs },
      },
      {
        url: langs.it,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: langs },
      },
    ];
  });

  return [...staticPages, ...zonePages, ...treatmentPages];
}

/* ── Helper ──────────────────────────────────────────── */

function legalPages(
  esPath: string,
  itPath: string
): MetadataRoute.Sitemap {
  const langs = {
    es: `${BASE_URL}/es/${esPath}`,
    it: `${BASE_URL}/it/${itPath}`,
  };
  return [
    {
      url: langs.es,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: langs },
    },
    {
      url: langs.it,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: langs },
    },
  ];
}
