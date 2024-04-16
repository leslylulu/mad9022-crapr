// import { cookies } from 'next/headers';
import { getSession } from '@/app/actions';

const { NEXT_API_URL } = process.env;

export async function GET(request) {
	// TODO: this is not working
	const token = await getSession();
	// const cookieStore = cookies();
	// const token = cookieStore.get('token')?.value;
	// const apple = cookieStore.get('apple');
	console.log('token 444 ==', token);
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}

	const url = new URL(request.url);
	const distance = url.searchParams.get('distance');
	const keyword = url.searchParams.get('keyword');
	const { latitude = 24, longitude = -12 } = request.geo;

	let resp = await fetch(`${NEXT_API_URL}/api/crap?query=${keyword}${distance ? '&distance=' + distance : ''}${latitude ? "&lat=" + latitude : ''}${longitude ? "&long=" + longitude : ''}`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + token,
		},
		next: { revalidate: 0 },
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
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
		status: 200,
	});
}
