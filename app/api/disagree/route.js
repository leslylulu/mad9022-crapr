export const runtime = 'edge'; // 'nodejs' is the default
// execute this function on iad1 or hnd1, based on the connecting client location
export const preferredRegion = ['iad1', 'hnd1'];
export const dynamic = 'force-dynamic'
const { NEXT_API_URL } = process.env;


export async function POST(request) {

	const disAgreeCrap = await request.json();
	const token = disAgreeCrap.token;
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	const id = disAgreeCrap.id;
	let resp = await fetch(`${NEXT_API_URL}/api/crap/${id}/disagree`, {
		method: 'POST',
		headers: {
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
			'access-control-allow-origin': '*',
		},
		status: 200,
	});
}