"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface SobreMiProps {
  sobreMiImage?: string;
  imageScale?: string;
}

export default function SobreMi({
  sobreMiImage = "/hero-doctor-v3.webp",
  imageScale = "scale-75",
}: SobreMiProps) {
  useReveal();
  const t = useTranslations("aboutMe");

  const stats = [
    { value: t("stats.years"), label: t("stats.yearsLabel") },
    { value: t("stats.patients"), label: t("stats.patientsLabel") },
  ];

  return (
    <section id="sobre-mi" className="relative bg-moss overflow-hidden">
      {/* Decorative oversized text */}
      <div className="absolute top-12 right-0 hidden xl:block pointer-events-none select-none">
        <span className="font-display text-[18vw] text-noir/[0.02] leading-none tracking-[-0.04em]">
          R.
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-28 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Image column — asymmetric placement */}
          <div className="lg:col-span-5 reveal-left">
            <div className="relative">
              {/* Main image container */}
              <div className="aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-b from-stone via-stone to-moss overflow-hidden relative">
                {/* Side gradients for smooth edge blending */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-moss/40 via-transparent to-transparent" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-moss/20 via-transparent to-transparent" />
                <Image
                  src={sobreMiImage}
                  alt="Dr. Raffaele Del Prete"
                  fill
                  className={`object-contain object-bottom relative z-10 ${imageScale} translate-y-[12%]`}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Offset decorative frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold/20 -z-10" />

              {/* Floating stat card - hidden on mobile (info shown in stats below) */}
              <div className="hidden md:block absolute -right-8 bottom-12 bg-noir text-white p-8 shadow-2xl">
                <span className="font-display text-4xl md:text-5xl text-gold block leading-none">
                  {t("stats.years")}
                </span>
                <span
                  className="text-white/40 text-[11px] tracking-[0.2em] uppercase mt-2 block whitespace-pre-line"
                >
                  {t("stats.yearsLabelShort")}
                </span>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <div className="reveal">
              <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
                {t("label")}
              </span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-noir mb-8">
                {t("title")}
                <br />
                <em className="italic text-gold">{t("titleHighlight")}</em>
              </h2>
            </div>

            {/* Pull quote */}
            <div className="reveal relative pl-6 border-l-2 border-gold/30 mb-10">
              <p className="font-display text-xl md:text-2xl italic text-noir/70 leading-relaxed">
                &ldquo;{t("quote")}&rdquo;
              </p>
            </div>

            {/* Stats row */}
            <div className="reveal flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-noir/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="font-display text-4xl text-noir block leading-none mb-2">
                    {s.value}
                  </span>
                  <span className="text-noir/50 text-[12px] tracking-[0.15em] uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Read more link */}
            <div className="reveal mt-10">
              <Link
                href="/sobre-mi"
                className="inline-flex items-center gap-2 text-gold text-[13px] font-semibold tracking-[0.15em] uppercase hover:text-gold-dark transition-colors duration-300 group"
              >
                {t("readMore")}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
