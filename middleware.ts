import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isMaintenanceMode =
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  const devKey = process.env.NEXT_PUBLIC_MAINTENANCE_DEV_KEY;
  const queryDev = request.nextUrl.searchParams.get('dev');
  const cookieDev = request.cookies.get('devKey')?.value;

  if (devKey && (queryDev === devKey || cookieDev === devKey)) {
    if (queryDev === devKey) {
      const res = NextResponse.next();
      res.cookies.set('do-devKey', devKey, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 8,
      });
      return res;
    }
    return NextResponse.next();
  }

  if (!isMaintenanceMode) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname === '/newsletter' ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/newsletter', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};