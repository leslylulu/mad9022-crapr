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
      await login(response, request.nextUrl.searchParams.get('token')); //function from actions.js
      // TODO: redirect to the home page without the token in the URL
    }
    return response;
  }
}

export const config = {
  matcher: ['/'],
};
