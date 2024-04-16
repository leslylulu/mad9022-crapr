const { NEXT_API_URL } = process.env;

export async function POST(request) {

	const headers = request.headers;
	const authorization = headers.get('authorization');
	const token = authorization ? authorization.split(' ')[1] : null;

	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}

	const crapData = await request.formData();
	const latitude = request.geo.latitude || process.env.LATITUDE;
	const longitude = request.geo.longitude || process.env.LONGITUDE;
	crapData.append('lat', latitude);
	crapData.append('long', longitude);
	let resp = await fetch(`${NEXT_API_URL}/api/crap`, {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token,
		},
		next: { revalidate: 0 },
		body: crapData,
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

