# Landing Dr. Raffaele Del Prete

## Tech Stack
- **Framework**: Next.js 16.1.5 (App Router)
- **Styling**: Tailwind CSS v4 con CSS variables
- **CMS**: Sanity (proyecto: ykf6zrj4, dataset: production)
- **Deploy**: Vercel (auto-deploy desde main)

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

## Estructura
```
src/
├── app/
│   ├── page.tsx          # Landing principal (ISR 60s)
│   ├── layout.tsx        # Layout con CookieBanner
│   ├── globals.css       # Estilos globales + paleta
│   ├── privacidad/       # Política de Privacidad (RGPD)
│   ├── aviso-legal/      # Aviso Legal (LSSI-CE)
│   ├── cookies/          # Política de Cookies
│   ├── studio/           # Sanity Studio embebido
│   ├── version-1/        # Versión 1 para revisión cliente
│   ├── version-2/        # Versión 2 para revisión cliente
│   ├── version-3/        # Versión 3 para revisión cliente
│   └── version-4/        # Versión 4 para revisión cliente
├── components/
│   ├── Navbar.tsx        # Nav fijo con firma como logo + menú móvil adaptativo
│   ├── Hero.tsx          # Split-screen desktop, bg mobile (acepta prop heroImage)
│   ├── Tratamientos.tsx  # Grid de servicios desde Sanity
│   ├── SobreMi.tsx       # Sección sobre el doctor (acepta props sobreMiImage, imageScale)
│   ├── Resultados.tsx    # Galería antes/después
│   ├── Resenas.tsx       # Reseñas de pacientes
│   ├── Contacto.tsx      # Formulario de contacto (sin info de ubicación/teléfono/horario)
│   ├── Footer.tsx        # Footer con firma, redes sociales y links legales
│   └── CookieBanner.tsx  # Banner de consentimiento de cookies (RGPD)
├── lib/
│   └── sanity.ts         # Cliente y queries Sanity
└── hooks/
    └── useReveal.ts      # Animaciones scroll reveal
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
- `resultado`: fotos antes/después
- `resena`: testimonios de pacientes

## Comandos
- `npm run dev` - desarrollo local
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
- Tarjeta "15+ años" oculta en móvil (info ya está en stats de abajo)

### Menú Móvil (Navbar)
- Sistema de temas adaptativo:
  - Desde Hero (navbar oscuro): fondo negro + logo blanco + texto blanco
  - Desde otras secciones (navbar claro): fondo stone + logo negro + texto negro
- Logo RD centrado en la parte superior (h-52, top-16)
- Padding superior en links (`pt-40`) para evitar solapamiento con logo
- El tema se captura al abrir el menú (no cambia mientras está abierto)

### Footer
- Firma del logo (h-24 móvil, h-[7.5rem] desktop) en blanco (brightness-0 invert)
- Links de Instagram y WhatsApp abren en nueva pestaña (target="_blank")
- Links a páginas legales: Privacidad, Aviso Legal, Cookies
- **Nota**: Ubicación eliminada del footer (solo copyright)

### Contacto
- Solo formulario de contacto (nombre, email, teléfono, tratamiento, mensaje)
- **Nota**: Teléfono, dirección y horario eliminados de la sección de info

### Banner de Cookies (RGPD)
- Aparece 1 segundo después de cargar si no hay consentimiento
- Opciones: "Rechazar" y "Aceptar"
- Guarda preferencia en localStorage (`cookie-consent`)
- Posicionado fijo en la parte inferior (z-[9998])

## Páginas Legales
- `/privacidad` - Política de Privacidad (RGPD 2016/679)
- `/aviso-legal` - Aviso Legal (LSSI-CE)
- `/cookies` - Política de Cookies

**Nota**: En Aviso Legal hay un placeholder `[Número de colegiación]` pendiente de rellenar.

## Páginas de Versión (para revisión del cliente)
| Ruta | Hero | Sobre Mí |
|------|------|----------|
| `/version-1` | hero-doctor.webp | sobre-mi-doctor-v2.webp |
| `/version-2` | hero-doctor-v2.webp | sobre-mi-doctor-v3.webp |
| `/version-3` | hero-doctor-v3.webp | sobre-mi-doctor-v4.webp (scale-200) |
| `/version-4` | hero-doctor-v4.webp | sobre-mi-doctor-v5.webp |

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
