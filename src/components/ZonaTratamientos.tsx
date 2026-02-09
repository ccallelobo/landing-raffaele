"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanityTratamiento } from "@/lib/sanity";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { zonaToSlug } from "@/lib/zonas";

interface Props {
  tratamientos: SanityTratamiento[];
  zona: string;
}

export default function ZonaTratamientos({
  tratamientos,
  zona,
}: Props) {
  useReveal();
  const t = useTranslations("zonas");
  const locale = useLocale();

  const zonaSlug = zonaToSlug[locale]?.[zona] || zona;

  return (
    <section id="grid-tratamientos" className="py-28 md:py-40 bg-stone">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {tratamientos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {tratamientos.map((item) => (
              <Link
                key={item._id}
                href={{
                  pathname: "/tratamientos/[zona]/[tratamiento]",
                  params: {
                    zona: zonaSlug,
                    tratamiento: item.slug?.current || item._id,
                  },
                }}
                className="reveal group cursor-pointer bg-stone overflow-hidden border border-moss/40 hover:border-gold/30 transition-all duration-500 text-left block"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  {item.imagen ? (
                    <Image
                      src={urlFor(item.imagen).width(600).height(400).url()}
                      alt={item.nombre}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-moss/20" />
                  )}
                  <div className="absolute inset-0 bg-noir/10 group-hover:bg-noir/0 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-7 md:p-8">
                  <h3 className="font-display text-[24px] md:text-[28px] text-noir mb-3 leading-tight transition-colors duration-300 group-hover:text-gold-dark">
                    {item.nombre}
                  </h3>

                  <span className="block w-8 h-px bg-moss/40 mb-4 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />

                  {item.resumenCorto && (
                    <p className="text-moss text-[14px] leading-relaxed">
                      {item.resumenCorto}
                    </p>
                  )}

                  {/* Hover arrow */}
                  <div className="mt-6 flex items-center gap-2 text-gold opacity-0 translate-x-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    <span className="text-[12px] font-semibold tracking-[0.15em] uppercase">
                      {t("masInfo")}
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
        ) : (
          <p className="text-moss text-center text-[15px]">
            {t("sinTratamientos")}
          </p>
        )}
      </div>
    </section>
  );
}
