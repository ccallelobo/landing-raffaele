import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'it'],
  defaultLocale: 'es',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/privacidad': {
      es: '/privacidad',
      it: '/privacy'
    },
    '/aviso-legal': {
      es: '/aviso-legal',
      it: '/note-legali'
    },
    '/cookies': {
      es: '/cookies',
      it: '/cookie'
    },
    '/tratamientos/[zona]': {
      es: '/tratamientos/[zona]',
      it: '/trattamenti/[zona]'
    },
    '/tratamientos/[zona]/[tratamiento]': {
      es: '/tratamientos/[zona]/[tratamiento]',
      it: '/trattamenti/[zona]/[tratamiento]'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
