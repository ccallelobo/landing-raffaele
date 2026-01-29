# Landing Dr. Raffaele Del Prete

## Tech Stack
- **Framework**: Next.js 16.1.5 (App Router)
- **Styling**: Tailwind CSS v4 con CSS variables
- **CMS**: Sanity (proyecto: ykf6zrj4, dataset: production)
- **Deploy**: Vercel (auto-deploy desde main)

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
│   ├── globals.css       # Estilos globales + paleta
│   └── studio/           # Sanity Studio embebido
├── components/
│   ├── Navbar.tsx        # Nav fijo con firma como logo + menú móvil adaptativo
│   ├── Hero.tsx          # Split-screen desktop, bg mobile (simplificado)
│   ├── Tratamientos.tsx  # Grid de servicios desde Sanity
│   ├── SobreMi.tsx       # Sección sobre el doctor con imagen integrada
│   ├── Resultados.tsx    # Galería antes/después
│   ├── Resenas.tsx       # Reseñas de pacientes
│   └── Contacto.tsx      # Formulario + mapa
├── lib/
│   └── sanity.ts         # Cliente y queries Sanity
└── hooks/
    └── useReveal.ts      # Animaciones scroll reveal
```

## Imágenes
- Formato: WebP (calidad 90%)
- Ubicación: `/public/`
- Logo firma: `firma-logo.png` (39KB)
- Hero doctor: `hero-doctor.webp` (88KB)
- Sobre mí: `sobre-mi-doctor-v2.webp` (58KB) - fondo transparente
- Logo blanco (menú móvil): `logo-blanco.webp` (33KB)
- Logo negro (menú móvil): `logo-negro.webp` (33KB)

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

### Sección "Sobre Mí"
- Imagen del doctor con fondo transparente
- Gradiente stone→moss para integración visual con la sección
- Espacio superior (`!top-8`) para separar cabeza del borde del contenedor
- Aspect ratio: 4/5 en móvil, 3/4 en desktop
- Tarjeta "15+ años" oculta en móvil (info ya está en stats de abajo)

### Menú Móvil (Navbar)
- Sistema de temas adaptativo:
  - Desde Hero (navbar oscuro): fondo negro + logo blanco + texto blanco
  - Desde otras secciones (navbar claro): fondo stone + logo negro + texto negro
- Logo RD centrado en la parte superior (h-52, top-16)
- El tema se captura al abrir el menú (no cambia mientras está abierto)

## Herramientas de Conversión de Imágenes
- `cwebp -q 90 input.png -o output.webp` - Convertir a WebP
- `magick input.png -fuzz 10% -transparent white output.png` - Quitar fondo blanco
