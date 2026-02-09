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

export interface SanityTratamientoResultado {
  _key: string;
  descripcion?: string;
  imagenAntes: SanityImageSource;
  imagenDespues: SanityImageSource;
}

export interface SanityTratamiento {
  _id: string;
  nombre: string;
  slug: { current: string };
  zona: "facial" | "corporal" | "skin-quality" | "capilar";
  imagen?: SanityImageSource;
  resumenCorto?: string;
  descripcion?: any[]; // PortableText blocks
  resultados?: SanityTratamientoResultado[];
  orden?: number;
}

export interface SanityAngulo {
  _key: string;
  nombre: string;
  antes: SanityImageSource;
  despues: SanityImageSource;
}

export interface SanityResultado {
  _id: string;
  tratamiento: string;
  descripcion: string;
  // Legacy fields (single image)
  imagenAntes?: SanityImageSource;
  imagenDespues?: SanityImageSource;
  // New field for multiple angles
  angulos?: SanityAngulo[];
  // Associated treatments for zone filtering
  tratamientosAsociados?: { _id: string; nombre: string; zona: string }[];
}

export interface SanityResena {
  _id: string;
  nombre: string;
  tratamiento: string;
  texto: string;
  estrellas: number;
  avatar?: SanityImageSource;
}

export interface SanityZonaConfig {
  _id: string;
  zona: string;
  tituloES: string;
  tituloIT: string;
  descripcionES: string;
  descripcionIT: string;
  imagen?: SanityImageSource;
}

/* ── GROQ Queries ──────────────────────────────────────── */

const tratamientosQuery = `*[_type == "tratamiento"] | order(zona asc, orden asc) {
  _id, nombre, slug, zona, imagen, resumenCorto, descripcion, resultados[] { _key, descripcion, imagenAntes, imagenDespues }, orden
}`;

const tratamientosPorZonaQuery = `*[_type == "tratamiento" && zona == $zona] | order(orden asc) {
  _id, nombre, slug, zona, imagen, resumenCorto, descripcion, resultados[] { _key, descripcion, imagenAntes, imagenDespues }, orden
}`;

const resultadosQuery = `*[_type == "resultado"] {
  _id, tratamiento, descripcion, imagenAntes, imagenDespues,
  angulos[] { _key, nombre, antes, despues },
  "tratamientosAsociados": tratamientosAsociados[]-> { _id, nombre, zona }
}`;

const resultadosPorZonaQuery = `*[_type == "resultado" && count(tratamientosAsociados[@ -> zona == $zona]) > 0] {
  _id, tratamiento, descripcion, imagenAntes, imagenDespues,
  angulos[] { _key, nombre, antes, despues },
  "tratamientosAsociados": tratamientosAsociados[]-> { _id, nombre, zona }
}`;

const resenasQuery = `*[_type == "resena"] | order(_createdAt desc) {
  _id, nombre, tratamiento, texto, estrellas, avatar
}`;

const zonaConfigQuery = `*[_type == "zonaConfig" && zona == $zona][0] {
  _id, zona, tituloES, tituloIT, descripcionES, descripcionIT, imagen
}`;

const tratamientoBySlugQuery = `*[_type == "tratamiento" && slug.current == $slug && zona == $zona][0] {
  _id, nombre, slug, zona, imagen, resumenCorto, descripcion, resultados[] { _key, descripcion, imagenAntes, imagenDespues }, orden
}`;

const resultadosPorTratamientoQuery = `*[_type == "resultado" && references($tratamientoId)] {
  _id, tratamiento, descripcion, imagenAntes, imagenDespues,
  angulos[] { _key, nombre, antes, despues },
  "tratamientosAsociados": tratamientosAsociados[]-> { _id, nombre, zona }
}`;

/* ── Fetch helpers (resilient — return [] on failure) ─── */

export async function getTratamientos(): Promise<SanityTratamiento[]> {
  return client.fetch<SanityTratamiento[]>(tratamientosQuery).catch(() => []);
}

export async function getTratamientosPorZona(
  zona: string
): Promise<SanityTratamiento[]> {
  return client
    .fetch<SanityTratamiento[]>(tratamientosPorZonaQuery, { zona })
    .catch(() => []);
}

export async function getResultados(): Promise<SanityResultado[]> {
  return client.fetch<SanityResultado[]>(resultadosQuery).catch(() => []);
}

export async function getResultadosPorZona(
  zona: string
): Promise<SanityResultado[]> {
  return client
    .fetch<SanityResultado[]>(resultadosPorZonaQuery, { zona })
    .catch(() => []);
}

export async function getResenas(): Promise<SanityResena[]> {
  return client.fetch<SanityResena[]>(resenasQuery).catch(() => []);
}

export async function getZonaConfig(
  zona: string
): Promise<SanityZonaConfig | null> {
  return client
    .fetch<SanityZonaConfig | null>(zonaConfigQuery, { zona })
    .catch(() => null);
}

export async function getTratamientoBySlug(
  slug: string,
  zona: string
): Promise<SanityTratamiento | null> {
  return client
    .fetch<SanityTratamiento | null>(tratamientoBySlugQuery, { slug, zona })
    .catch(() => null);
}

export async function getResultadosPorTratamiento(
  tratamientoId: string
): Promise<SanityResultado[]> {
  return client
    .fetch<SanityResultado[]>(resultadosPorTratamientoQuery, { tratamientoId })
    .catch(() => []);
}
