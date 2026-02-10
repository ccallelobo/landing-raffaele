import type { SanityTratamiento } from "@/lib/sanity";

export function getLocalizedNombre(
  t: SanityTratamiento,
  locale: string
): string {
  if (locale === "es" && t.nombreES) return t.nombreES;
  return t.nombre;
}

export function getLocalizedResumen(
  t: SanityTratamiento,
  locale: string
): string | undefined {
  if (locale === "es" && t.resumenCortoES) return t.resumenCortoES;
  return t.resumenCorto;
}

export function getLocalizedDescripcion(
  t: SanityTratamiento,
  locale: string
): any[] | undefined {
  if (locale === "es" && t.descripcionES?.length) return t.descripcionES;
  return t.descripcion;
}
