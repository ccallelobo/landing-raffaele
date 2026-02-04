"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { urlFor } from "@/lib/sanity";
import type { SanityResultado } from "@/lib/sanity";
import { useTranslations } from "next-intl";

interface Props {
  data?: SanityResultado[];
}

// Datos de fallback para demostración
const fallbackCasos = [
  {
    id: "1",
    titulo: "Sonrisa Gingival",
    descripcion: "Corrección de exposición excesiva de encía",
    angulos: [
      {
        nombre: "Frontal",
        before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=500&fit=crop&crop=face",
        after: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=500&fit=crop&crop=face",
      },
      {
        nombre: "Perfil Izquierdo",
        before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
        after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
      },
      {
        nombre: "Perfil Derecho",
        before: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop&crop=face",
        after: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
      },
    ],
  },
  {
    id: "2",
    titulo: "Rinoplastia",
    descripcion: "Refinamiento nasal con técnica cerrada",
    angulos: [
      {
        nombre: "Frontal",
        before: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
        after: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
      },
      {
        nombre: "Perfil",
        before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
        after: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
      },
    ],
  },
];

interface CasoNormalizado {
  id: string;
  titulo: string;
  descripcion: string;
  angulos: {
    nombre: string;
    before: string;
    after: string;
  }[];
}

export default function CasosExito({ data }: Props) {
  useReveal();
  const t = useTranslations("casosExito");

  // Normalizar datos de Sanity o usar fallback
  const casos: CasoNormalizado[] = data && data.length > 0
    ? data
        .filter((r) => r.angulos && r.angulos.length > 0)
        .map((r) => ({
          id: r._id,
          titulo: r.tratamiento,
          descripcion: r.descripcion,
          angulos: r.angulos!.map((a) => ({
            nombre: a.nombre,
            before: urlFor(a.antes).width(400).height(500).url(),
            after: urlFor(a.despues).width(400).height(500).url(),
          })),
        }))
    : fallbackCasos;

  const [selectedCaso, setSelectedCaso] = useState(casos[0]);
  const [currentAngulo, setCurrentAngulo] = useState(0);

  // Si no hay casos con múltiples ángulos, no renderizar
  if (casos.length === 0) {
    return null;
  }

  const nextAngulo = () => {
    setCurrentAngulo((prev) => (prev + 1) % selectedCaso.angulos.length);
  };

  const prevAngulo = () => {
    setCurrentAngulo((prev) => (prev - 1 + selectedCaso.angulos.length) % selectedCaso.angulos.length);
  };

  const handleSelectCaso = (caso: CasoNormalizado) => {
    setSelectedCaso(caso);
    setCurrentAngulo(0);
  };

  return (
    <section id="casos-exito" className="py-16 md:py-24 bg-stone overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Header compacto */}
        <div className="text-center mb-8 md:mb-12 reveal">
          <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase block mb-3">
            {t("label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-[-0.02em] text-noir">
            {t("title")} <em className="italic text-gold">{t("titleHighlight")}</em>
          </h2>
        </div>

        {/* Selector de caso */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 reveal">
          {casos.map((caso) => (
            <button
              key={caso.id}
              onClick={() => handleSelectCaso(caso)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCaso.id === caso.id
                  ? "bg-gold text-white"
                  : "bg-white text-noir hover:bg-noir/5"
              }`}
            >
              {caso.titulo}
            </button>
          ))}
        </div>

        {/* Carruseles sincronizados - altura máxima controlada */}
        <div className="reveal">
          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
            {/* Carrusel ANTES */}
            <div className="relative">
              <div className="absolute top-2 left-2 z-10 px-2.5 py-1 bg-noir text-white rounded-full text-[10px] md:text-xs font-semibold tracking-wide">
                {t("before").toUpperCase()}
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-md">
                {selectedCaso.angulos.map((angulo, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === currentAngulo
                        ? "opacity-100 translate-x-0"
                        : index < currentAngulo
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                    }`}
                  >
                    <Image
                      src={angulo.before}
                      alt={`${angulo.nombre} - ${t("before")}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Carrusel DESPUÉS */}
            <div className="relative">
              <div className="absolute top-2 right-2 z-10 px-2.5 py-1 bg-gold text-white rounded-full text-[10px] md:text-xs font-semibold tracking-wide">
                {t("after").toUpperCase()}
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-md">
                {selectedCaso.angulos.map((angulo, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === currentAngulo
                        ? "opacity-100 translate-x-0"
                        : index < currentAngulo
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                    }`}
                  >
                    <Image
                      src={angulo.after}
                      alt={`${angulo.nombre} - ${t("after")}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={prevAngulo}
              className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicadores de ángulo */}
            <div className="flex items-center gap-2">
              {selectedCaso.angulos.map((angulo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAngulo(index)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    index === currentAngulo
                      ? "bg-gold text-white"
                      : "bg-white text-noir/60 hover:text-noir"
                  }`}
                >
                  {angulo.nombre}
                </button>
              ))}
            </div>

            <button
              onClick={nextAngulo}
              className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Descripción del caso */}
          <p className="text-center text-noir/50 text-sm mt-3">
            {selectedCaso.descripcion}
          </p>
        </div>
      </div>
    </section>
  );
}
