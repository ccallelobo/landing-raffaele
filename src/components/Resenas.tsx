"use client";

import { useReveal } from "@/hooks/useReveal";
import type { SanityResena } from "@/lib/sanity";
import { useTranslations } from "next-intl";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-gold" : "text-moss/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface Props {
  data?: SanityResena[];
}

export default function Resenas({ data }: Props) {
  useReveal();
  const t = useTranslations("reviews");

  const fallback: SanityResena[] = [
    {
      _id: "1",
      nombre: t("fallback.review1.name"),
      tratamiento: t("fallback.review1.treatment"),
      texto: t("fallback.review1.text"),
      estrellas: 5,
    },
    {
      _id: "2",
      nombre: t("fallback.review2.name"),
      tratamiento: t("fallback.review2.treatment"),
      texto: t("fallback.review2.text"),
      estrellas: 5,
    },
    {
      _id: "3",
      nombre: t("fallback.review3.name"),
      tratamiento: t("fallback.review3.treatment"),
      texto: t("fallback.review3.text"),
      estrellas: 5,
    },
    {
      _id: "4",
      nombre: t("fallback.review4.name"),
      tratamiento: t("fallback.review4.treatment"),
      texto: t("fallback.review4.text"),
      estrellas: 5,
    },
    {
      _id: "5",
      nombre: t("fallback.review5.name"),
      tratamiento: t("fallback.review5.treatment"),
      texto: t("fallback.review5.text"),
      estrellas: 5,
    },
    {
      _id: "6",
      nombre: t("fallback.review6.name"),
      tratamiento: t("fallback.review6.treatment"),
      texto: t("fallback.review6.text"),
      estrellas: 5,
    },
  ];

  const resenas = data && data.length > 0 ? data : fallback;

  return (
    <section id="resenas" className="py-28 md:py-40 bg-stone">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div className="reveal">
            <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              {t("label")}
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-noir">
              {t("title")}
              <br />
              <em className="italic text-gold">{t("titleHighlight")}</em>
            </h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-moss text-[15px] leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {resenas.map((r) => (
            <div
              key={r._id}
              className="reveal bg-stone p-8 md:p-10 border border-moss/30 hover:border-gold/30 transition-all duration-500 group"
            >
              {/* Decorative quote */}
              <span className="block font-display text-[48px] leading-none text-gold/20 mb-4 select-none">
                &ldquo;
              </span>

              {/* Review text */}
              <p className="text-noir/70 text-[15px] leading-relaxed mb-6">
                {r.texto}
              </p>

              {/* Stars */}
              <Stars count={r.estrellas} />

              {/* Divider */}
              <span className="block w-8 h-px bg-moss/40 my-5 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-[17px] text-noir leading-tight">
                    {r.nombre}
                  </p>
                  <p className="text-moss text-[12px] tracking-[0.1em] uppercase mt-1">
                    {r.tratamiento}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
