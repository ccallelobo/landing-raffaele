"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

export default function Contacto() {
  useReveal();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tratamiento: "",
    mensaje: "",
  });

  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por tu mensaje. Nos pondremos en contacto pronto.");
    setFormData({ nombre: "", email: "", telefono: "", tratamiento: "", mensaje: "" });
  };

  const inputClasses = (field: string) =>
    `w-full bg-transparent border-b ${
      focused === field ? "border-gold" : "border-white/10"
    } pb-3 pt-6 text-white text-[15px] placeholder:text-transparent focus:outline-none transition-colors duration-300`;

  const labelClasses = (field: string, value: string) =>
    `absolute left-0 transition-all duration-300 pointer-events-none ${
      focused === field || value
        ? "top-0 text-[11px] tracking-[0.15em] uppercase text-gold"
        : "top-6 text-white/30 text-[15px]"
    }`;

  return (
    <section id="contacto" className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
        {/* Left — Info panel */}
        <div className="bg-noir px-8 md:px-16 lg:px-20 py-20 lg:py-28 flex flex-col justify-center relative">
          {/* Decorative bg element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/[0.03] to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="reveal">
              <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
                Contacto
              </span>
              <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-[-0.02em] text-white mb-6">
                Agenda tu<br />
                <em className="italic text-gold">consulta privada</em>
              </h2>
              <p className="text-white/40 text-[15px] leading-relaxed max-w-md mb-16">
                La primera consulta es informativa y sin compromiso. Evaluaremos
                tus necesidades y diseñaremos un plan personalizado.
              </p>
            </div>

            <div className="space-y-10 reveal">
              {/* Location */}
              <div className="flex items-start gap-5 group">
                <div className="w-11 h-11 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 transition-colors duration-300">
                  <svg className="w-[18px] h-[18px] text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-[14px] font-medium mb-1 tracking-wide">
                    Ubicación
                  </h4>
                  <p className="text-white/35 text-[14px]">
                    Calle Serrano 50, 28001 Madrid
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 group">
                <div className="w-11 h-11 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 transition-colors duration-300">
                  <svg className="w-[18px] h-[18px] text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-[14px] font-medium mb-1 tracking-wide">
                    Teléfono
                  </h4>
                  <p className="text-white/35 text-[14px]">+34 912 345 678</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5 group">
                <div className="w-11 h-11 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 transition-colors duration-300">
                  <svg className="w-[18px] h-[18px] text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-[14px] font-medium mb-1 tracking-wide">
                    Horario
                  </h4>
                  <p className="text-white/35 text-[14px]">
                    Lun – Vie: 9:00 – 20:00
                  </p>
                  <p className="text-white/35 text-[14px]">
                    Sáb: 10:00 – 14:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form panel */}
        <div className="bg-noir/95 px-8 md:px-16 lg:px-20 py-20 lg:py-28 flex items-center border-l border-white/[0.05]">
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-8 reveal">
            {/* Name */}
            <div className="relative">
              <label className={labelClasses("nombre", formData.nombre)}>
                Nombre completo
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onFocus={() => setFocused("nombre")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={inputClasses("nombre")}
              />
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative">
                <label className={labelClasses("email", formData.email)}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClasses("email")}
                />
              </div>
              <div className="relative">
                <label className={labelClasses("telefono", formData.telefono)}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onFocus={() => setFocused("telefono")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className={inputClasses("telefono")}
                />
              </div>
            </div>

            {/* Treatment select */}
            <div className="relative">
              <label className={labelClasses("tratamiento", formData.tratamiento)}>
                Tratamiento de interés
              </label>
              <select
                value={formData.tratamiento}
                onFocus={() => setFocused("tratamiento")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setFormData({ ...formData, tratamiento: e.target.value })}
                className={`${inputClasses("tratamiento")} appearance-none cursor-pointer bg-transparent`}
              >
                <option value="" className="bg-noir" />
                <option value="rinoplastia" className="bg-noir">Rinoplastia</option>
                <option value="acido-hialuronico" className="bg-noir">Ácido Hialurónico</option>
                <option value="botox" className="bg-noir">Toxina Botulínica</option>
                <option value="lifting" className="bg-noir">Lifting Facial</option>
                <option value="blefaroplastia" className="bg-noir">Blefaroplastia</option>
                <option value="liposuccion" className="bg-noir">Liposucción</option>
                <option value="otro" className="bg-noir">Otro</option>
              </select>
              {/* Custom arrow */}
              <svg className="absolute right-0 top-7 w-4 h-4 text-white/20 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Message */}
            <div className="relative">
              <label className={labelClasses("mensaje", formData.mensaje)}>
                Mensaje
              </label>
              <textarea
                rows={4}
                required
                value={formData.mensaje}
                onFocus={() => setFocused("mensaje")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className={`${inputClasses("mensaje")} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gold text-white py-4.5 text-[13px] font-semibold tracking-[0.25em] uppercase hover:bg-gold-dark transition-all duration-500 mt-4"
            >
              Enviar Mensaje
            </button>

            <p className="text-white/20 text-[12px] text-center mt-4">
              Sus datos serán tratados con total confidencialidad.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
