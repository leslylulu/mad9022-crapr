import { cookies } from 'next/headers';
import { getSession } from '@/app/actions';

const { NEXT_API_URL } = process.env;

export async function POST(request) {

	const token = await getSession();

	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	const latitude = request.geo.latitude || process.env.LATITUDE;
	const longitude = request.geo.longitude || process.env.LONGITUDE;
	let resp = await fetch(`${NEXT_API_URL}/api/crap`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + token?.value,
		},
		next: { revalidate: 0 },
		body: {
			...request.body,
			lat: latitude,
			long: longitude,
		},
	});
	if (!resp.ok) {
		return new Response('Bad Stuff happened', {
			status: 500,
		});
	}
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'Set-Cookie': `token=${token.value}`,
			'content-type': 'application/json',
			'access-control-allow-methods': 'GET,HEAD',
			'access-control-allow-origin': '*',
		},
		status: 200,
	});
}

