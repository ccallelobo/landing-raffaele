import { defineField, defineType } from "sanity";

export default defineType({
  name: "zonaConfig",
  title: "Configuración de Zona",
  type: "document",
  fields: [
    defineField({
      name: "zona",
      title: "Zona",
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
      name: "tituloES",
      title: "Título (Español)",
      type: "string",
    }),
    defineField({
      name: "tituloIT",
      title: "Título (Italiano)",
      type: "string",
    }),
    defineField({
      name: "descripcionES",
      title: "Descripción (Español)",
      type: "string",
    }),
    defineField({
      name: "descripcionIT",
      title: "Descripción (Italiano)",
      type: "string",
    }),
    defineField({
      name: "imagen",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "zona", media: "imagen" },
    prepare({ title, media }) {
      const labels: Record<string, string> = {
        facial: "Zona Facial",
        corporal: "Zona Corporal",
        "skin-quality": "Zona Skin Quality",
        capilar: "Zona Capilar",
      };
      return {
        title: labels[title] || title,
        media,
      };
    },
  },
});
