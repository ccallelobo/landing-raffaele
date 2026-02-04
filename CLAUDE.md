# Landing Dr. Raffaele Del Prete

## Tech Stack
- **Framework**: Next.js 16.1.5 (App Router)
- **Styling**: Tailwind CSS v4 con CSS variables
- **CMS**: Sanity (proyecto: ykf6zrj4, dataset: production)
- **Deploy**: Vercel (auto-deploy desde main)
- **i18n**: next-intl (ES/IT con detección geográfica)

## Información de Contacto
- **Ubicación**: Calle Cristóbal Chanfreut Escribano 8-9, 41704 Dos Hermanas (Sevilla)
- **Teléfono**: +34 604 89 46 97
- **Instagram**: https://www.instagram.com/dr_raffaele_delprete/
- **WhatsApp**: https://wa.me/34604894697

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
/es/                 → Landing en español
/es/privacidad       → Política de Privacidad
/es/aviso-legal      → Aviso Legal
/es/cookies          → Política de Cookies
/it/                 → Landing en italiano
/it/privacy          → Privacy Policy
/it/note-legali      → Note Legali
/it/cookie           → Cookie Policy
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
│   ├── [locale]/              # Rutas internacionalizadas
│   │   ├── layout.tsx         # Layout con NextIntlClientProvider
│   │   ├── page.tsx           # Landing principal (ISR 60s)
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
├── components/
│   ├── Navbar.tsx             # Nav fijo + LanguageSwitcher integrado
│   ├── Hero.tsx               # Split-screen desktop, bg mobile
│   ├── Tratamientos.tsx       # Grid de servicios desde Sanity
│   ├── SobreMi.tsx            # Sección sobre el doctor
│   ├── Resultados.tsx         # Galería antes/después (slider simple)
│   ├── CasosExito.tsx         # Carrusel doble sincronizado (antes/después)
│   ├── Resenas.tsx            # Reseñas de pacientes
│   ├── Contacto.tsx           # Formulario de contacto
│   ├── Footer.tsx             # Footer con links localizados
│   ├── CookieBanner.tsx       # Banner de cookies (RGPD)
│   └── LanguageSwitcher.tsx   # Selector de idioma ES/IT
├── i18n/
│   ├── routing.ts             # Configuración de rutas
│   └── request.ts             # Carga de mensajes
├── messages/
│   ├── es.json                # Traducciones español
│   └── it.json                # Traducciones italiano
├── lib/
│   └── sanity.ts              # Cliente y queries Sanity
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
- `tratamiento`: servicios médicos
- `resultado`: fotos antes/después (soporta múltiples ángulos)
- `resena`: testimonios de pacientes

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
}
```
- Los campos `imagenAntes/imagenDespues` se ocultan automáticamente si hay ángulos
- Usa el array `angulos` para casos con múltiples perspectivas

## Comandos
- `npm run dev` - desarrollo local
- `npm run build` - build de producción
- `git push origin main` - deploy automático a Vercel

## Notas de Diseño

### Hero (móvil)
- Label "MEDICINA ESTÉTICA" oculto en móvil
- Título más pequeño (2rem)
- Párrafo descriptivo visible pero con texto reducido (text-sm)
- Solo botón "Reservar Consulta" (eliminado "Explorar")
- Texto lateral: "Cirugía Plástica & Estética — Sevilla"

### Sección "Sobre Mí"
- Imagen del doctor con fondo transparente
- Imagen escalada al 75% (`scale-75`) con ajuste vertical (`translate-y-[12%]`)
- Gradiente stone→moss para integración visual con la sección
- Aspect ratio: 4/5 en móvil, 3/4 en desktop
- Tarjeta flotante con año de licencia (oculta en móvil)
- **Contenido**: Biografía personal del Dr. Raffaele Del Prete
  - Nacido en Nápoles, 29 junio 1992
  - Formación: Universidad Luigi Vanvitelli y Federico II (Nápoles)
  - Licenciado en 2017, Especialidad 2022, Máster 2023
  - Trabaja entre Nápoles y Sevilla
- **Stats**: "2017 - Licenciado desde" y "1.000+ - Pacientes satisfechos"

### Sección "Casos de Éxito" (CasosExito.tsx)
- **Diseño**: Carrusel doble sincronizado (antes/después lado a lado)
- Selector de caso (botones con nombre del tratamiento)
- Dos imágenes sincronizadas que cambian juntas al navegar
- Controles: flechas + botones con nombre de cada ángulo
- Aspect ratio 3/4 (portrait), max-width 672px centrado
- Usa datos de Sanity (campo `angulos`) o fallback de demostración
- Si no hay casos con múltiples ángulos, la sección no se renderiza

### Menú Móvil (Navbar)
- Sistema de temas adaptativo:
  - Desde Hero (navbar oscuro): fondo negro + logo blanco + texto blanco
  - Desde otras secciones (navbar claro): fondo stone + logo negro + texto negro
- Logo RD centrado en la parte superior (h-52, top-16)
- Padding superior en links (`pt-40`) para evitar solapamiento con logo
- El tema se captura al abrir el menú (no cambia mientras está abierto)
- **Selector de idioma** antes del botón "Reservar Cita"

### Footer
- Firma del logo (h-24 móvil, h-[7.5rem] desktop) en blanco (brightness-0 invert)
- Links de Instagram y WhatsApp abren en nueva pestaña (target="_blank")
- Links a páginas legales localizados (usan `Link` de next-intl)
- **Nota**: Ubicación eliminada del footer (solo copyright)

### Contacto
- Solo formulario de contacto (nombre, email, teléfono, tratamiento, mensaje)
- **Nota**: Teléfono, dirección y horario eliminados de la sección de info

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
