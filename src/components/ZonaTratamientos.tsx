"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanityTratamiento } from "@/lib/sanity";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { zonaToSlug } from "@/lib/zonas";
import { getLocalizedNombre, getLocalizedResumen } from "@/lib/localize";

interface Props {
  tratamientos: SanityTratamiento[];
  zona: string;
}

interface TreatmentCategory {
  key: string;
  treatments: SanityTratamiento[];
}

function categorizeTreatments(
  treatments: SanityTratamiento[]
): TreatmentCategory[] {
  const buckets: Record<string, SanityTratamiento[]> = {};

  for (const t of treatments) {
    const name = t.nombre.toLowerCase();
    if (name.startsWith("filler") || name.startsWith("rinofiller")) {
      (buckets["filler"] ??= []).push(t);
    } else if (name.startsWith("botox")) {
      (buckets["botox"] ??= []).push(t);
    } else {
      (buckets["avanzati"] ??= []).push(t);
    }
  }

  const order = ["filler", "botox", "avanzati"];
  return order
    .filter((key) => buckets[key]?.length)
    .map((key) => ({ key, treatments: buckets[key] }));
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function ZonaTratamientos({ tratamientos, zona }: Props) {
  useReveal();
  const t = useTranslations("zonas");
  const locale = useLocale();
  const zonaSlug = zonaToSlug[locale]?.[zona] || zona;

  const categories = categorizeTreatments(tratamientos);
  const showCategoryNav = categories.length >= 2;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Sticky detection via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !showCategoryNav) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-112px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [showCategoryNav]);

  // Auto-scroll active tab into view on mobile
  const activeTabRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeCategory]);

  const handleTabClick = useCallback((key: string) => {
    setActiveCategory(key);
    if (key !== "all" && tabBarRef.current) {
      tabBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, []);

  // Build tab data
  const tabs = [
    { key: "all", label: t("categoryAll"), count: tratamientos.length },
    ...categories.map((cat) => ({
      key: cat.key,
      label: t(`category${capitalize(cat.key)}`),
      count: cat.treatments.length,
    })),
  ];

  // Filtered treatments for single-category view
  const filteredCategory = categories.find((c) => c.key === activeCategory);

  // Whether we're in the "all" grouped view (uses useReveal) or a filtered view (uses CSS animation)
  const isGroupedView = activeCategory === "all" && showCategoryNav;

  // Global index for numbering across groups in "all" view
  let globalIdx = 0;

  return (
    <section id="grid-tratamientos" className="bg-stone">
      {/* Sticky sentinel */}
      {showCategoryNav && <div ref={sentinelRef} className="h-0" />}

      {/* Category Tab Bar */}
      {showCategoryNav && (
        <div
          ref={tabBarRef}
          className={`sticky top-28 md:top-32 z-40 transition-all duration-300 ${
            isSticky
              ? "bg-stone/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(184,176,161,0.3)]"
              : "bg-stone"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-8 md:px-12">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-5 md:py-6 -mx-8 px-8 md:mx-0 md:px-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  ref={activeCategory === tab.key ? activeTabRef : undefined}
                  onClick={() => handleTabClick(tab.key)}
                  className={`relative flex-shrink-0 px-5 py-2.5 text-[12px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                    activeCategory === tab.key
                      ? "text-gold"
                      : "text-moss hover:text-noir"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-[11px] opacity-50">
                    ({tab.count})
                  </span>
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-5 right-5 h-px bg-gold transition-all duration-500 origin-center ${
                      activeCategory === tab.key
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Treatment Grid */}
      <div className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          {tratamientos.length === 0 ? (
            <p className="text-moss text-center text-[15px]">
              {t("sinTratamientos")}
            </p>
          ) : isGroupedView ? (
            /* ── GROUPED VIEW (uses useReveal for scroll animation) ── */
            <div key="all" className="space-y-20">
              {categories.map((category) => {
                const startIdx = globalIdx;
                globalIdx += category.treatments.length;
                return (
                  <div key={category.key} id={`category-${category.key}`}>
                    {/* Category heading */}
                    <div className="reveal flex items-baseline gap-4 mb-4">
                      <h3 className="font-display text-[24px] md:text-[32px] text-noir leading-tight">
                        {t(`category${capitalize(category.key)}`)}
                      </h3>
                      <span className="text-moss/60 text-[13px]">
                        {category.treatments.length} {t("treatmentCount")}
                      </span>
                      <span className="flex-1 h-px bg-moss/20" />
                    </div>

                    {/* Category description */}
                    <p className="reveal text-gold/80 italic text-[15px] mb-10 max-w-xl font-display">
                      {t(`category${capitalize(category.key)}Description`)}
                    </p>

                    {/* Treatment grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 stagger">
                      {category.treatments.map((item, idx) => (
                        <TreatmentCard
                          key={item._id}
                          item={item}
                          index={startIdx + idx}
                          zonaSlug={zonaSlug}
                          locale={locale}
                          t={t}
                          useRevealAnimation
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── FILTERED VIEW (uses CSS keyframe animation, no reveal class) ── */
            <div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 stagger-filter"
            >
              {(filteredCategory?.treatments || tratamientos).map(
                (item, idx) => (
                  <TreatmentCard
                    key={item._id}
                    item={item}
                    index={idx}
                    zonaSlug={zonaSlug}
                    locale={locale}
                    t={t}
                    useRevealAnimation={false}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Treatment Card ── */
function TreatmentCard({
  item,
  index,
  zonaSlug,
  locale,
  t,
  useRevealAnimation,
}: {
  item: SanityTratamiento;
  index: number;
  zonaSlug: string;
  locale: string;
  t: ReturnType<typeof useTranslations>;
  useRevealAnimation: boolean;
}) {
  const nombre = getLocalizedNombre(item, locale);
  const resumenCorto = getLocalizedResumen(item, locale);

  return (
    <Link
      href={{
        pathname: "/tratamientos/[zona]/[tratamiento]",
        params: {
          zona: zonaSlug,
          tratamiento: item.slug?.current || item._id,
        },
      }}
      className={`${useRevealAnimation ? "reveal " : ""}group block relative p-7 md:p-8 border border-moss/20 hover:border-gold/30 bg-white/40 hover:bg-white/70 transition-all duration-500`}
    >
      {/* Optional thumbnail */}
      {item.imagen && (
        <div className="absolute top-6 right-6 w-14 h-14 rounded-sm overflow-hidden opacity-60 group-hover:opacity-90 transition-opacity duration-500">
          <Image
            src={urlFor(item.imagen).width(112).height(112).url()}
            alt=""
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
      )}

      {/* Index number */}
      <span className="font-display text-[40px] md:text-[48px] leading-none text-moss/15 group-hover:text-gold/20 transition-colors duration-500 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Treatment name */}
      <h3 className="font-display text-[20px] md:text-[22px] text-noir leading-tight mt-2 mb-3 group-hover:text-gold-dark transition-colors duration-300 pr-16">
        {nombre}
      </h3>

      {/* Gold divider */}
      <span className="block w-8 h-px bg-moss/30 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-gold" />

      {/* Short description */}
      {resumenCorto && (
        <p className="text-moss text-[14px] leading-relaxed line-clamp-2">
          {resumenCorto}
        </p>
      )}

      {/* Hover arrow */}
      <div className="mt-5 flex items-center gap-2 text-gold opacity-0 translate-x-[-8px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase">
          {t("masInfo")}
        </span>
        <svg
          className="w-3.5 h-3.5"
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
    </Link>
  );
}
