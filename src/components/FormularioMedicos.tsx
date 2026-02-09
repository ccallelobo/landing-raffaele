"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useTranslations } from "next-intl";

export default function FormularioMedicos() {
  useReveal();
  const t = useTranslations("doctorForm");

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    especialidad: "",
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
      especialidad: "",
      mensaje: "",
    });
  };

  const inputClasses = (field: string) =>
    `w-full bg-transparent border-b ${
      focused === field ? "border-gold" : "border-noir/10"
    } pb-3 pt-6 text-noir text-[15px] placeholder:text-transparent focus:outline-none transition-colors duration-300`;

  const labelClasses = (field: string, value: string) =>
    `absolute left-0 transition-all duration-300 pointer-events-none ${
      focused === field || value
        ? "top-0 text-[11px] tracking-[0.15em] uppercase text-gold"
        : "top-6 text-noir/30 text-[15px]"
    }`;

  return (
    <section className="relative overflow-hidden bg-stone">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-28 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Info */}
          <div className="flex flex-col justify-center">
            <div className="reveal">
              <span className="text-gold text-[12px] font-semibold tracking-[0.35em] uppercase block mb-4">
                {t("label")}
              </span>
              <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-[-0.02em] text-noir mb-6">
                {t("title")}{" "}
                <em className="italic text-gold">{t("titleHighlight")}</em>
              </h2>
              <p className="text-moss text-[15px] leading-relaxed max-w-md">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div>
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
                  <label
                    className={labelClasses("telefono", formData.telefono)}
                  >
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

              {/* Specialty */}
              <div className="relative">
                <label
                  className={labelClasses(
                    "especialidad",
                    formData.especialidad
                  )}
                >
                  {t("form.specialty")}
                </label>
                <input
                  type="text"
                  value={formData.especialidad}
                  onFocus={() => setFocused("especialidad")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, especialidad: e.target.value })
                  }
                  className={inputClasses("especialidad")}
                />
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
                className="w-full bg-noir text-white py-4.5 text-[13px] font-semibold tracking-[0.25em] uppercase hover:bg-gold transition-all duration-500 mt-4"
              >
                {t("form.submit")}
              </button>

              <p className="text-moss/50 text-[12px] text-center mt-4">
                {t("form.privacy")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
