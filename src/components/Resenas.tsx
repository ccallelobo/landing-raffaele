"use client";

import { useReveal } from "@/hooks/useReveal";
import type { SanityResena } from "@/lib/sanity";

const fallback: SanityResena[] = [
  {
    _id: "1",
    nombre: "María G.",
    tratamiento: "Rinoplastia",
    texto:
      "El Dr. Raffaele entendió exactamente lo que buscaba. El resultado es completamente natural, nadie nota que me operé. Su atención al detalle es excepcional.",
    estrellas: 5,
  },
  {
    _id: "2",
    nombre: "Laura P.",
    tratamiento: "Ácido Hialurónico",
    texto:
      "Llevaba años buscando un profesional que lograra resultados sutiles. Después del tratamiento me veo rejuvenecida pero siendo yo misma. Totalmente recomendado.",
    estrellas: 5,
  },
  {
    _id: "3",
    nombre: "Carmen R.",
    tratamiento: "Lifting Facial",
    texto:
      "Una experiencia impecable de principio a fin. El equipo me hizo sentir segura en todo momento. Los resultados superaron mis expectativas.",
    estrellas: 5,
  },
  {
    _id: "4",
    nombre: "Ana S.",
    tratamiento: "Blefaroplastia",
    texto:
      "Mi mirada se ve completamente renovada. La recuperación fue más rápida de lo esperado y el seguimiento postoperatorio fue excelente.",
    estrellas: 5,
  },
  {
    _id: "5",
    nombre: "Isabel M.",
    tratamiento: "Toxina Botulínica",
    texto:
      "Muy profesional y con un ojo artístico único. Los resultados son naturales y armoniosos. Sin duda el mejor especialista que he visitado.",
    estrellas: 5,
  },
  {
    _id: "6",
    nombre: "Patricia L.",
    tratamiento: "Liposucción",
    texto:
      "Después de mucho investigar, elegí al Dr. Raffaele y fue la mejor decisión. Resultados naturales, recuperación excelente y un trato humano extraordinario.",
    estrellas: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-brass" : "text-divider"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface Props {
  data?: SanityResena[];
}

export default function Resenas({ data }: Props) {
  useReveal();

  const resenas = data && data.length > 0 ? data : fallback;

  return (
    <section id="resenas" className="py-28 md:py-40 bg-parchment">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div className="reveal">
            <span className="text-brass text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              Testimonios
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-noir">
              Lo que dicen<br />
              <em className="italic text-brass">nuestros pacientes</em>
            </h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-warm-gray text-[15px] leading-relaxed">
              La confianza de quienes nos eligen es nuestro mayor reconocimiento.
              Cada testimonio refleja nuestro compromiso con la excelencia.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {resenas.map((r) => (
            <div
              key={r._id}
              className="reveal bg-ivory p-8 md:p-10 border border-divider hover:border-brass/30 transition-all duration-500 group"
            >
              {/* Decorative quote */}
              <span className="block font-display text-[48px] leading-none text-brass/20 mb-4 select-none">
                &ldquo;
              </span>

              {/* Review text */}
              <p className="text-noir/70 text-[15px] leading-relaxed mb-6">
                {r.texto}
              </p>

              {/* Stars */}
              <Stars count={r.estrellas} />

              {/* Divider */}
              <span className="block w-8 h-px bg-divider my-5 transition-all duration-500 group-hover:w-12 group-hover:bg-brass" />

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-[17px] text-noir leading-tight">
                    {r.nombre}
                  </p>
                  <p className="text-warm-gray text-[12px] tracking-[0.1em] uppercase mt-1">
                    {r.tratamiento}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
