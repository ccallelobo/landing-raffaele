"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9998] transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-noir border-t border-white/10 px-6 py-5 md:px-8 md:py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-white/70 text-sm leading-relaxed">
              Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación y analizar el uso del sitio.
              Puedes aceptar todas las cookies, rechazarlas o configurar tus preferencias.{" "}
              <Link href="/cookies" className="text-gold hover:underline">
                Más información
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={rejectCookies}
              className="px-5 py-2.5 text-white/50 text-[12px] font-semibold tracking-[0.15em] uppercase hover:text-white transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2.5 bg-gold text-white text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-gold-dark transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
