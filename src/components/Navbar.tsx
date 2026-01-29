"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
  // Capture the scrolled state when menu opens
  const [menuTheme, setMenuTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When opening menu, capture current theme
  const handleToggleMenu = () => {
    if (!open) {
      setMenuTheme(scrolled ? "light" : "dark");
    }
    setOpen(!open);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const isDarkMenu = menuTheme === "dark";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-stone backdrop-blur-xl shadow-[0_1px_0_0_var(--color-moss)] before:absolute before:bottom-full before:left-0 before:right-0 before:h-24 before:bg-stone"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex items-center justify-between h-28 md:h-32">
          {/* Logo */}
          <a
            href="#inicio"
            className="group flex items-center"
          >
            <Image
              src="/firma-logo.png"
              alt="Dr. Raffaele Del Prete"
              width={220}
              height={70}
              className={`h-20 md:h-24 w-auto transition-all duration-500 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled
                    ? "text-noir/50 hover:text-gold"
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
                  ? "bg-noir text-white hover:bg-gold"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white hover:text-noir"
              }`}
            >
              Reservar
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={handleToggleMenu}
            className="lg:hidden relative w-8 h-8 flex items-center justify-center z-[70]"
            aria-label="Menú"
          >
            <div className="relative w-6 h-4">
              <span
                className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ${
                  open
                    ? isDarkMenu ? "bg-white" : "bg-noir"
                    : scrolled ? "bg-noir" : "bg-white"
                } ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] transition-all duration-300 ${
                  open
                    ? isDarkMenu ? "bg-white" : "bg-noir"
                    : scrolled ? "bg-noir" : "bg-white"
                } ${open ? "opacity-0 scale-x-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ${
                  open
                    ? isDarkMenu ? "bg-white" : "bg-noir"
                    : scrolled ? "bg-noir" : "bg-white"
                } ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu — full screen overlay (outside nav for proper stacking) */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-500 ${
          isDarkMenu ? "bg-noir" : "bg-stone"
        } ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Logo in mobile menu */}
        <div
          className={`absolute top-16 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
            open ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          <Image
            src={isDarkMenu ? "/logo-blanco.webp" : "/logo-negro.webp"}
            alt="Dr. Raffaele Del Prete"
            width={180}
            height={390}
            className="h-52 w-auto"
          />
        </div>

        <div className="flex flex-col items-center justify-center h-full gap-8 pt-40">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleCloseMenu}
              className={`font-display text-3xl hover:text-gold transition-all duration-500 ${
                isDarkMenu ? "text-white/80" : "text-noir/80"
              } ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: open ? `${i * 80}ms` : "0ms",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={handleCloseMenu}
            className={`mt-4 px-10 py-4 bg-gold text-white text-[13px] font-semibold tracking-[0.2em] uppercase hover:bg-gold-dark transition-all duration-500 ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{
              transitionDelay: open ? `${links.length * 80}ms` : "0ms",
            }}
          >
            Reservar Cita
          </a>
        </div>

        {/* Close button */}
        <button
          onClick={handleCloseMenu}
          className="absolute top-7 right-8 w-8 h-8 flex items-center justify-center"
          aria-label="Cerrar"
        >
          <svg
            className={`w-6 h-6 ${isDarkMenu ? "text-white/60" : "text-noir/60"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}
