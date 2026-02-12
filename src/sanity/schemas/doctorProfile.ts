import { defineField, defineType } from "sanity";

export default defineType({
  name: "doctorProfile",
  title: "Perfil del Doctor",
  type: "document",
  fields: [
    defineField({
      name: "curriculumPDF",
      title: "Curriculum Vitae (PDF)",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "sellos",
      title: "Sellos / Sociedades Médicas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "nombre",
              title: "Nombre",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "imagen",
              title: "Logo / Sello",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "URL (opcional)",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "nombre", media: "imagen" },
          },
        },
      ],
    }),
    defineField({
      name: "imagenPagina",
      title: "Imagen de la página Sobre Mí",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Perfil del Doctor" };
    },
  },
});
