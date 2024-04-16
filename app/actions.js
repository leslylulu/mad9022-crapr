'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
const { NEXT_PAGE_URL } = process.env;

export async function handelLogin() {
	'use server'
	const expires = new Date(Date.now() + 60 * 60 * 12); //30 seconds expiry for the token cookie
	const { NEXT_API_URL } = process.env;
	const redirectUrl = encodeURIComponent('http://localhost:3000/login');
	const url = `${NEXT_API_URL}/auth/google?redirect_url=${redirectUrl}`;
	await cookies().set('apple', 'orange', {
		path: '/',
		expires: expires,
	});
	redirect(url);
}

export async function createCrap(fd) {
	'use server'
	const title = fd.get('title');
	const description = fd.get('description');
	const file = fd.get('images');
	const response = await fetch(`${NEXT_PAGE_URL}/api/offer`, {
		method: 'POST',
		body: fd,
	});
}

export async function login(response, token) {
	//set the cookie
	'use server'
	const expires = new Date(Date.now() + 60 * 60 * 12); //30 seconds expiry for the token cookie
	await response.cookies.set('token', token, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: false,
		expires: expires,
		domain: 'localhost',
	});
}

export async function logout() {
	//clear the cookie
	// await cookies().delete('token');
	// await cookies().set('token', '', { expires: new Date(0) });
}

export async function getSession() {
	//get the cookie
	'use server'
	const token = await cookies().get('token'); //token object
	const time = new Date();
	console.log('getSession time ===' + time.toLocaleString(), token?.value, token?.value ? 'has cookie token' : 'no cookie token');
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
		return
	}
	const expires = new Date(Date.now() + 60 * 60 * 12); //30 seconds
	const resp = NextResponse.next();
	await resp.cookies.set('token', token, {
		path: '/',
		httpOnly: true,
		expires: expires,
	});
	return resp;
}

// home page redirect to crap page
export async function handleSearch(formData) {
	'use server'
	const keyword = formData.get('keyword');
	const distance = formData.get('distance');
	redirect(`/crap?distance=${encodeURIComponent(distance)}${keyword ? '&keyword=' + encodeURIComponent(keyword) : ''} `);
}
