import { NextResponse } from 'next/server';
import { updateSession, login } from '@/app/actions';

export async function middleware(request) {

  //code here runs for every page listed in the config object
  let response = await updateSession(request);
  //updateSession function in actions

  if (request.nextUrl.pathname === '/') {
    if (!response) {
      response = NextResponse.next(); //the response object that will contain layout.js and page.js
    }
    if (request.nextUrl.searchParams.has('token')) {

      const newResponse = await login(request.nextUrl.searchParams.get('token'), request.nextUrl); //function from actions.js
      return newResponse;
    }
    return response;
  }
  // if (request.nextUrl.pathname.startWith('/crap')) {
  //   if (!response) {
  //     response = NextResponse.next(); //the response object that will contain layout.js and page.js
  //   }
  //   if (!request.cookies.has('token')) {
  //     return NextResponse.redirect(request.nextUrl.origin);
  //   }
  //   return response;
  // }
}

export const config = {
  matcher: ['/'],
};
