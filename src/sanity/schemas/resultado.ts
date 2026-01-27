import { defineField, defineType } from "sanity";

export default defineType({
  name: "resultado",
  title: "Resultado",
  type: "document",
  fields: [
    defineField({
      name: "tratamiento",
      title: "Tratamiento",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imagenAntes",
      title: "Imagen Antes",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imagenDespues",
      title: "Imagen Después",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "tratamiento", subtitle: "descripcion", media: "imagenAntes" },
  },
});
