"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="inicio"
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Background with Ken Burns */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-image.png')",
          animation: "kenBurns 20s ease-out forwards",
        }}
      />

      {/* Gradient overlays for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/50 to-noir/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-noir/20" />

      {/* Content — asymmetric left-aligned */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-12">
        <div className="max-w-2xl">
          {/* Decorative accent */}
          <div
            className="flex items-center gap-4 mb-8"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
            }}
          >
            <span className="block w-12 h-px bg-brass" />
            <span className="text-brass text-[12px] font-semibold tracking-[0.35em] uppercase">
              Medicina Estética
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] text-white mb-6 tracking-[-0.02em]"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
              transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s",
            }}
          >
            Dr.{" "}
            <em className="not-italic text-brass">Raffaele</em>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/50 text-lg md:text-xl leading-relaxed max-w-md mb-12 font-light"
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
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-brass text-white text-[13px] font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:bg-brass-dark"
            >
              <span className="relative z-10">Reservar Consulta</span>
            </a>
            <a
              href="#tratamientos"
              className="inline-flex items-center justify-center px-10 py-4 text-white/70 text-[13px] font-medium tracking-[0.2em] uppercase border border-white/15 hover:border-white/40 hover:text-white transition-all duration-500"
            >
              Explorar
              <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Side decorative text — vertical */}
      <div
        className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.2s ease 1.2s",
        }}
      >
        <span
          className="text-white/15 text-[11px] tracking-[0.5em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Cirugía Plástica & Estética — Madrid
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.5s",
        }}
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
