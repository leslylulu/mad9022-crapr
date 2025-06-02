import { NextResponse } from 'next/server';
import { updateSession, login } from '@/app/actions';

export async function middleware(request) {
  // Update session if token exists (but don't block any routes)
  let response = await updateSession(request);

  // For login page with token parameter
  if (request.nextUrl.pathname === '/login' && request.nextUrl.searchParams.has('token')) {
    if (!response) {
      response = NextResponse.next();
    }
    await login(response, request.nextUrl.searchParams.get('token'));
    return response;
  }

  // Default behavior: allow access to everything
  return response || NextResponse.next();
}

export const config = {
  // Only match login page for token handling, let everything else through
  matcher: ['/login'],
};