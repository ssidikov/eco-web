import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, isValidLocale } from './i18n/config'

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const preferred = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, priority] = lang.trim().split(';q=')
      return {
        code: code.split('-')[0].toLowerCase(),
        priority: priority ? parseFloat(priority) : 1,
      }
    })
    .sort((a, b) => b.priority - a.priority)

  for (const { code } of preferred) {
    if (isValidLocale(code)) return code
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Skip static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Detect locale and redirect
  const locale = getLocaleFromHeaders(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
