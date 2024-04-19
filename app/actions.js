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
		headers: {
			accept: 'application/json',
			authorization: token?.value,
		},
		next: { revalidate: 0 },
		body: fd,
	});
	if (!response.ok) {
		console.log('create failed', response.ok);
		return { status: response.status, message: "Failed Create Crap" }
	} else {
		redirect('/mine');
	}
}

export async function handleDeleteCrap(id) {
	'use server'
	const token = await cookies().get('token');
	const response = await fetch(`${NEXT_API_URL}/api/crap/${id}`, {
		method: 'DELETE',
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + token?.value,
		},
		next: { revalidate: 0 },
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
	let response = await fetch(`${NEXT_API_URL}/api/crap/${id}/interested`, {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token?.value,
		},
		next: { revalidate: 0 },
	});

	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "failed Suggest", code: response.status }));
	} catch (err) {
		console.log("setInterested error", err);
		return { status: response.status, message: "Failed to set interested" }
	}
	return { status: response.status }
}

export async function setAgree(id) {
	'use server'
	const token = await cookies().get('token');
	const response = await fetch(`${NEXT_API_URL}/api/crap/${id}/agree`, {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token?.value,
		},
		next: { revalidate: 0 },
	});
	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "failed agreed", code: response.status }));
	} catch (err) {
		return { status: response.status, message: "Failed to Agreed" }
	}
	const result = await response.json();
	return { status: response.status, result: result?.data?.suggestLocation }
}

export async function setDisAgree(id) {
	'use server'
	const token = await cookies().get('token');
	const response = await fetch(`${NEXT_API_URL}/api/crap/${id}/disagree`, {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token?.value,
		},
		next: { revalidate: 0 },
	});
	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "failed disagreed", code: response.status }));
	} catch (err) {
		return { status: response.status, message: "Failed to DisAgreed" }
	}
	return { status: response.status }
}

export async function setFlush(id) {
	'use server'
	const token = await cookies().get('token');

	const response = await fetch(`${NEXT_API_URL}/api/crap/${id}/flush`, {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token?.value,
		},
		next: { revalidate: 0 },
	});
	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "failed flushed", code: response.status }));
	} catch (err) {
		return { status: response.status, message: "Failed to Flush" }
	}
	return { status: response.status }
}


export async function suggestLocation(id, address, date, time) {
	'use server'
	const token = await cookies().get('token');
	const response = await fetch(`${NEXT_API_URL}/api/crap/${id}/suggest`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token?.value}`,
		},
		body: JSON.stringify({
			date,
			time,
			address,
		}),
		next: { revalidate: 0 },
	});
	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "failed Suggest", code: response.status }));
	} catch (err) {
		let errObj = JSON.parse(err.message);
		return { status: response.status, message: response.statusText }
	}
	const result = await response.json();
	return { status: response.status, result: result }
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
	'use server'
	await cookies().set('token', '', { expires: new Date(0) });
	redirect('/');
}

export async function getSession() {
	'use server'
	const token = await cookies().get('token');
	if (!token) return null;
	revalidatePath('/');
	return token;
}

export async function updateSession(request) {
	const token = request.cookies.get('token')?.value;
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

export async function handleSearch(formData) {
	'use server'
	const keyword = formData.get('keyword');
	const distance = formData.get('distance');
	redirect(`/crap?distance=${encodeURIComponent(distance)}${keyword ? '&keyword=' + encodeURIComponent(keyword) : ''} `);
}
