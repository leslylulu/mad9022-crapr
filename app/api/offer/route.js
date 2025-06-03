export const revalidate = 0
export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // 'nodejs' is the default
export const preferredRegion = ['cle1'];

const { NEXT_API_URL } = process.env;

export async function POST(request) {
	const token = request.headers.get('authorization');
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}

	// Get the form data from the request
	const crapData = await request.formData();

	// Check if lat and long are already in the form data
	const hasLat = crapData.has('lat');
	const hasLong = crapData.has('long');

	// Only use default values if coordinates aren't provided in the form
	if (!hasLat || !hasLong) {
		// Use fallback values from env if needed
		const defaultLat = process.env.LATITUDE || '45.4215';
		const defaultLong = process.env.LONGITUDE || '-75.6972';

		// Only set these if they don't already exist in the form data
		if (!hasLat) {
			crapData.append('lat', defaultLat);
		}
		if (!hasLong) {
			crapData.append('long', defaultLong);
		}
	}

	let resp = await fetch(`${NEXT_API_URL}/api/crap`, {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token,
		},
		next: { revalidate: 0 },
		body: crapData
	});

	try {
		if (!resp.ok) throw new Error(JSON.stringify({ msg: "failed Suggest", code: resp.status }));
	} catch (err) {
		let errObj = JSON.parse(err.message);
		return new Response('Failed Create Crap', {
			status: errObj.code,
			headers: { 'content-type': 'application/json' }
		});
	}

	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'Set-Cookie': `token=${token}`,
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Cache-Control': 'max-age=0',
		},
		status: 200,
	});
}