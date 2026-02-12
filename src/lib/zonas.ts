/** Maps URL slugs (from any locale) to Sanity zona values */
export const slugToZona: Record<string, string> = {
  facial: "facial",
  viso: "facial",
  facciale: "facial", // backward compat
  corporal: "corporal",
  corpo: "corporal",
  corporale: "corporal", // backward compat
  "skin-quality": "skin-quality",
  capilar: "capilar",
  capelli: "capilar",
};

/** Maps Sanity zona values to localized URL slugs */
export const zonaToSlug: Record<string, Record<string, string>> = {
  es: {
    facial: "facial",
    corporal: "corporal",
    "skin-quality": "skin-quality",
    capilar: "capilar",
  },
  it: {
    facial: "viso",
    corporal: "corpo",
    "skin-quality": "skin-quality",
    capilar: "capelli",
  },
};

/** All valid zone slugs for generateStaticParams */
export const allZoneSlugs = [
  "facial",
  "viso",
  "facciale",
  "corporal",
  "corpo",
  "corporale",
  "skin-quality",
  "capilar",
  "capelli",
];
