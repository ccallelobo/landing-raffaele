import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* ── Types ─────────────────────────────────────────────── */

export interface SanityTratamiento {
  _id: string;
  titulo: string;
  num: string;
  descripcion: string;
  imagen?: SanityImageSource;
}

export interface SanityResultado {
  _id: string;
  tratamiento: string;
  descripcion: string;
  imagenAntes: SanityImageSource;
  imagenDespues: SanityImageSource;
}

export interface SanityResena {
  _id: string;
  nombre: string;
  tratamiento: string;
  texto: string;
  estrellas: number;
  avatar?: SanityImageSource;
}

/* ── GROQ Queries ──────────────────────────────────────── */

const tratamientosQuery = `*[_type == "tratamiento"] | order(num asc) {
  _id, titulo, num, descripcion, imagen
}`;

const resultadosQuery = `*[_type == "resultado"] {
  _id, tratamiento, descripcion, imagenAntes, imagenDespues
}`;

const resenasQuery = `*[_type == "resena"] | order(_createdAt desc) {
  _id, nombre, tratamiento, texto, estrellas, avatar
}`;

/* ── Fetch helpers (resilient — return [] on failure) ─── */

export async function getTratamientos(): Promise<SanityTratamiento[]> {
  return client.fetch<SanityTratamiento[]>(tratamientosQuery).catch(() => []);
}

export async function getResultados(): Promise<SanityResultado[]> {
  return client.fetch<SanityResultado[]>(resultadosQuery).catch(() => []);
}

export async function getResenas(): Promise<SanityResena[]> {
  return client.fetch<SanityResena[]>(resenasQuery).catch(() => []);
}
