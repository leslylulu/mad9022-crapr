export const runtime = 'edge'; // 'nodejs' is the default
export const preferredRegion = ['cle1'];
export const dynamic = 'force-dynamic';

const { NEXT_API_URL } = process.env;

export async function GET(request) {
	const url = new URL(request.url);
	const token = url.searchParams.get('token');
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	const distance = url.searchParams.get('distance');
	const keyword = url.searchParams.has('keyword') ? url.searchParams.get('keyword') : undefined;

	const latitude = request.geo.latitude || process.env.LATITUDE;
	const longitude = request.geo.longitude || process.env.LONGITUDE;
	let resp = await fetch(`${NEXT_API_URL}/api/crap?query=${keyword ? keyword : ''}${distance ? '&distance=' + distance : ''}${latitude ? "&lat=" + latitude : ''}${longitude ? "&long=" + longitude : ''}`, {
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
			'Set-Cookie': `token=${token}`,
			'content-type': 'application/json',
			'access-control-allow-methods': 'GET',
			'access-control-allow-origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
		status: 200,
	});
}
