import { NextResponse } from 'next/server';

export async function middleware(request) {
  const url = request.nextUrl.clone();

  // Check if there's a token in the URL
  if (url.searchParams.has('token')) {
    const token = url.searchParams.get('token');

    // Create a new response that will redirect to the same URL but without the token
    const response = NextResponse.redirect(new URL(url.pathname, url.origin));

    // Set the token in a secure cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  }

  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: ['/post', '/profile', '/dashboard', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};