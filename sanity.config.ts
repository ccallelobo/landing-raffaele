"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "raffaele-studio",
  title: "Dr. Raffaele — CMS",

  projectId: "ykf6zrj4",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title("Contenido")
          .items([
            // Singleton: Doctor Profile
            S.listItem()
              .title("Perfil del Doctor")
              .id("doctorProfile")
              .child(
                S.document()
                  .schemaType("doctorProfile")
                  .documentId("doctorProfile")
                  .title("Perfil del Doctor")
              ),
            S.divider(),
            // Rest of document types (excluding singleton)
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "doctorProfile"
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: "/studio",
});
