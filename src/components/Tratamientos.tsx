"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanityTratamiento } from "@/lib/sanity";

const fallback = [
  {
    titulo: "Rinoplastia",
    descripcion:
      "Remodelación nasal precisa que respeta tus rasgos naturales, logrando armonía facial con técnicas mínimamente invasivas.",
    num: "01",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop&crop=face",
  },
  {
    titulo: "Ácido Hialurónico",
    descripcion:
      "Restauración de volumen y definición facial con rellenos dérmicos de última generación. Resultados sutiles e inmediatos.",
    num: "02",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
  },
  {
    titulo: "Toxina Botulínica",
    descripcion:
      "Suavizado de líneas de expresión para un rostro descansado y rejuvenecido, preservando la naturalidad del gesto.",
    num: "03",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
  {
    titulo: "Lifting Facial",
    descripcion:
      "Rejuvenecimiento integral con técnicas quirúrgicas avanzadas. Resultados naturales que devuelven firmeza y definición.",
    num: "04",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop&crop=face",
  },
  {
    titulo: "Blefaroplastia",
    descripcion:
      "Cirugía de párpados que abre la mirada y elimina signos de fatiga. Recuperación rápida, transformación duradera.",
    num: "05",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&crop=face",
  },
  {
    titulo: "Liposucción",
    descripcion:
      "Escultura corporal de precisión para eliminar depósitos de grasa resistentes y definir tu silueta natural.",
    num: "06",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
];

interface Props {
  data?: SanityTratamiento[];
}

export default function Tratamientos({ data }: Props) {
  useReveal();

  const useSanity = data && data.length > 0;

  const tratamientos = useSanity
    ? data.map((t) => ({
        titulo: t.titulo,
        descripcion: t.descripcion,
        num: t.num,
        image: t.imagen
          ? urlFor(t.imagen).width(600).height(400).url()
          : `https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop&crop=face`,
      }))
    : fallback;

  return (
    <section id="tratamientos" className="py-28 md:py-40 bg-stone">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Section header — editorial style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div className="reveal">
            <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
              Servicios
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-noir">
              Nuestros<br />
              <em className="italic text-gold">Tratamientos</em>
            </h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-moss text-[15px] leading-relaxed">
              Cada procedimiento es diseñado a medida, combinando arte y ciencia
              para resultados que realzan tu belleza única.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {tratamientos.map((t) => (
            <div
              key={t.num}
              className="reveal group cursor-pointer bg-stone overflow-hidden border border-moss/40 hover:border-gold/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.titulo}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-noir/10 group-hover:bg-noir/0 transition-colors duration-500" />
                {/* Number overlay */}
                <span className="absolute top-4 left-4 text-[11px] text-white/70 tracking-[0.3em] font-semibold bg-noir/30 backdrop-blur-sm px-3 py-1">
                  {t.num}
                </span>
              </div>

              {/* Content */}
              <div className="p-7 md:p-8">
                <h3 className="font-display text-[24px] md:text-[28px] text-noir mb-3 leading-tight transition-colors duration-300 group-hover:text-gold-dark">
                  {t.titulo}
                </h3>

                <span className="block w-8 h-px bg-moss/40 mb-4 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />

                <p className="text-moss text-[14px] leading-relaxed">
                  {t.descripcion}
                </p>

                {/* Hover arrow */}
                <div className="mt-6 flex items-center gap-2 text-gold opacity-0 translate-x-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                  <span className="text-[12px] font-semibold tracking-[0.15em] uppercase">
                    Más info
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
