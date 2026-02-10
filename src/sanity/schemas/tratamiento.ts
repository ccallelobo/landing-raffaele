import { defineField, defineType } from "sanity";

export default defineType({
  name: "tratamiento",
  title: "Tratamiento",
  type: "document",
  fieldsets: [
    { name: "italiano", title: "🇮🇹 Italiano" },
    { name: "espanol", title: "🇪🇸 Español" },
  ],
  fields: [
    // ── Italian fields ──
    defineField({
      name: "nombre",
      title: "Nome (Italiano)",
      type: "string",
      fieldset: "italiano",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "resumenCorto",
      title: "Riassunto breve (Italiano)",
      type: "string",
      fieldset: "italiano",
      description: "Testo breve per la card (max 100 caratteri)",
      validation: (r) => r.max(100),
    }),
    defineField({
      name: "descripcion",
      title: "Descrizione (Italiano)",
      type: "array",
      fieldset: "italiano",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    // ── Spanish fields ──
    defineField({
      name: "nombreES",
      title: "Nombre (Español)",
      type: "string",
      fieldset: "espanol",
    }),
    defineField({
      name: "resumenCortoES",
      title: "Resumen corto (Español)",
      type: "string",
      fieldset: "espanol",
      description: "Texto breve para la tarjeta (máx. 100 caracteres)",
      validation: (r) => r.max(100),
    }),
    defineField({
      name: "descripcionES",
      title: "Descripción (Español)",
      type: "array",
      fieldset: "espanol",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    // ── Shared fields ──
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nombre" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "zona",
      title: "Zona corporal",
      type: "string",
      options: {
        list: [
          { title: "Facial", value: "facial" },
          { title: "Corporal", value: "corporal" },
          { title: "Skin Quality", value: "skin-quality" },
          { title: "Capilar", value: "capilar" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resultados",
      title: "Resultados (Antes / Después)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "descripcion",
              title: "Descripción",
              type: "string",
            },
            {
              name: "imagenAntes",
              title: "Imagen Antes",
              type: "image",
              options: { hotspot: true },
              validation: (r: any) => r.required(),
            },
            {
              name: "imagenDespues",
              title: "Imagen Después",
              type: "image",
              options: { hotspot: true },
              validation: (r: any) => r.required(),
            },
          ],
          preview: {
            select: { title: "descripcion", media: "imagenAntes" },
            prepare({ title, media }: { title?: string; media?: any }) {
              return { title: title || "Resultado", media };
            },
          },
        },
      ],
    }),
    defineField({
      name: "orden",
      title: "Orden",
      type: "number",
      description: "Orden de aparición dentro de la zona",
    }),
  ],
  orderings: [
    {
      title: "Zona y orden",
      name: "zonaOrden",
      by: [
        { field: "zona", direction: "asc" },
        { field: "orden", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "nombre", subtitle: "zona", media: "imagen" },
  },
});
