"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const locales = [
  { code: "es", label: "🇪🇸" },
  { code: "it", label: "🇮🇹" },
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

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleChange(loc.code)}
          disabled={isPending || locale === loc.code}
          className={`p-1 text-xl transition-opacity duration-300 ${
            locale === loc.code
              ? "opacity-100"
              : "opacity-40 hover:opacity-70"
          } ${isPending ? "opacity-30 cursor-not-allowed" : ""}`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
