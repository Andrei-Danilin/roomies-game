import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale } from '@/lib/content';

const PREFERRED_LOCALE_COOKIE = 'NEXT_LOCALE';

export function proxy(request: NextRequest) {
  const cookieLocale = request.cookies.get(PREFERRED_LOCALE_COOKIE)?.value;
  const locale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  // Redirect target depends on a per-visitor cookie — never let a shared cache
  // serve one visitor's locale preference to another.
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Vary', 'Cookie');
  return response;
}

export const config = {
  matcher: '/',
};
