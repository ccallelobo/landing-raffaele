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
    // Campos legacy para compatibilidad con datos existentes
    defineField({
      name: "imagenAntes",
      title: "Imagen Antes (Legacy)",
      type: "image",
      options: { hotspot: true },
      description: "Campo legacy. Usa 'Ángulos' para nuevos casos.",
      hidden: ({ document }) => !!(document?.angulos as unknown[])?.length,
    }),
    defineField({
      name: "imagenDespues",
      title: "Imagen Después (Legacy)",
      type: "image",
      options: { hotspot: true },
      description: "Campo legacy. Usa 'Ángulos' para nuevos casos.",
      hidden: ({ document }) => !!(document?.angulos as unknown[])?.length,
    }),
    // Nuevo campo para múltiples ángulos
    defineField({
      name: "angulos",
      title: "Ángulos",
      type: "array",
      description: "Añade diferentes ángulos del mismo caso (frontal, perfil izquierdo, perfil derecho, etc.)",
      of: [
        {
          type: "object",
          name: "angulo",
          title: "Ángulo",
          fields: [
            defineField({
              name: "nombre",
              title: "Nombre del ángulo",
              type: "string",
              options: {
                list: [
                  { title: "Frontal", value: "Frontal" },
                  { title: "Perfil Izquierdo", value: "Perfil Izquierdo" },
                  { title: "Perfil Derecho", value: "Perfil Derecho" },
                  { title: "Tres Cuartos Izquierdo", value: "Tres Cuartos Izquierdo" },
                  { title: "Tres Cuartos Derecho", value: "Tres Cuartos Derecho" },
                  { title: "Superior", value: "Superior" },
                  { title: "Inferior", value: "Inferior" },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "antes",
              title: "Imagen Antes",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "despues",
              title: "Imagen Después",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "nombre", media: "antes" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "tratamiento",
      subtitle: "descripcion",
      media: "imagenAntes",
      angulo0: "angulos.0.antes",
    },
    prepare({ title, subtitle, media, angulo0 }) {
      return {
        title,
        subtitle,
        media: angulo0 || media,
      };
    },
  },
});
