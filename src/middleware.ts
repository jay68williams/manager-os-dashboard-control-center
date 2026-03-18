import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'manageros_session';
const AUTH_PASSWORD = process.env.DASHBOARD_PASSWORD || 'ManagerOS2026!';

export function middleware(request: NextRequest) {
  // Skip auth for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const session = request.cookies.get(AUTH_COOKIE);
  
  if (!session || session.value !== 'authenticated') {
    // Redirect to login page
    if (request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Already authenticated, redirect from login to dashboard
  if (session?.value === 'authenticated' && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
