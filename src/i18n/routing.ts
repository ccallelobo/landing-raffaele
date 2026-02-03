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
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
