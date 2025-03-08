import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const isRegisterPage = request.nextUrl.pathname === '/auth/register';

  // Permitir acesso à página de registro mesmo sem token
  if (isRegisterPage) {
    return NextResponse.next();
  }

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (token && isAuthPage && !isRegisterPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}; 