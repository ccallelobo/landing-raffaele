"use client";
// Force rebuild v2

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

const stats = [
  { value: "15+", label: "Años de experiencia" },
  { value: "3.000+", label: "Pacientes satisfechos" },
  { value: "20+", label: "Certificaciones" },
];

export default function SobreMi() {
  useReveal();

  return (
    <section id="sobre-mi" className="relative bg-moss overflow-hidden">
      {/* Decorative oversized text */}
      <div className="absolute top-12 right-0 hidden xl:block pointer-events-none select-none">
        <span className="font-display text-[18vw] text-noir/[0.02] leading-none tracking-[-0.04em]">
          R.
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-28 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Image column — asymmetric placement */}
          <div className="lg:col-span-5 reveal-left">
            <div className="relative">
              {/* Main image container */}
              <div className="aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-b from-stone via-stone to-moss overflow-hidden relative pt-12 lg:pt-0">
                {/* Side gradients for smooth edge blending */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-moss/40 via-transparent to-transparent" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-moss/20 via-transparent to-transparent" />
                <Image
                  src="/sobre-mi-doctor-v2.webp"
                  alt="Dr. Raffaele Del Prete"
                  fill
                  className="object-contain object-bottom relative z-10 !top-8"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Offset decorative frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold/20 -z-10" />

              {/* Floating stat card - hidden on mobile (info shown in stats below) */}
              <div className="hidden md:block absolute -right-8 bottom-12 bg-noir text-white p-8 shadow-2xl">
                <span className="font-display text-4xl md:text-5xl text-gold block leading-none">
                  15+
                </span>
                <span className="text-white/40 text-[11px] tracking-[0.2em] uppercase mt-2 block">
                  Años de<br />experiencia
                </span>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <div className="reveal">
              <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
                Sobre el Doctor
              </span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-noir mb-8">
                Una filosofía de<br />
                <em className="italic text-gold">belleza natural</em>
              </h2>
            </div>

            {/* Pull quote */}
            <div className="reveal relative pl-6 border-l-2 border-gold/30 mb-10">
              <p className="font-display text-xl md:text-2xl italic text-noir/70 leading-relaxed">
                &ldquo;Mi objetivo es que cada paciente se vea y se sienta como
                la mejor versión de sí mismo.&rdquo;
              </p>
            </div>

            <div className="reveal space-y-5 text-noir/60 text-[15px] leading-[1.8] mb-12">
              <p>
                Con más de 15 años dedicados a la medicina estética y la cirugía
                plástica, el Dr. Raffaele combina técnicas quirúrgicas de
                vanguardia con un profundo sentido artístico de la armonía facial
                y corporal.
              </p>
              <p>
                Formado en las instituciones médicas más prestigiosas de Europa,
                su enfoque se centra en resultados que realzan la belleza única
                de cada persona — naturales, equilibrados y armoniosos.
              </p>
              <p>
                Miembro de la Sociedad Internacional de Cirugía Plástica
                Estética (ISAPS) y la Sociedad Española de Cirugía Plástica,
                Reparadora y Estética (SECPRE).
              </p>
            </div>

            {/* Stats row */}
            <div className="reveal flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-noir/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="font-display text-4xl text-noir block leading-none mb-2">
                    {s.value}
                  </span>
                  <span className="text-noir/50 text-[12px] tracking-[0.15em] uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
