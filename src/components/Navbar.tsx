"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

const zonas = [
  { key: "facial" as const, slug: "facial" },
  { key: "corporal" as const, slug: "corporal" },
  { key: "skin-quality" as const, slug: "skin-quality" },
  { key: "capilar" as const, slug: "capilar" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const tz = useTranslations("zonas");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTheme, setMenuTheme] = useState<"dark" | "light">("dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On home: plain anchor for smooth scroll. Elsewhere: navigate to home + anchor.
  const sectionHref = (hash: string) =>
    isHome ? hash : `/${locale}/${hash}`;

  const otherLinks = [
    { href: "#sobre-mi", label: t("aboutMe") },
    { href: "#resultados", label: t("results") },
    { href: "#resenas", label: t("reviews") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleMenu = () => {
    if (!open) {
      setMenuTheme(scrolled ? "light" : "dark");
      setMobileSubOpen(false);
    }
    setOpen(!open);
  };

  const handleCloseMenu = () => {
    setOpen(false);
    setMobileSubOpen(false);
  };

  // Desktop dropdown hover with delay to prevent flickering
  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const isDarkMenu = menuTheme === "dark";

  const linkClass = `relative text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
    scrolled ? "text-noir/50 hover:text-gold" : "text-white/60 hover:text-white"
  }`;

  // All mobile items for stagger animation (Tratamientos + 4 zones + other links)
  const mobileItemCount = 1 + (mobileSubOpen ? zonas.length : 0) + otherLinks.length;
  let mobileIdx = 0;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-stone backdrop-blur-xl shadow-[0_1px_0_0_var(--color-moss)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex items-center justify-between h-28 md:h-32">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
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
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Tratamientos with dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <a href={sectionHref("#tratamientos")} className={`${linkClass} flex items-center gap-1.5`}>
                {t("treatments")}
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  dropdownOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-white/95 backdrop-blur-xl shadow-lg border border-moss/15 min-w-[220px]">
                  {zonas.map((zona, i) => (
                    <Link
                      key={zona.key}
                      href={{
                        pathname: "/tratamientos/[zona]",
                        params: { zona: zona.slug },
                      }}
                      className={`block px-6 py-3.5 text-[12px] font-medium tracking-[0.15em] uppercase text-noir/60 hover:text-gold hover:bg-gold/5 transition-all duration-200 ${
                        i < zonas.length - 1 ? "border-b border-moss/10" : ""
                      }`}
                    >
                      {tz(`${zona.key}.title`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other links */}
            {otherLinks.map((link) => (
              <a key={link.href} href={sectionHref(link.href)} className={linkClass}>
                {link.label}
              </a>
            ))}
            <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={handleToggleMenu}
            className="lg:hidden relative w-8 h-8 flex items-center justify-center z-[70]"
            aria-label={t("menu")}
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

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-500 ${
          isDarkMenu ? "bg-noir" : "bg-stone"
        } ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
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

        <div className="flex flex-col items-center justify-center h-full gap-6 pt-40">
          {/* Tratamientos toggle */}
          {(() => {
            const idx = mobileIdx++;
            return (
              <button
                onClick={() => setMobileSubOpen(!mobileSubOpen)}
                className={`font-display text-3xl hover:text-gold transition-all duration-500 flex items-center gap-2 ${
                  isDarkMenu ? "text-white/80" : "text-noir/80"
                } ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: open ? `${idx * 80}ms` : "0ms" }}
              >
                {t("treatments")}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${mobileSubOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            );
          })()}

          {/* Zone sub-links */}
          {mobileSubOpen &&
            zonas.map((zona) => {
              const idx = mobileIdx++;
              return (
                <Link
                  key={zona.key}
                  href={{
                    pathname: "/tratamientos/[zona]",
                    params: { zona: zona.slug },
                  }}
                  onClick={handleCloseMenu}
                  className={`font-display text-xl hover:text-gold transition-all duration-500 ${
                    isDarkMenu ? "text-gold/70" : "text-gold/80"
                  } ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transitionDelay: open ? `${idx * 60}ms` : "0ms" }}
                >
                  {tz(`${zona.key}.title`)}
                </Link>
              );
            })}

          {/* Other links */}
          {otherLinks.map((link) => {
            const idx = mobileIdx++;
            return (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                onClick={handleCloseMenu}
                className={`font-display text-3xl hover:text-gold transition-all duration-500 ${
                  isDarkMenu ? "text-white/80" : "text-noir/80"
                } ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: open ? `${idx * 80}ms` : "0ms" }}
              >
                {link.label}
              </a>
            );
          })}

          {/* Language Switcher */}
          <div
            className={`transition-all duration-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: open ? `${mobileItemCount * 80}ms` : "0ms" }}
          >
            <LanguageSwitcher variant={isDarkMenu ? "dark" : "light"} />
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleCloseMenu}
          className="absolute top-7 right-8 w-8 h-8 flex items-center justify-center"
          aria-label={t("close")}
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
