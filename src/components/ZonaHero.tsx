"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ExpandableText from "@/components/ExpandableText";

interface ZonaHeroProps {
  heroImage: string | null;
  doctorImageUrl: string | null;
  sectionLabel: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  readMoreLabel: string;
}

export default function ZonaHero({
  heroImage,
  doctorImageUrl,
  sectionLabel,
  heroTitle,
  heroTitleHighlight,
  heroDescription,
  readMoreLabel,
}: ZonaHeroProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Small delay so the browser paints first, then triggers transitions
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end bg-noir overflow-hidden">
      {/* Background zone image with ken-burns zoom */}
      {heroImage && (
        <div
          className="absolute inset-0"
          style={{
            transform: loaded ? "scale(1.05)" : "scale(1)",
            transition: `transform 8s ${ease}`,
          }}
        >
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            className={`object-cover ${doctorImageUrl ? "opacity-20" : "opacity-40"}`}
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent" />
      {doctorImageUrl && (
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/40 to-transparent z-[1]" />
      )}

      {/* Doctor photo — slides in from right */}
      {doctorImageUrl && (
        <div
          className="hidden lg:block absolute right-0 top-24 bottom-0 w-[40%] max-w-[500px] z-[2]"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(60px)",
            transition: `opacity 1.2s ${ease} 0.3s, transform 1.4s ${ease} 0.3s`,
          }}
        >
          <Image
            src={doctorImageUrl}
            alt="Dr. Raffaele Del Prete"
            fill
            className="object-cover object-[50%_15%]"
            sizes="40vw"
          />
          {/* Left fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-noir via-transparent to-transparent" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-noir to-transparent" />
        </div>
      )}

      {/* Decorative gold line that draws in */}
      <div
        className="absolute left-8 md:left-12 top-32 md:top-40 w-px z-10 bg-gold/40"
        style={{
          height: loaded ? "60px" : "0px",
          transition: `height 0.8s ${ease} 0.2s`,
        }}
      />

      {/* Text content — staggered reveals */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24 w-full">
        {/* Label */}
        <span
          className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.8s ${ease} 0.4s, transform 0.8s ${ease} 0.4s`,
          }}
        >
          {sectionLabel}
        </span>

        {/* Title */}
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] text-white mb-6 overflow-hidden">
          <span
            className="block"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(100%)",
              transition: `opacity 1s ${ease} 0.6s, transform 1s ${ease} 0.6s`,
            }}
          >
            {heroTitle}
          </span>
          <em
            className="italic text-gold block"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(100%)",
              transition: `opacity 1s ${ease} 0.8s, transform 1s ${ease} 0.8s`,
            }}
          >
            {heroTitleHighlight}
          </em>
        </h1>

        {/* Description */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 1s ${ease} 1s, transform 1s ${ease} 1s`,
          }}
        >
          <ExpandableText
            text={heroDescription}
            maxLines={3}
            moreLabel={readMoreLabel}
            className="text-white/50 text-[16px] md:text-[18px] leading-relaxed max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
