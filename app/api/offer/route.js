export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'

// export const dynamic = 'force-dynamic';

const { NEXT_API_URL } = process.env;


export async function POST(request) {

	const token = request.headers.get('authorization');
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	console.log("checkpoint create token", token);
	const latitude = request?.geo?.latitude || process.env.LATITUDE;
	const longitude = request?.geo?.longitude || process.env.LONGITUDE;
	console.log("geo ===", latitude, longitude);
	// console.log("checkpoint 111 ===", request);
	// console.log("checkpoint 222 ===", request?.formData);
	// console.log("checkpoint 333 ===", await request?.formData());
	const crapData = await request.formData();

	console.log("checkpoint 444 ===", crapData);

	// formData.append('lat', latitude);
	// formData.append('long', longitude);

	let resp = await fetch(`${NEXT_API_URL}/api/crap`, {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token,
		},
		body: crapData
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
			'access-control-allow-origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
		status: 200,
	});
}