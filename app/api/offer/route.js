export const revalidate = 0
export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // 'nodejs' is the default
export const preferredRegion = ['iad1'];


const { NEXT_API_URL } = process.env;

export async function POST(request) {

	const token = request.headers.get('authorization');
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	const latitude = request?.geo?.latitude || process.env.LATITUDE;
	const longitude = request?.geo?.longitude || process.env.LONGITUDE;

	const crapData = await request.formData();
	crapData.append('lat', latitude);
	crapData.append('long', longitude);
	console.log("checkpoint 444 ===", crapData);

	let resp = await fetch(`${NEXT_API_URL}/api/crap`, {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token,
		},
		next: { revalidate: 0 },
		body: crapData
	});

	try {
		if (!resp.ok) throw new Error(JSON.stringify({ msg: "failed Suggest", code: response.status }));
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