export const dynamic = 'force-dynamic';

const { NEXT_API_URL } = process.env;

export async function GET(request) {

	const url = new URL(request.url);
	const token = url.searchParams.get('token');
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	let resp = await fetch(`${NEXT_API_URL}/api/crap/mine`, {
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
			'Control-cache': 'max-age=0',
		},
		status: 200,
	});
}