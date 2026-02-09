"use client";

import { useReveal } from "@/hooks/useReveal";
import { useTranslations } from "next-intl";

const placeholders = Array.from({ length: 8 }, (_, i) => `Logo ${i + 1}`);

export default function MarcasTecnologias() {
  useReveal();
  const t = useTranslations("marcas");

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
            {t("label")}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-noir">
            {t("title")}{" "}
            <em className="italic text-gold">{t("titleHighlight")}</em>
          </h2>
        </div>
      </div>

      {/* Marquee carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...placeholders, ...placeholders].map((label, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-6 w-[160px] h-[80px] border border-moss/20 flex items-center justify-center bg-stone/30"
            >
              <span className="text-moss/40 text-[13px] font-medium tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes for marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
