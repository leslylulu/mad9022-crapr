
export const dynamic = 'force-dynamic'
const { NEXT_API_URL } = process.env;

export async function GET(request) {
	const url = new URL(request.url);
	const token = url.searchParams.get('token');
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	const id = url.searchParams.get('id');
	const latitude = request.geo.latitude || process.env.LATITUDE;
	const longitude = request.geo.longitude || process.env.LONGITUDE;

	let resp = await fetch(`${NEXT_API_URL}/api/crap/${id}?${latitude ? "&lat=" + latitude : ''}${longitude ? "&long=" + longitude : ''}`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + token,
		},
		next: { revalidate: 0 },
	});
	try {
		if (!resp.ok) throw new Error(JSON.stringify({ msg: "failed Suggest", code: response.status }));
	} catch (err) {
		let errObj = JSON.parse(err.message);
		return new Response(err.message, { status: errObj.code, headers: { 'content-type': 'application/json' } });
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
