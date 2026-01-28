"use client";

import { useReveal } from "@/hooks/useReveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { urlFor } from "@/lib/sanity";
import type { SanityResultado } from "@/lib/sanity";

const fallback = [
  {
    id: 1,
    tratamiento: "Rinoplastia",
    descripcion: "Remodelación nasal con enfoque natural",
    before: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&h=1000&fit=crop&crop=face",
    after: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop&crop=face",
  },
  {
    id: 2,
    tratamiento: "Ácido Hialurónico",
    descripcion: "Restauración de volumen facial",
    before: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&h=600&fit=crop&crop=face",
    after: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop&crop=face",
  },
  {
    id: 3,
    tratamiento: "Lifting Facial",
    descripcion: "Rejuvenecimiento integral del rostro",
    before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face",
    after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop&crop=face",
  },
  {
    id: 4,
    tratamiento: "Blefaroplastia",
    descripcion: "Rejuvenecimiento de la mirada",
    before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop&crop=face",
    after: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop&crop=face",
  },
];

interface Props {
  data?: SanityResultado[];
}

export default function Resultados({ data }: Props) {
  useReveal();

  const useSanity = data && data.length > 0;

  const resultados = useSanity
    ? data.map((r, i) => ({
        id: i + 1,
        tratamiento: r.tratamiento,
        descripcion: r.descripcion,
        before: urlFor(r.imagenAntes).width(800).height(i === 0 ? 1000 : 600).url(),
        after: urlFor(r.imagenDespues).width(800).height(i === 0 ? 1000 : 600).url(),
      }))
    : fallback;

  return (
    <section id="resultados" className="py-28 md:py-40 bg-noir text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div className="reveal">
            <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              Antes & Después
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]">
              Resultados que<br />
              <em className="italic text-gold">hablan por sí solos</em>
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
                beforeImage={r.before}
                afterImage={r.after}
                beforeAlt={`${r.tratamiento} - Antes`}
                afterAlt={`${r.tratamiento} - Después`}
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl text-white mb-1">
                    {r.tratamiento}
                  </h3>
                  <p className="text-white/40 text-sm">{r.descripcion}</p>
                </div>
                <span className="text-gold/30 text-[11px] tracking-[0.2em] uppercase font-semibold hidden sm:block">
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
