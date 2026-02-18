import { defineField, defineType } from "sanity";

export default defineType({
  name: "doctorProfile",
  title: "Perfil del Doctor",
  type: "document",
  fields: [
    defineField({
      name: "imagenHero",
      title: "Imagen del Hero (Home)",
      description: "Foto del doctor para la sección hero de la landing. Si está vacío se usa la imagen por defecto.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagenSobreMi",
      title: "Imagen sección Sobre Mí (Home)",
      description: "Foto del doctor para la sección Sobre Mí en la landing. Si está vacío se usa la imagen por defecto.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagenPagina",
      title: "Imagen de la página Sobre Mí",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagenTratamientos",
      title: "Imagen sección Doctor (Zonas)",
      description: "Foto del doctor que aparece en las páginas de zona de tratamientos. Si está vacío la sección no se muestra.",
      type: "image",
      options: { hotspot: true },
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
      name: "curriculumPDF",
      title: "Curriculum Vitae (PDF)",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Perfil del Doctor" };
    },
  },
});
