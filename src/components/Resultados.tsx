"use client";

import { useReveal } from "@/hooks/useReveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const resultados = [
  { id: 1, tratamiento: "Rinoplastia", descripcion: "Remodelación nasal con enfoque natural" },
  { id: 2, tratamiento: "Ácido Hialurónico", descripcion: "Restauración de volumen facial" },
  { id: 3, tratamiento: "Lifting Facial", descripcion: "Rejuvenecimiento integral del rostro" },
  { id: 4, tratamiento: "Blefaroplastia", descripcion: "Rejuvenecimiento de la mirada" },
];

export default function Resultados() {
  useReveal();

  return (
    <section id="resultados" className="py-28 md:py-40 bg-noir text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div className="reveal">
            <span className="text-brass text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              Antes & Después
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]">
              Resultados que<br />
              <em className="italic text-brass">hablan por sí solos</em>
            </h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-white/40 text-[15px] leading-relaxed">
              Desliza la barra para comparar el antes y el después de cada
              procedimiento.
            </p>
          </div>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 stagger">
          {resultados.map((r, i) => (
            <div
              key={r.id}
              className={`reveal group ${i === 0 ? "md:row-span-2" : ""}`}
            >
              <BeforeAfterSlider
                className={i === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl text-white mb-1">
                    {r.tratamiento}
                  </h3>
                  <p className="text-white/40 text-sm">{r.descripcion}</p>
                </div>
                <span className="text-brass/30 text-[11px] tracking-[0.2em] uppercase font-semibold hidden sm:block">
                  Deslizar
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
