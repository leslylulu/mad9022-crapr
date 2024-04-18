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
	const { LATITUDE, LONGITUDE } = process.env;
	
	const formData = new FormData();
	formData.append('lat', LATITUDE);
	formData.append('long', LONGITUDE);
	formData.append('title', fd.get('title'));
	formData.append('description', fd.get('description'));
	formData.append('images', fd.get('images'));
	console.log("createCrap fd", formData);
	const response = await fetch(`${NEXT_PAGE_URL}/api/offer`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			authorization: token?.value,
		},
		next: { revalidate: 0 },
		body: formData,
	});
	if (!response.ok) {
		console.log('createCrap failed', response.status);
	} else {
		redirect('/mine');
	}
}

export async function handleDeleteCrap(id) {
	'use server'
	const token = await cookies().get('token');
	const response = await fetch(`${NEXT_PAGE_URL}/api/crap?token=${token?.value}&id=${id}`, {
		method: 'DELETE',
	});
	if (!response.ok) {
		console.log('delete failed', response.status);
	} else {
		redirect('/mine');
	}
}

export async function setInterested(id) {
	'use server'
	const token = await cookies().get('token');
	// console.log("setInterested ==", id, token?.value);
	const response = await fetch(`${NEXT_PAGE_URL}/api/interested`, {
		method: 'POST',
		body: JSON.stringify({ id, token: token?.value }),
	});
	// console.log("setInterested response", response);
	if (!response.ok) {
		console.log('delete failed', response.status);
		return false
	}
	const result = await response.json();
	console.log("setInterested result", result);
	return true;
}

export async function setAgree(id) {
	'use server'
	const token = await cookies().get('token');
	// console.log("setInterested ==", id, token?.value);
	const response = await fetch(`${NEXT_PAGE_URL}/api/agree`, {
		method: 'POST',
		body: JSON.stringify({ id, token: token?.value }),
	});
	if (!response.ok) {
		console.log('agree failed', response.status);
		return false
	}
	const result = await response.json();
	console.log("setAgree result", result);
	return true;
}



export async function setDisAgree(id) {
	'use server'
	const token = await cookies().get('token');
	// console.log("setInterested ==", id, token?.value);
	const response = await fetch(`${NEXT_PAGE_URL}/api/disagree`, {
		method: 'POST',
		body: JSON.stringify({ id, token: token?.value }),
	});
	if (!response.ok) {
		console.log('disagree failed', response.status);
		return false
	}
	const result = await response.json();
	return true;
}


export async function setFlush(id) {
	'use server'
	const token = await cookies().get('token');
	const response = await fetch(`${NEXT_PAGE_URL}/api/flush`, {
		method: 'POST',
		body: JSON.stringify({ id, token: token?.value }),
	});
	if (!response.ok) {
		console.log('flush failed', response.status);
		return false
	}
	const result = await response.json();
	console.log("setAgree result", result);
	return true;
}


export async function suggestLocation(id, address, date, time) {
	'use server'
	console.log("suggestLocation", id, address, date, time);
	const token = await cookies().get('token');
	const response = await fetch(`${NEXT_PAGE_URL}/api/suggest`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id,
			token: token?.value,
			address,
			date,
			time,
		}),
	});
	if (!response.ok) {
		console.log('suggestLocation failed', response.status);
		return null
	}
	const result = await response.json();
	return result?.data?.suggestion;
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
