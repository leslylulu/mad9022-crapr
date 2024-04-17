'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
const { NEXT_PAGE_URL, NEXT_API_URL } = process.env;

export async function handelLogin() {
	'use server'
	const redirectUrl = encodeURIComponent(`${NEXT_PAGE_URL}/login`);
	const url = `${NEXT_API_URL}/auth/google?redirect_url=${redirectUrl}`;
	redirect(url);
}

export async function createCrap(fd) {
	'use server'

	const token = await cookies().get('token');
	const response = await fetch(`${NEXT_PAGE_URL}/api/offer`, {
		method: 'POST',
		body: fd,
		headers: {
			authorization: 'Bearer ' + token?.value,
			credentials: 'include',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		}
	});

}

export async function login(response, token) {
	//set the cookie
	'use server'
	const expires = new Date(Date.now() + 60 * 60 * 12 * 1000); //30 seconds expiry for the token cookie
	await response.cookies.set('token', token, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		expires: expires,
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
	const expires = new Date(Date.now() + 60 * 60 * 12 * 1000); //30 seconds
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
