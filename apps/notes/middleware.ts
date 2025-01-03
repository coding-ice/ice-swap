import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

import { defaultLocale, locales } from '@/config';

const publicReg = /\.(.*)$/;
const excludeFile = ['logo.svg'];

function getLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const negotiator = new Negotiator({ headers }).languages();

  return match(negotiator, locales, defaultLocale);
}

export default function middleware(request: NextRequest) {
  const locale = getLocale(request);
  const { pathname } = request.nextUrl;
  const hasLocalePath = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (hasLocalePath) return;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  if (publicReg.test(pathname) && !excludeFile.includes(pathname.slice(1))) return;

  if (locale === defaultLocale) {
    // 重写 /
    return NextResponse.rewrite(request.nextUrl);
  }

  // 重定向 / => /zh
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
