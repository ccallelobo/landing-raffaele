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
│   ├── Navbar.tsx        # Nav fijo con firma como logo
│   ├── Hero.tsx          # Split-screen desktop, bg mobile
│   ├── Tratamientos.tsx  # Grid de servicios desde Sanity
│   ├── SobreMi.tsx       # Sección sobre el doctor
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
- Sobre mí: `sobre-mi-doctor.webp` (43KB)

## Sanity Schemas
- `tratamiento`: servicios médicos
- `resultado`: fotos antes/después
- `resena`: testimonios de pacientes

## Comandos
- `npm run dev` - desarrollo local
- `git push origin main` - deploy automático a Vercel
