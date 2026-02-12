"use client";

import { useReveal } from "@/hooks/useReveal";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

interface Sello {
  _key: string;
  nombre: string;
  imagenUrl: string;
  url?: string;
}

interface SobreMiPageContentProps {
  cvUrl?: string;
  sellos?: Sello[];
  imagenPaginaUrl?: string;
}

const WHATSAPP_CONFIG = {
  es: {
    phone: "34604894697",
    message:
      "Hola Dr. Raffaele, me gustaría solicitar información sobre sus tratamientos de medicina estética. ¿Podría ayudarme?",
  },
  it: {
    phone: "393760976953",
    message:
      "Buongiorno Dr. Raffaele, vorrei richiedere informazioni sui suoi trattamenti di medicina estetica. Potrebbe aiutarmi?",
  },
} as const;

export default function SobreMiPageContent({
  cvUrl,
  sellos,
  imagenPaginaUrl,
}: SobreMiPageContentProps) {
  useReveal();
  const t = useTranslations("aboutMePage");
  const locale = useLocale() as keyof typeof WHATSAPP_CONFIG;
  const wa = WHATSAPP_CONFIG[locale] ?? WHATSAPP_CONFIG.es;
  const whatsappHref = `https://wa.me/${wa.phone}?text=${encodeURIComponent(wa.message)}`;

  const timeline = t.raw("timeline") as {
    year: string;
    title: string;
    description: string;
  }[];

  return (
    <>
      {/* ── Biography Section ── */}
      <section className="bg-stone overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Text column */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              {/* Pull quote */}
              <div className="reveal relative pl-6 border-l-2 border-gold/30 mb-12">
                <p className="font-display text-xl md:text-2xl italic text-noir/70 leading-relaxed">
                  &ldquo;{t("bioQuote")}&rdquo;
                </p>
              </div>

              <div className="reveal space-y-6 text-noir/60 text-[15px] leading-[1.8]">
                <p>{t("bioParagraph1")}</p>
                <p>{t("bioParagraph2")}</p>
                <p>{t("bioParagraph3")}</p>
                <p>{t("bioParagraph4")}</p>
              </div>
            </div>

            {/* Image column */}
            <div className="lg:col-span-5 order-1 lg:order-2 reveal-right">
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-b from-moss/30 to-stone overflow-hidden relative">
                  <Image
                    src={imagenPaginaUrl || "/sobre-mi-doctor-v4.webp"}
                    alt="Dr. Raffaele Del Prete"
                    fill
                    className={imagenPaginaUrl
                      ? "object-cover object-top"
                      : "object-contain object-bottom scale-200 translate-y-[12%]"
                    }
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold/20 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline Section ── */}
      <section className="bg-noir overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-24 md:py-36">
          <div className="reveal text-center mb-16 md:mb-20">
            <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              {t("heroLabel")}
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-white">
              {t("timelineTitle")}{" "}
              <em className="italic text-gold">{t("timelineTitleHighlight")}</em>
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/20 md:-translate-x-px" />

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`reveal relative flex items-start mb-12 last:mb-0 ${
                    isLeft
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1/2 mt-2 z-10 ring-4 ring-noir" />

                  {/* Content card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"
                    }`}
                  >
                    <span className="font-display text-3xl text-gold block leading-none mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-white text-[16px] font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-[14px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Societies / Sellos Section ── */}
      {sellos && sellos.length > 0 && (
        <section className="bg-stone overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-24 md:py-36">
            <div className="reveal text-center mb-16">
              <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
                {t("sellosLabel")}
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-noir">
                {t("sellosTitle")}{" "}
                <em className="italic text-gold">
                  {t("sellosTitleHighlight")}
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center max-w-4xl mx-auto">
              {sellos.map((sello) => {
                const img = (
                  <div className="reveal-scale relative w-28 h-28 md:w-36 md:h-36 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image
                      src={sello.imagenUrl}
                      alt={sello.nombre}
                      fill
                      className="object-contain"
                      sizes="144px"
                    />
                  </div>
                );
                return sello.url ? (
                  <a
                    key={sello._key}
                    href={sello.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={sello.nombre}
                  >
                    {img}
                  </a>
                ) : (
                  <div key={sello._key} title={sello.nombre}>
                    {img}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Download CV Section ── */}
      {cvUrl && (
        <section className={`${sellos && sellos.length > 0 ? "bg-moss/30" : "bg-stone"} overflow-hidden`}>
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-20 md:py-28">
            <div className="reveal text-center">
              <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
                {t("cvLabel")}
              </span>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-noir mb-8">
                {t("cvTitle")}{" "}
                <em className="italic text-gold">{t("cvTitleHighlight")}</em>
              </h2>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-noir text-white px-8 py-4 text-[13px] font-semibold tracking-[0.15em] uppercase hover:bg-gold transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {t("cvButton")}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section className="bg-noir overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-24 md:py-36">
          <div className="reveal text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-white mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-white/40 text-[16px] leading-relaxed mb-10">
              {t("ctaDescription")}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-white px-10 py-4 text-[13px] font-semibold tracking-[0.15em] uppercase hover:bg-gold-dark transition-colors duration-300"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
