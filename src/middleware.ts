import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Exclude routes that don't need i18n
  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/version-') ||
    pathname.startsWith('/prototipos') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check for locale cookie preference
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  // If visiting root without locale, detect and redirect
  if (pathname === '/') {
    // Get country from Vercel's geo header
    const country = request.headers.get('x-vercel-ip-country') || 'ES';

    // Use cookie preference if exists, otherwise detect from country
    let locale: string;
    if (cookieLocale && routing.locales.includes(cookieLocale as 'es' | 'it')) {
      locale = cookieLocale;
    } else {
      locale = country === 'IT' ? 'it' : 'es';
    }

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Let next-intl handle the rest
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|studio|version-|prototipos|.*\\..*).*)']
};
