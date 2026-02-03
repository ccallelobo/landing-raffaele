"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const locales = [
  { code: "es", label: "ES" },
  { code: "it", label: "IT" },
] as const;

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "light",
  className = "",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: string) => {
    // Save preference in cookie (1 year)
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    // Replace locale in pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  const isDark = variant === "dark";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleChange(loc.code)}
          disabled={isPending || locale === loc.code}
          className={`px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
            locale === loc.code
              ? "bg-gold text-white"
              : isDark
              ? "text-white/40 hover:text-white border border-white/10 hover:border-white/30"
              : "text-noir/40 hover:text-noir border border-noir/10 hover:border-noir/30"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
