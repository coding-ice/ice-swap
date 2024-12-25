import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

import { defaultLocale, locales } from '@/config';

function getLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const negotiator = new Negotiator({ headers }).languages();

  return match(negotiator, locales, defaultLocale);
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePath = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (hasLocalePath) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
