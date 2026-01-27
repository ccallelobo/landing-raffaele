"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#resultados", label: "Resultados" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-divider)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <a
          href="#inicio"
          className="group flex items-center gap-3"
        >
          <span
            className={`font-display text-[22px] md:text-[26px] tracking-[0.02em] transition-colors duration-500 ${
              scrolled ? "text-noir" : "text-white"
            }`}
          >
            Raffaele
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-brass after:transition-all after:duration-300 hover:after:w-full ${
                scrolled
                  ? "text-noir/50 hover:text-brass"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`ml-4 px-7 py-3 text-[12px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
              scrolled
                ? "bg-noir text-white hover:bg-brass"
                : "bg-white/10 text-white border border-white/20 hover:bg-white hover:text-noir"
            }`}
          >
            Reservar
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Menú"
        >
          <div className="relative w-6 h-4">
            <span
              className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ${
                scrolled ? "bg-noir" : "bg-white"
              } ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] transition-all duration-300 ${
                scrolled ? "bg-noir" : "bg-white"
              } ${open ? "opacity-0 scale-x-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ${
                scrolled ? "bg-noir" : "bg-white"
              } ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-noir/98 backdrop-blur-2xl transition-all duration-500 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-white/80 hover:text-brass transition-colors duration-300"
              style={{
                transitionDelay: open ? `${i * 80}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-4 px-10 py-4 bg-brass text-white text-[13px] font-semibold tracking-[0.2em] uppercase hover:bg-brass-dark transition-colors"
            style={{
              transitionDelay: open ? `${links.length * 80}ms` : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${links.length * 80}ms`,
            }}
          >
            Reservar Cita
          </a>
        </div>

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-7 right-8 w-8 h-8 flex items-center justify-center"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
