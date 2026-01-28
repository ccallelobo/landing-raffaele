"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-end lg:items-center overflow-hidden"
    >
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-noir via-noir to-[#1a1a1a]" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-gold) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/[0.08] via-gold/[0.02] to-transparent" />

      {/* Mobile: Doctor image as background */}
      <div className="lg:hidden absolute inset-0 flex justify-center items-start pt-20">
        <div
          className="relative w-full max-w-[400px]"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s ease 0.3s",
          }}
        >
          <Image
            src="/hero-doctor.png"
            alt="Dr. Raffaele Del Prete"
            width={500}
            height={650}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center lg:min-h-screen py-12 lg:py-24">

          {/* Left: Text content */}
          <div className="pb-12 lg:pb-0">
            {/* Decorative accent */}
            <div
              className="flex items-center gap-4 mb-6 lg:mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
              }}
            >
              <span className="block w-12 h-px bg-gold" />
              <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase">
                Medicina Estética
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] text-white mb-5 lg:mb-6 tracking-[-0.02em]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s",
              }}
            >
              Dr. Raffaele<br />
              <span className="text-gold">Del Prete</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-stone/80 lg:text-moss text-base lg:text-xl leading-relaxed max-w-md mb-8 lg:mb-10 font-light"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.7s",
              }}
            >
              Realzamos tu belleza natural con técnicas de vanguardia y un enfoque
              artístico personalizado.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.9s",
              }}
            >
              <a
                href="#contacto"
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-gold text-white text-[13px] font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:bg-gold-dark"
              >
                <span className="relative z-10">Reservar Consulta</span>
              </a>
              <a
                href="#tratamientos"
                className="inline-flex items-center justify-center px-10 py-4 text-stone/70 text-[13px] font-medium tracking-[0.2em] uppercase border border-stone/20 hover:border-gold/50 hover:text-gold transition-all duration-500"
              >
                Explorar
                <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Doctor image - only on desktop */}
          <div
            className="hidden lg:flex relative justify-center lg:justify-end"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateX(0)" : "translateX(40px)",
              transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
            }}
          >
            {/* Decorative circle behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-gradient-to-br from-gold/10 via-transparent to-moss/5 blur-3xl" />

            {/* Image container */}
            <div className="relative w-full max-w-[500px] lg:max-w-[550px]">
              <Image
                src="/hero-doctor.png"
                alt="Dr. Raffaele Del Prete"
                width={550}
                height={700}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />

              {/* Decorative frame */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-l-2 border-b-2 border-gold/30" />
              <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-gold/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Side decorative text — vertical (desktop only) */}
      <div
        className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.2s ease 1.2s",
        }}
      >
        <span
          className="text-white/10 text-[11px] tracking-[0.5em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Cirugía Plástica & Estética — Madrid
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.5s",
        }}
      >
        <span className="text-moss/50 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent" />
      </div>
    </section>
  );
}
