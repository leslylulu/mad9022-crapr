import { NextResponse } from 'next/server';
import { updateSession, login } from '@/app/actions';

export async function middleware(request) {

  //code here runs for every page listed in the config object
  let response = await updateSession(request);
  //updateSession function in actions

  if (request.nextUrl.pathname === '/login') {
    if (!response) {
      response = NextResponse.next(); //the response object that will contain layout.js and page.js
    }
    if (request.nextUrl.searchParams.has('token')) {
      await login(response, request.nextUrl.searchParams.get('token')); //function from actions.js
    }
    return response;
  }
  if (request.nextUrl.pathname === '/') {
    //what do you want to do on the home page
    if (!response) {
      response = NextResponse.next(); //the response object that will contain layout.js and page.js
    }
    return response;
  }
  // return response;
  if (request.nextUrl.pathname.startsWith('/crap')) {
    if (!response) {
      response = NextResponse.next(); //the response object that will contain layout.js and page.js
    }
    if (!request.cookies.has('token')) {
      return NextResponse.redirect(request.nextUrl.origin);
    }
    return response;
  }
  if (request.nextUrl.pathname.startsWith('/offer') || request.nextUrl.pathname.startsWith('/mine') || request.nextUrl.pathname.startsWith('/wiped')) {
    if (!response) {
      response = NextResponse.next(); //the response object that will contain layout.js and page.js
    }
    if (!request.cookies.has('token')) {
      return NextResponse.redirect(request.nextUrl.origin);
    }
    return response;
  }

}

export const config = {
  matcher: ['/', '/login', '/crap', '/offer', '/mine', '/wiped'],
};
