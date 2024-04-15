// await cookies().set('token', '', { expires: new Date(0) });
'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function handelLogin(formData) {
	'use server'
	const { NEXT_API_URL } = process.env;
	const redir = encodeURIComponent('http://localhost:3000/');
	const url = `${NEXT_API_URL}/auth/google?redirect_url=${redir}`;
	redirect(url);
}


export async function login(token, url) {
	//set the cookie
	console.log('LOGIN SET', token);
	const expires = new Date(Date.now() + 60 * 60 * 12); //30 seconds expiry for the token cookie
	const newResponse = NextResponse.redirect(new URL('/', url).toString());
	newResponse.cookies.set('token', token, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		expires: expires,
	});
	return newResponse;
}


export async function logout() {
	//clear the cookie
	await cookies().delete('token');
	// await cookies().set('token', '', { expires: new Date(0) });
}

export async function getSession() {
	//get the cookie
	const token = await cookies().get('token'); //token object
	console.log('getSession token', token?.value);
	if (!token) return null;
	revalidatePath('/');
	return token;
}

export async function updateSession(request) {
	//refresh the cookie expiry because we navigated
	const token = request.cookies.get('token')?.value;
	//if we needed to extract a new token from search or headers we could do that here
	if (!token) {
		console.log('updateSession - no token cookie');
	}
	if (!token) return;
	console.log('updateSession has token',);
	// Refresh the session cookie so it doesn't expire
	const resp = NextResponse.next();
	const expires = new Date(Date.now() + 60 * 60 * 12); //30 seconds
	resp.cookies.set({
		name: 'token',
		value: token,
		httpOnly: true,
		expires: expires,
	});
	return resp;
}

export async function handleSearch(formData) {
	'use server'
	console.log('handleSearch -', formData);
	const keyword = formData.get('keyword');
	const distance = formData.get('distance');
	redirect(`/crap?distance=${encodeURIComponent(distance)}${keyword ? '&keyword=' + encodeURIComponent(keyword) : ''} `);
}
