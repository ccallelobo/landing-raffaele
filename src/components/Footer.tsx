"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/dr_raffaele_delprete/",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/34604894697",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const anchorLinks = [
    { href: "#inicio", label: t("home") },
    { href: "#tratamientos", label: tNav("treatments") },
    { href: "#resultados", label: tNav("results") },
    { href: "#resenas", label: tNav("reviews") },
  ];

  return (
    <footer className="bg-noir border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Main footer */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Image
              src="/firma-logo.png"
              alt="Dr. Raffaele Del Prete"
              width={200}
              height={64}
              className="h-24 md:h-[7.5rem] w-auto brightness-0 invert mb-4"
            />
            <p className="text-white/30 text-[14px] leading-relaxed max-w-xs">
              {t("description")}
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <h4 className="text-white/50 text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              {t("navigation")}
            </h4>
            <nav className="flex flex-col gap-3">
              {anchorLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/30 text-[14px] hover:text-gold transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/sobre-mi"
                className="text-white/30 text-[14px] hover:text-gold transition-colors duration-300 w-fit"
              >
                {tNav("aboutMe")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-white/50 text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              {t("contactLabel")}
            </h4>
            <div className="flex flex-col gap-4">
              {/* Spain */}
              <div>
                <p className="text-gold text-[13px] font-medium mb-1">{t("spainLabel")}</p>
                <p className="text-white/30 text-[13px] leading-relaxed">
                  {t("spainAddress1")}
                  <br />
                  {t("spainAddress2")}
                </p>
              </div>
              {/* Italy */}
              <div>
                <p className="text-gold text-[13px] font-medium mb-1">{t("italyLabel")}</p>
                <p className="text-white/30 text-[13px] leading-relaxed">
                  {t("italyAddress1")}
                  {t("italyAddress2") && (
                    <>
                      <br />
                      {t("italyAddress2")}
                    </>
                  )}
                </p>
              </div>
              {/* Phone & Email */}
              <div className="flex flex-col gap-1 mt-1">
                <a
                  href={`tel:${t("phone").replace(/\s/g, "")}`}
                  className="text-white/30 text-[13px] hover:text-gold transition-colors w-fit"
                >
                  {t("phone")}
                </a>
                <a
                  href={`mailto:${t("email")}`}
                  className="text-white/30 text-[13px] hover:text-gold transition-colors w-fit"
                >
                  {t("email")}
                </a>
              </div>
            </div>
          </div>

          {/* Social + legal */}
          <div className="md:col-span-3">
            <h4 className="text-white/50 text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              {t("followUs")}
            </h4>
            <div className="flex gap-3 mb-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/40 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/privacidad"
                className="text-white/20 text-[13px] hover:text-gold transition-colors"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/aviso-legal"
                className="text-white/20 text-[13px] hover:text-gold transition-colors"
              >
                {t("legal")}
              </Link>
              <Link
                href="/cookies"
                className="text-white/20 text-[13px] hover:text-gold transition-colors"
              >
                {t("cookiePolicy")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.06] flex justify-center items-center">
          <p className="text-white/15 text-[12px] tracking-wide">
            &copy; {new Date().getFullYear()} Dr. Raffaele. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
