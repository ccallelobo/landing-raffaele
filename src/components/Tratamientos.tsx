"use client";

import { useReveal } from "@/hooks/useReveal";

const tratamientos = [
  {
    titulo: "Rinoplastia",
    descripcion:
      "Remodelación nasal precisa que respeta tus rasgos naturales, logrando armonía facial con técnicas mínimamente invasivas.",
    num: "01",
  },
  {
    titulo: "Ácido Hialurónico",
    descripcion:
      "Restauración de volumen y definición facial con rellenos dérmicos de última generación. Resultados sutiles e inmediatos.",
    num: "02",
  },
  {
    titulo: "Toxina Botulínica",
    descripcion:
      "Suavizado de líneas de expresión para un rostro descansado y rejuvenecido, preservando la naturalidad del gesto.",
    num: "03",
  },
  {
    titulo: "Lifting Facial",
    descripcion:
      "Rejuvenecimiento integral con técnicas quirúrgicas avanzadas. Resultados naturales que devuelven firmeza y definición.",
    num: "04",
  },
  {
    titulo: "Blefaroplastia",
    descripcion:
      "Cirugía de párpados que abre la mirada y elimina signos de fatiga. Recuperación rápida, transformación duradera.",
    num: "05",
  },
  {
    titulo: "Liposucción",
    descripcion:
      "Escultura corporal de precisión para eliminar depósitos de grasa resistentes y definir tu silueta natural.",
    num: "06",
  },
];

export default function Tratamientos() {
  useReveal();

  return (
    <section id="tratamientos" className="py-28 md:py-40 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Section header — editorial style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div className="reveal">
            <span className="text-brass text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              Servicios
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-noir">
              Nuestros<br />
              <em className="italic text-brass">Tratamientos</em>
            </h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-warm-gray text-[15px] leading-relaxed">
              Cada procedimiento es diseñado a medida, combinando arte y ciencia
              para resultados que realzan tu belleza única.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-divider stagger">
          {tratamientos.map((t) => (
            <div
              key={t.num}
              className="reveal group bg-ivory p-8 md:p-10 cursor-pointer transition-colors duration-500 hover:bg-parchment relative overflow-hidden"
            >
              {/* Number */}
              <span className="text-[11px] text-brass/40 tracking-[0.3em] font-semibold block mb-8 transition-colors duration-500 group-hover:text-brass">
                {t.num}
              </span>

              {/* Title */}
              <h3 className="font-display text-[28px] md:text-[32px] text-noir mb-4 leading-tight transition-colors duration-300 group-hover:text-brass-dark">
                {t.titulo}
              </h3>

              {/* Line */}
              <span className="block w-8 h-px bg-divider mb-5 transition-all duration-500 group-hover:w-12 group-hover:bg-brass" />

              {/* Description */}
              <p className="text-warm-gray text-[14px] leading-relaxed">
                {t.descripcion}
              </p>

              {/* Hover arrow */}
              <div className="mt-8 flex items-center gap-2 text-brass opacity-0 translate-x-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                <span className="text-[12px] font-semibold tracking-[0.15em] uppercase">
                  Más info
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
