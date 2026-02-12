import { defineField, defineType } from "sanity";

export default defineType({
  name: "resena",
  title: "Reseña",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre del paciente",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tratamiento",
      title: "Tratamiento realizado",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "texto",
      title: "Texto de la reseña",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "estrellas",
      title: "Estrellas",
      type: "number",
      validation: (r) => r.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "tratamiento", media: "avatar" },
  },
});
