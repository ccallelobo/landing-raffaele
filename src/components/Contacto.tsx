"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useTranslations } from "next-intl";

export default function Contacto() {
  useReveal();
  const t = useTranslations("contact");

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
    alert(t("form.success"));
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      tratamiento: "",
      mensaje: "",
    });
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
                {t("label")}
              </span>
              <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-[-0.02em] text-white mb-6">
                {t("title")}
                <br />
                <em className="italic text-gold">{t("titleHighlight")}</em>
              </h2>
              <p className="text-white/40 text-[15px] leading-relaxed max-w-md mb-16">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        {/* Right — Form panel */}
        <div className="bg-noir/95 px-8 md:px-16 lg:px-20 py-20 lg:py-28 flex items-center border-l border-white/[0.05]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto space-y-8 reveal"
          >
            {/* Name */}
            <div className="relative">
              <label className={labelClasses("nombre", formData.nombre)}>
                {t("form.name")}
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onFocus={() => setFocused("nombre")}
                onBlur={() => setFocused(null)}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className={inputClasses("nombre")}
              />
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative">
                <label className={labelClasses("email", formData.email)}>
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClasses("email")}
                />
              </div>
              <div className="relative">
                <label className={labelClasses("telefono", formData.telefono)}>
                  {t("form.phone")}
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onFocus={() => setFocused("telefono")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                  className={inputClasses("telefono")}
                />
              </div>
            </div>

            {/* Treatment select */}
            <div className="relative">
              <label
                className={labelClasses("tratamiento", formData.tratamiento)}
              >
                {t("form.treatment")}
              </label>
              <select
                value={formData.tratamiento}
                onFocus={() => setFocused("tratamiento")}
                onBlur={() => setFocused(null)}
                onChange={(e) =>
                  setFormData({ ...formData, tratamiento: e.target.value })
                }
                className={`${inputClasses(
                  "tratamiento"
                )} appearance-none cursor-pointer bg-transparent`}
              >
                <option value="" className="bg-noir" />
                <option value="rinoplastia" className="bg-noir">
                  {t("treatments.rinoplastia")}
                </option>
                <option value="acido-hialuronico" className="bg-noir">
                  {t("treatments.acidoHialuronico")}
                </option>
                <option value="botox" className="bg-noir">
                  {t("treatments.botox")}
                </option>
                <option value="lifting" className="bg-noir">
                  {t("treatments.lifting")}
                </option>
                <option value="blefaroplastia" className="bg-noir">
                  {t("treatments.blefaroplastia")}
                </option>
                <option value="liposuccion" className="bg-noir">
                  {t("treatments.liposuccion")}
                </option>
                <option value="otro" className="bg-noir">
                  {t("treatments.other")}
                </option>
              </select>
              {/* Custom arrow */}
              <svg
                className="absolute right-0 top-7 w-4 h-4 text-white/20 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Message */}
            <div className="relative">
              <label className={labelClasses("mensaje", formData.mensaje)}>
                {t("form.message")}
              </label>
              <textarea
                rows={4}
                required
                value={formData.mensaje}
                onFocus={() => setFocused("mensaje")}
                onBlur={() => setFocused(null)}
                onChange={(e) =>
                  setFormData({ ...formData, mensaje: e.target.value })
                }
                className={`${inputClasses("mensaje")} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gold text-white py-4.5 text-[13px] font-semibold tracking-[0.25em] uppercase hover:bg-gold-dark transition-all duration-500 mt-4"
            >
              {t("form.submit")}
            </button>

            <p className="text-white/20 text-[12px] text-center mt-4">
              {t("form.privacy")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
