import { NextRequest, NextResponse } from 'next/server';

// Routes that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/privacy',
  '/terms',
  '/api/auth/login',
  '/api/auth/register',
];

// Admin-only routes
const adminPaths = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('vestra_session')?.value;

  // Allow public paths and static files
  if (
    publicPaths.some((p) => pathname === p || pathname.startsWith('/api/auth/')) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/uploads') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!sessionToken) {
    // API routes return 401
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    // Page routes redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin route protection (additional server-side check happens in the route)
  if (adminPaths.some((p) => pathname.startsWith(p))) {
    // The actual role check happens server-side in the admin layout/API
    // This middleware only ensures a session exists
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|uploads).*)',
  ],
};
