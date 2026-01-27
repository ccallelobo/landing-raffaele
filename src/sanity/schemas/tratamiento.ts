import { defineField, defineType } from "sanity";

export default defineType({
  name: "tratamiento",
  title: "Tratamiento",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "num",
      title: "Número",
      type: "string",
      description: 'Número de orden, ej: "01", "02"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Número",
      name: "numAsc",
      by: [{ field: "num", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "titulo", subtitle: "num", media: "imagen" },
  },
});
