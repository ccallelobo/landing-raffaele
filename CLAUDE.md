# Landing Dr. Raffaele Del Prete

## Tech Stack
- **Framework**: Next.js 16.1.5 (App Router)
- **Styling**: Tailwind CSS v4 con CSS variables + `@tailwindcss/typography`
- **CMS**: Sanity (proyecto: ykf6zrj4, dataset: production)
- **Deploy**: Vercel (auto-deploy desde main)
- **i18n**: next-intl (ES/IT con detección geográfica)

## Información de Contacto
- **Ubicación ES**: Calle Paris n 28, 41089 Dos Hermanas (Sevilla)
- **Ubicación IT**: Via Riscatto n 5, 80027 Frattamaggiore (Napoli)
- **Teléfono**: +34 604 89 46 97
- **Email**: dr.rafdelprete@gmail.com
- **Instagram**: https://www.instagram.com/dr_raffaele_delprete/
- **WhatsApp ES**: https://wa.me/34604894697
- **WhatsApp IT**: https://wa.me/393760976953

## Paleta de Colores
```css
--color-stone: #DDDCDB   /* fondos claros, casi blanco */
--color-moss: #B8B0A1    /* beige/tierra */
--color-gold: #96825F    /* acentos dorados */
--color-gold-dark: #7D6C4A
--color-noir: #181818    /* textos oscuros, fondos negros */
```

## Internacionalización (i18n)

### Idiomas Soportados
- **Español (ES)**: Idioma por defecto
- **Italiano (IT)**: Segundo idioma

### Detección Automática
El middleware detecta el país del visitante usando el header `x-vercel-ip-country`:
- Visitantes desde Italia → Redirige a `/it/`
- Resto del mundo → Redirige a `/es/`
- La preferencia manual (cookie `NEXT_LOCALE`) tiene prioridad

### Estructura de Rutas
```
/                    → Redirige según geolocalización
/es/                        → Landing en español
/es/tratamientos/facial     → Tratamientos faciales
/es/tratamientos/facial/[slug] → Detalle de tratamiento facial
/es/tratamientos/corporal   → Tratamientos corporales
/es/tratamientos/corporal/[slug] → Detalle de tratamiento corporal
/es/tratamientos/skin-quality → Tratamientos Skin Quality
/es/tratamientos/skin-quality/[slug] → Detalle de tratamiento skin quality
/es/tratamientos/capilar    → Tratamientos capilares
/es/tratamientos/capilar/[slug] → Detalle de tratamiento capilar
/es/sobre-mi                → Página Sobre Mí
/es/privacidad              → Política de Privacidad
/es/aviso-legal             → Aviso Legal
/es/cookies                 → Política de Cookies
/it/                        → Landing en italiano
/it/chi-sono                → Pagina Chi Sono
/it/trattamenti/viso        → Trattamenti facciali
/it/trattamenti/viso/[slug] → Dettaglio trattamento facciale
/it/trattamenti/corpo       → Trattamenti corporei
/it/trattamenti/corpo/[slug] → Dettaglio trattamento corporeo
/it/trattamenti/skin-quality → Trattamenti Skin Quality
/it/trattamenti/skin-quality/[slug] → Dettaglio trattamento skin quality
/it/trattamenti/capelli     → Trattamenti capillari
/it/trattamenti/capelli/[slug] → Dettaglio trattamento capillare
/it/privacy                 → Privacy Policy
/it/note-legali             → Note Legali
/it/cookie                  → Cookie Policy
/studio              → Sanity Studio (sin i18n)
/version-1 a /version-4 → Versiones de revisión (sin i18n)
/prototipos          → Prototipos de diseño (temporal)
```

### Archivos de Traducción
- `src/messages/es.json` - Traducciones en español
- `src/messages/it.json` - Traducciones en italiano

### Configuración i18n
- `src/i18n/routing.ts` - Definición de rutas localizadas
- `src/i18n/request.ts` - Carga de mensajes por idioma
- `src/middleware.ts` - Detección geográfica y redirecciones

### Selector de Idioma
El componente `LanguageSwitcher` está integrado en:
- Navbar desktop: entre los links de navegación y el botón "Reservar"
- Menú móvil: antes del botón "Reservar Cita"

**Diseño**: Usa banderas emoji (🇪🇸 / 🇮🇹) con indicador de opacidad:
- Idioma activo: opacidad 100%
- Idioma inactivo: opacidad 40% (70% en hover)

## Estructura
```
src/
├── app/
│   ├── layout.tsx             # Layout raíz (delega a hijos)
│   ├── globals.css            # Estilos globales + paleta
│   ├── robots.ts              # robots.txt dinámico (bloquea studio/versiones)
│   ├── sitemap.ts             # sitemap.xml dinámico (todas las URLs ES/IT + hreflang)
│   ├── [locale]/              # Rutas internacionalizadas
│   │   ├── layout.tsx         # Layout con NextIntlClientProvider + metadataBase + OG defaults
│   │   ├── page.tsx           # Landing principal (ISR 60s) + JSON-LD MedicalBusiness
│   │   ├── sobre-mi/          # Página dedicada Sobre Mí / Chi Sono
│   │   │   └── page.tsx       # Server component (ISR 60s)
│   │   └── (legal)/           # Páginas legales
│   │       ├── privacidad/    # Política de Privacidad
│   │       ├── aviso-legal/   # Aviso Legal
│   │       └── cookies/       # Política de Cookies
│   ├── studio/                # Sanity Studio embebido
│   ├── version-1/             # Versión 1 para revisión cliente
│   ├── version-2/             # Versión 2 para revisión cliente
│   ├── version-3/             # Versión 3 para revisión cliente
│   ├── version-4/             # Versión 4 para revisión cliente
│   └── prototipos/            # Prototipos de diseño (temporal)
│   │   ├── tratamientos/       # Páginas internas por zona
│   │   │   └── [zona]/        # Zona dinámica (facial/corporal/skin-quality/capilar)
│   │   │       └── [tratamiento]/ # Detalle individual + BreadcrumbList JSON-LD
├── components/
│   ├── Navbar.tsx             # Nav fijo + LanguageSwitcher integrado
│   ├── Hero.tsx               # Split-screen desktop, bg mobile
│   ├── Tratamientos.tsx       # 4 tarjetas de zona (Facial/Corporal/Skin Quality/Capilar) con links
│   ├── ZonaTratamientos.tsx   # Grid de tratamientos con links a detalle (client)
│   ├── TratamientoDetalle.tsx # Contenido de página individual de tratamiento (client)
│   ├── MarcasTecnologias.tsx  # Carrusel de marcas/tecnología (placeholder)
│   ├── SobreMi.tsx            # Sección resumen sobre el doctor (home)
│   ├── SobreMiPageContent.tsx # Contenido página dedicada Sobre Mí (client)
│   ├── Resultados.tsx         # Galería antes/después (datos de tabla resultado en Sanity)
│   ├── BeforeAfterSlider.tsx  # Slider interactivo antes/después (usado por Resultados)
│   ├── CasosExito.tsx         # Carrusel doble sincronizado (no usado en home, disponible para futuro)
│   ├── Resenas.tsx            # Reseñas de pacientes
│   ├── Contacto.tsx           # Formulario de contacto (pacientes)
│   ├── FormularioMedicos.tsx  # Formulario de colaboración (médicos)
│   ├── Footer.tsx             # Footer con links localizados
│   ├── CookieBanner.tsx       # Banner de cookies (RGPD)
│   ├── WhatsAppBubble.tsx     # Burbuja flotante de WhatsApp (locale-aware)
│   └── LanguageSwitcher.tsx   # Selector de idioma ES/IT
├── i18n/
│   ├── routing.ts             # Configuración de rutas
│   └── request.ts             # Carga de mensajes
├── messages/
│   ├── es.json                # Traducciones español
│   └── it.json                # Traducciones italiano
├── lib/
│   ├── sanity.ts              # Cliente y queries Sanity
│   ├── localize.ts            # Helpers i18n para campos bilingües de tratamientos
│   └── zonas.ts               # Mapeo de slugs de zona (URL ↔ Sanity)
├── hooks/
│   └── useReveal.ts           # Animaciones scroll reveal
└── middleware.ts              # Detección geográfica + i18n
```

## Imágenes
- Formato: WebP (calidad 90%) con fondo transparente
- Ubicación: `/public/`
- Logo firma: `firma-logo.png` (39KB)
- Logo blanco (menú móvil): `logo-blanco.webp` (33KB)
- Logo negro (menú móvil): `logo-negro.webp` (33KB)

### Imágenes Hero (fondo transparente)
- `hero-doctor.webp` (160KB) - versión 1 (original)
- `hero-doctor-v2.webp` (136KB) - versión 2
- `hero-doctor-v3.webp` (160KB) - versión 3
- `hero-doctor-v4.webp` (56KB) - versión 4

### Imágenes Sobre Mí (fondo transparente)
- `sobre-mi-doctor-v2.webp` (64KB) - versión 1 (original)
- `sobre-mi-doctor-v3.webp` (64KB) - versión 2
- `sobre-mi-doctor-v4.webp` (60KB) - versión 3 (imagen vertical, usa scale-200)
- `sobre-mi-doctor-v5.webp` (156KB) - versión 4
- `sobre-mi-doctor-v6.webp` (372KB) - extra disponible

## Sanity Schemas
- `tratamiento`: servicios médicos (nombre/nombreES, slug, zona, imagen, resumenCorto/resumenCortoES, descripcion/descripcionES rich text, resultados embebidos, orden)
- `resultado`: fotos antes/después legacy (soporta múltiples ángulos + tratamientosAsociados) — usado por Resultados en la home
- `resena`: testimonios de pacientes
- `zonaConfig`: configuración de zona (título/descripción ES/IT, imagen de portada)
- `doctorProfile`: singleton — CV en PDF, sellos/sociedades médicas, imagen de la página Sobre Mí

### Schema `tratamiento` (actualizado)
```
tratamiento {
  — fieldset 🇮🇹 Italiano —
  nombre: string (requerido)
  resumenCorto: string (máx. 100 chars)
  descripcion: array de block + image (rich text)
  — fieldset 🇪🇸 Español —
  nombreES: string (opcional, fallback a nombre)
  resumenCortoES: string (máx. 100 chars, opcional, fallback a resumenCorto)
  descripcionES: array de block + image (opcional, fallback a descripcion)
  — campos compartidos —
  slug: slug (source: nombre, requerido)
  zona: string (facial | corporal | skin-quality | capilar, requerido)
  imagen: image (hotspot)
  resultados: array de {
    descripcion: string (opcional)
    imagenAntes: image (requerido)
    imagenDespues: image (requerido)
  }
  orden: number
}
```

### Schema `resultado` (actualizado)
El schema `resultado` ahora soporta múltiples ángulos por caso:
```
resultado {
  tratamiento: string (requerido)
  descripcion: string (requerido)
  imagenAntes: image (legacy, opcional)
  imagenDespues: image (legacy, opcional)
  angulos: array de {
    nombre: string (Frontal, Perfil Izquierdo, Perfil Derecho, etc.)
    antes: image
    despues: image
  }
  tratamientosAsociados: array de reference a tratamiento
}
```
- Los campos `imagenAntes/imagenDespues` se ocultan automáticamente si hay ángulos
- Usa el array `angulos` para casos con múltiples perspectivas
- `tratamientosAsociados` vincula resultados a tratamientos para filtrarlos por zona

### Schema `zonaConfig`
```
zonaConfig {
  zona: string (facial | corporal | skin-quality | capilar, requerido)
  tituloES: string
  tituloIT: string
  descripcionES: string
  descripcionIT: string
  imagen: image (hotspot)
}
```

### Schema `doctorProfile` (singleton)
Configurado como singleton en Sanity Studio con documentId fijo `"doctorProfile"`.
```
doctorProfile {
  imagenHero: image (hotspot) — foto del hero principal (home), fallback a /public/hero-doctor.webp
  imagenSobreMi: image (hotspot) — foto sección Sobre Mí (home), fallback a /public/hero-doctor-v3.webp
  imagenPagina: image (hotspot) — foto página dedicada Sobre Mí
  imagenTratamientos: image (hotspot) — foto "experiencia" en páginas de zona (si vacío, sección no se muestra)
  sellos: array de {
    nombre: string (requerido)
    imagen: image (hotspot, requerido)
    url: url (opcional)
  }
  curriculumPDF: file (accept .pdf)
}
```
- Se gestiona desde Studio como item fijo "Perfil del Doctor"
- `getDoctorProfile()` en sanity.ts devuelve los datos (o null si no existe)
- Las secciones CV y sellos en la página Sobre Mí se ocultan si no hay datos
- Las imágenes Hero y SobreMi (home) tienen fallback a archivos locales si están vacías en Sanity
- SobreMi.tsx detecta si la imagen es de Sanity (URL http) → usa `object-cover`; local → usa `object-contain` con scale

## Comandos
- `npm run dev` - desarrollo local
- `npm run build` - build de producción
- `git push origin main` - deploy automático a Vercel
- `npx vercel --prod` - deploy directo a Vercel (sin pasar por Git)

## SEO

### Configuración actual
- **Dominio**: `https://landing-raffaele.vercel.app` (configurable via `NEXT_PUBLIC_SITE_URL`)
- **robots.txt**: `src/app/robots.ts` — bloquea `/studio/`, `/version-*/`, `/prototipos/`
- **sitemap.xml**: `src/app/sitemap.ts` — dinámico, incluye todas las URLs ES/IT con hreflang
- **Git remote**: SSH (`git@github.com:ccallelobo/landing-raffaele.git`) — HTTPS da bus error en este entorno

### Metadata (en todas las páginas)
- Open Graph (og:title, og:description, og:url, og:locale, og:siteName)
- Twitter Cards (summary)
- Canonical URLs
- hreflang alternates ES↔IT con rutas localizadas
- robots: index, follow
- `metadataBase` configurado en `[locale]/layout.tsx`

### JSON-LD Structured Data
- **Home** (`[locale]/page.tsx`): `@graph` con:
  - 2x `MedicalBusiness` (Dos Hermanas, Sevilla + Frattamaggiore, Napoli) con geo coordinates
  - `Person` (Dr. Raffaele con alumniOf universidades)
  - `WebSite` (bilingüe ES/IT)
- **Tratamiento individual** (`[zona]/[tratamiento]/page.tsx`): `BreadcrumbList` (Inicio > Zona > Tratamiento)
- Tratamientos con imagen en Sanity generan OG image (1200x630)

### BASE_URL
Todas las URLs SEO usan `process.env.NEXT_PUBLIC_SITE_URL` con fallback a `https://landing-raffaele.vercel.app`. Cuando se configure un dominio propio, solo hay que añadir la env var en Vercel.

### Tareas SEO pendientes
- [ ] **Google Search Console**: Dar de alta la propiedad y enviar el sitemap (`/sitemap.xml`)
- [ ] **Dominio propio**: Configurar dominio personalizado en Vercel y actualizar `NEXT_PUBLIC_SITE_URL`
- [ ] **OG Image dedicada**: Crear imagen de 1200x630px para compartir en redes sociales (actualmente solo tratamientos individuales tienen OG image)
- [ ] **Google Business Profile**: Crear fichas de Google My Business para ambas ubicaciones (Dos Hermanas y Frattamaggiore) y vincularlas al sitio web
- [ ] **Review schema**: Añadir JSON-LD `AggregateRating` y `Review` en la home usando los datos de reseñas de Sanity
- [ ] **FAQ schema**: Añadir JSON-LD `FAQPage` si se crea una sección de preguntas frecuentes
- [ ] **Número de colegiación**: Rellenar el placeholder `[Número de colegiación]` en Aviso Legal
- [ ] **Google Analytics / Tag Manager**: Integrar tracking para medir tráfico orgánico
- [ ] **Performance**: Auditar Core Web Vitals con Lighthouse y optimizar LCP/CLS si es necesario

## Notas de Diseño

### Hero (móvil)
- Label "MEDICINA ESTÉTICA" oculto en móvil
- Título más pequeño (2rem)
- Párrafo descriptivo visible pero con texto reducido (text-sm)
- Solo botón "Reservar Consulta" (eliminado "Explorar")
- Texto lateral: "Medicina Preventiva, Estética, Regenerativa" (ES) / "Medicina Preventiva, Estetica, Rigenerativa" (IT)

### Sección "Sobre Mí" (home — resumen)
- Imagen del doctor: `hero-doctor-v3.webp` (fondo transparente)
- Imagen escalada al 75% (`scale-75`) con ajuste vertical (`translate-y-[12%]`)
- Gradiente stone→moss para integración visual con la sección
- Aspect ratio: 4/5 en móvil, 3/4 en desktop
- Tarjeta flotante con año de licencia (oculta en móvil, `z-20` para quedar sobre la imagen)
- **Contenido**: Cita + stats (sin párrafos de biografía, esos están en la página dedicada)
- **Stats**: "2017 - Licenciado desde" y "1.000+ - Pacientes satisfechos"
- **Link "Conocer más"**: enlace gold a `/sobre-mi` tras los stats

### Página "Sobre Mí" (`/sobre-mi` | `/chi-sono`)
- Server component con ISR (60s), `generateMetadata` con namespace `aboutMePage`
- Fetch `getDoctorProfile()` de Sanity para CV, sellos e imagen
- **Hero**: fondo noir con imagen (object-cover si viene de Sanity, fallback con scale-200)
- **Biografía extendida**: cita + 4 párrafos con imagen lateral (aspect 3:4)
- **Timeline de formación**: línea vertical con puntos gold, datos desde traducciones (t.raw)
- **Sociedades médicas**: grid de logos/sellos desde Sanity (condicional: se oculta si no hay sellos)
- **Descargar CV**: botón de descarga (condicional: se oculta si no hay PDF en Sanity)
- **CTA**: reservar consulta vía WhatsApp (locale-aware)
- Traducciones en namespace `aboutMePage` (es.json / it.json)

### Menú Móvil (Navbar)
- Sistema de temas adaptativo:
  - Desde Hero (navbar oscuro): fondo negro + logo blanco + texto blanco
  - Desde otras secciones (navbar claro): fondo stone + logo negro + texto negro
- Logo RD centrado en la parte superior (h-52, top-16)
- Padding superior en links (`pt-40`) para evitar solapamiento con logo
- El tema se captura al abrir el menú (no cambia mientras está abierto)
- **Selector de idioma** antes del botón "Reservar Cita"

### Footer
- 4 columnas en desktop: Brand (4) | Nav (2) | Contacto (3) | Social+Legal (3)
- Firma del logo (h-24 móvil, h-[7.5rem] desktop) en blanco (brightness-0 invert)
- Columna Contacto: direcciones España/Italia, teléfono y email (links clickables)
- Etiquetas de país en color gold
- Links de Instagram y WhatsApp abren en nueva pestaña (target="_blank")
- Links a páginas legales localizados (usan `Link` de next-intl)
- Dirección Italia: Via Riscatto n 5, 80027 Frattamaggiore (Napoli)

### Contacto
- Solo formulario de contacto (nombre, email, teléfono, tratamiento, mensaje)
- **Nota**: Teléfono, dirección y horario eliminados de la sección de info

### Sección "Tratamientos" (landing)
- 4 tarjetas de zona (Facial / Corporal / Skin Quality / Capilar) en grid 2 columnas (2x2 desktop, stacked en móvil)
- Cada tarjeta tiene imagen de fondo, título, descripción y link a página de zona
- Usa `Link` de next-intl para rutas localizadas
- Ya no necesita data prop de Sanity

### Páginas de Zona (`/tratamientos/[zona]`)
- Server component con ISR (60s)
- Hero con imagen, título y descripción (desde zonaConfig o traducciones fallback)
- Grid de tratamientos como Links a páginas individuales (1 col móvil, 2 tablet, 3 desktop)
- 4 zonas: facial, corporal, skin-quality, capilar
- Mapeo de slugs localizados: facial/viso, corporal/corpo, skin-quality/skin-quality, capilar/capelli
- Backward compat: facciale → facial, corporale → corporal

### Páginas de Tratamiento Individual (`/tratamientos/[zona]/[tratamiento]`)
- Server component con ISR (60s)
- Hero con imagen del tratamiento, nombre y resumenCorto
- Descripción rich text (PortableText + @tailwindcss/typography prose) con imagen lateral
- Resultados antes/después embebidos en el tratamiento (BeforeAfterSlider)
- Botones CTA: "Volver a zona" y "Reservar consulta" (WhatsApp)
- generateStaticParams genera todas las combinaciones zona+tratamiento
- Datos 100% editables desde Sanity CMS

### Carrusel de Marcas (MarcasTecnologias)
- Sección placeholder con logos de marcas/tecnología
- Auto-scroll horizontal (CSS marquee)
- 8 slots placeholder (gray boxes)
- Posicionado entre Tratamientos y SobreMi en la landing

### Formulario para Médicos (FormularioMedicos)
- Formulario de colaboración para médicos profesionales
- Campos: nombre, email, teléfono, especialidad, mensaje
- Estilo floating-label (mismo patrón que Contacto)
- Fondo stone con texto oscuro (diferenciado del form de pacientes)
- Posicionado entre Contacto y Footer en la landing

### Burbuja de WhatsApp (WhatsAppBubble)
- Burbuja flotante fija en esquina inferior derecha (bottom-6 right-6)
- Color verde WhatsApp (#25D366), icono SVG blanco
- z-index 9997 (debajo del CookieBanner z-[9998])
- Animación hover (scale-110) y active (scale-95)
- **Locale-aware**: detecta idioma con `useLocale()` de next-intl
  - `/es`: número español (+34 604 89 46 97) + mensaje preescrito en español
  - `/it`: número italiano (+39 376 097 6953) + mensaje preescrito en italiano
- Config centralizada en `WHATSAPP_CONFIG` dentro del componente
- Incluido en `[locale]/layout.tsx` (aparece en todas las páginas)

### Navbar — Navegación entre páginas
- "Sobre Mí" es un `<Link href="/sobre-mi">` (navega a la página dedicada)
- Los links de sección (#resultados, #resenas, #tratamientos) funcionan desde cualquier página
- Usa `usePathname()` de next-intl para detectar si estamos en la home
- En la home: anchor directo (`#section`) para smooth scroll
- En subpáginas: navega a `/{locale}/#section` (navegación completa a home + scroll)
- Helper `sectionHref(hash)` centraliza esta lógica

### Banner de Cookies (RGPD)
- Aparece 1 segundo después de cargar si no hay consentimiento
- Opciones: "Rechazar" y "Aceptar"
- Guarda preferencia en localStorage (`cookie-consent`)
- Posicionado fijo en la parte inferior (z-[9998])
- Link a política de cookies localizado

## Páginas Legales
Las páginas legales están bajo `[locale]/`:
- `/es/privacidad` o `/it/privacy` - Política de Privacidad (RGPD 2016/679)
- `/es/aviso-legal` o `/it/note-legali` - Aviso Legal (LSSI-CE)
- `/es/cookies` o `/it/cookie` - Política de Cookies

**Nota**: En Aviso Legal hay un placeholder `[Número de colegiación]` pendiente de rellenar.

## Páginas de Versión (para revisión del cliente)
| Ruta | Hero | Sobre Mí |
|------|------|----------|
| `/version-1` | hero-doctor.webp | sobre-mi-doctor-v2.webp |
| `/version-2` | hero-doctor-v2.webp | sobre-mi-doctor-v3.webp |
| `/version-3` | hero-doctor-v3.webp | sobre-mi-doctor-v4.webp (scale-200) |
| `/version-4` | hero-doctor-v4.webp | sobre-mi-doctor-v5.webp |

**Nota**: Las páginas de versión usan español fijo (sin i18n).

## Herramientas de Conversión de Imágenes
- `cwebp -q 90 input.png -o output.webp` - Convertir a WebP
- `magick input.png -fuzz 10% -transparent white output.png` - Quitar fondo blanco
- `pip3 install "rembg[cli]"` - Instalar rembg para quitar fondos de fotos
- Quitar fondo con rembg (Python):
```python
from rembg import remove
from PIL import Image
inp = Image.open("input.webp")
out = remove(inp)
out.save("output.png")
```
