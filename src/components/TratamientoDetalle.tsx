"use client";

import { useReveal } from "@/hooks/useReveal";
import { urlFor } from "@/lib/sanity";
import type { SanityTratamiento } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface Props {
  tratamiento: SanityTratamiento;
  zona: string;
  zonaSlug: string;
}

export default function TratamientoDetalle({
  tratamiento,
  zona,
  zonaSlug,
}: Props) {
  useReveal();
  const t = useTranslations("zonas");
  const tResults = useTranslations("results");

  const volverKeys: Record<string, string> = {
    facial: "volverZonaFacial",
    corporal: "volverZonaCorporal",
    "skin-quality": "volverZonaSkinQuality",
    capilar: "volverZonaCapilar",
  };
  const volverKey = volverKeys[zona] || "volverZonaFacial";

  const resultados = tratamiento.resultados || [];

  return (
    <>
      {/* Treatment Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            {tratamiento.imagen && (
              <div className="reveal relative aspect-[4/3] overflow-hidden">
                <img
                  src={urlFor(tratamiento.imagen).width(800).height(600).url()}
                  alt={tratamiento.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              className={`reveal ${!tratamiento.imagen ? "lg:col-span-2 max-w-3xl" : ""}`}
            >
              {tratamiento.descripcion && tratamiento.descripcion.length > 0 && (
                <div className="prose prose-lg text-moss max-w-none prose-headings:text-noir prose-headings:font-display prose-a:text-gold prose-strong:text-noir">
                  <PortableText value={tratamiento.descripcion} />
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href={{
                    pathname: "/tratamientos/[zona]",
                    params: { zona: zonaSlug },
                  }}
                  className="px-7 py-3 text-[12px] font-semibold tracking-[0.2em] uppercase border border-moss/40 text-noir hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {t(volverKey)}
                </Link>
                <a
                  href="https://wa.me/34604894697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 text-[12px] font-semibold tracking-[0.2em] uppercase bg-gold text-white hover:bg-gold-dark transition-all duration-300"
                >
                  {t("reservarConsulta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Results (Before/After) */}
      {resultados.length > 0 && (
        <section className="py-28 md:py-40 bg-stone">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12">
            <div className="reveal mb-20 md:mb-28">
              <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
                {tResults("label")}
              </span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-noir">
                {t("resultadosTratamiento")}
                <br />
                <em className="italic text-gold">
                  {t("resultadosTratamientoHighlight")}
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger">
              {resultados.map((resultado) => {
                const beforeImg = urlFor(resultado.imagenAntes)
                  .width(600)
                  .height(800)
                  .url();
                const afterImg = urlFor(resultado.imagenDespues)
                  .width(600)
                  .height(800)
                  .url();

                return (
                  <div key={resultado._key} className="reveal">
                    <BeforeAfterSlider
                      className="aspect-[3/4] w-full"
                      beforeImage={beforeImg}
                      afterImage={afterImg}
                      beforeAlt={`${tratamiento.nombre} - ${tResults("before")}`}
                      afterAlt={`${tratamiento.nombre} - ${tResults("after")}`}
                    />
                    {resultado.descripcion && (
                      <div className="mt-4">
                        <p className="text-moss text-[14px]">
                          {resultado.descripcion}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
