"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Tratamientos() {
  useReveal();
  const t = useTranslations("zonas");

  const zonas = [
    {
      key: "facial" as const,
      slug: "facial",
      image:
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=1000&fit=crop&crop=face",
    },
    {
      key: "corporal" as const,
      slug: "corporal",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=1000&fit=crop",
    },
    {
      key: "skin-quality" as const,
      slug: "skin-quality",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=1000&fit=crop&crop=face",
    },
    {
      key: "capilar" as const,
      slug: "capilar",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1000&fit=crop&crop=face",
    },
  ];

  return (
    <section id="tratamientos" className="py-28 md:py-40 bg-stone">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div className="reveal">
            <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              {t("sectionLabel")}
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-noir">
              {t("sectionTitle")}
              <br />
              <em className="italic text-gold">{t("sectionTitleHighlight")}</em>
            </h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-moss text-[15px] leading-relaxed">
              {t("sectionDescription")}
            </p>
          </div>
        </div>

        {/* Zone cards — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger">
          {zonas.map((zona) => (
            <Link
              key={zona.key}
              href={{
                pathname: "/tratamientos/[zona]",
                params: { zona: zona.slug },
              }}
              className="reveal group relative overflow-hidden bg-noir"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <Image
                  src={zona.image}
                  alt={t(`${zona.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-70"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-white mb-3 leading-tight">
                  {t(`${zona.key}.title`)}
                </h3>

                <span className="block w-8 h-px bg-gold mb-4 transition-all duration-500 group-hover:w-16" />

                <p className="text-white/50 text-[14px] leading-relaxed mb-6 max-w-sm">
                  {t(`${zona.key}.description`)}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-gold opacity-80 translate-x-0 transition-all duration-500 group-hover:translate-x-2">
                  <span className="text-[12px] font-semibold tracking-[0.15em] uppercase">
                    {t("verTratamientos")}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
