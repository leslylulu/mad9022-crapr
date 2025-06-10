import { NextResponse } from 'next/server';
import { updateSession, login } from '@/app/actions'

export async function middleware(request) {
  const { pathname, searchParams, origin } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  let response = await updateSession(request);

  if (searchParams.get('token')) {
    const tokenFromUrl = searchParams.get('token');

    const newUrl = new URL(pathname, origin);

    searchParams.forEach((value, key) => {
      if (key !== 'token') {
        newUrl.searchParams.append(key, value);
      }
    });

    const response = NextResponse.redirect(newUrl);

    const expires = new Date(Date.now() + 60 * 60 * 12 * 1000); 
    response.cookies.set('token', tokenFromUrl, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12,
      expires: expires,
    });

    return response;
  }

  if (token) {
    const response = NextResponse.next();
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, 
    });

    return response;
  }

  const protectedPaths = ['/crap', '/offer', '/mine', '/post', '/wiped'];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(`${origin}/login`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',  
  ],
};