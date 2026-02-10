"use client";

import { useLocale } from "next-intl";

const WHATSAPP_CONFIG = {
  es: {
    phone: "34604894697",
    message:
      "Hola Dr. Raffaele, me gustaría solicitar información sobre sus tratamientos de medicina estética. ¿Podría ayudarme?",
  },
  it: {
    // Número italiano pendiente — usa el español como fallback temporal
    phone: "34604894697",
    message:
      "Buongiorno Dr. Raffaele, vorrei richiedere informazioni sui suoi trattamenti di medicina estetica. Potrebbe aiutarmi?",
  },
} as const;

export default function WhatsAppBubble() {
  const locale = useLocale() as keyof typeof WHATSAPP_CONFIG;
  const config = WHATSAPP_CONFIG[locale] ?? WHATSAPP_CONFIG.es;

  const href = `https://wa.me/${config.phone}?text=${encodeURIComponent(config.message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-[9997] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-white"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.336 22.594c-.39 1.1-1.932 2.012-3.186 2.278-.856.18-1.974.324-5.736-1.232-4.814-1.99-7.916-6.872-8.156-7.192-.232-.32-1.942-2.586-1.942-4.932s1.228-3.498 1.664-3.978c.436-.48.952-.6 1.27-.6.316 0 .63.002.906.016.29.014.68-.11 1.064.812.39.94 1.33 3.246 1.446 3.482.116.236.194.512.038.826-.156.32-.234.518-.466.798-.232.28-.488.626-.698.84-.232.236-.474.492-.204.964.272.472 1.208 1.992 2.594 3.228 1.782 1.588 3.284 2.08 3.748 2.314.464.234.736.196 1.006-.118.272-.316 1.166-1.356 1.476-1.822.31-.466.62-.386 1.046-.232.428.154 2.724 1.284 3.19 1.518.464.234.774.352.89.546.116.194.116 1.126-.274 2.224z" />
      </svg>
    </a>
  );
}
