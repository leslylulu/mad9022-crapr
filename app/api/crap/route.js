
export const runtime = 'edge'; // 'nodejs' is the default
// execute this function on iad1 or hnd1, based on the connecting client location
export const preferredRegion = ['iad1', 'hnd1'];
export const dynamic = 'force-dynamic'
const { NEXT_API_URL } = process.env;

export async function GET(request) {
	console.log("checkpoint1")
	const url = new URL(request.url);
	const token = url.searchParams.get('token');
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	console.log("checkpoint2.1 request.geo", JSON.stringify(request.geo))
	console.log("checkpoint2.2 request.geo.latitude", request.geo.latitude)
	console.log("checkpoint2.3 request.geo.longitude", request.geo.longitude)

	const distance = url.searchParams.get('distance');
	const keyword = url.searchParams.get('keyword');

	const latitude = request.geo.latitude || process.env.LATITUDE;
	const longitude = request.geo.longitude || process.env.LONGITUDE;
	console.log("checkpoint3", `${NEXT_API_URL}/api/crap?query=${keyword}${distance ? '&distance=' + distance : ''}${latitude ? "&lat=" + latitude : ''}${longitude ? "&long=" + longitude : ''}`)
	let resp = await fetch(`${NEXT_API_URL}/api/crap?query=${keyword}${distance ? '&distance=' + distance : ''}${latitude ? "&lat=" + latitude : ''}${longitude ? "&long=" + longitude : ''}`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + token,
		},
		next: { revalidate: 0 },
	});
	console.log("checkpoint4")
	if (!resp.ok) {
		return new Response('Bad Stuff happened', {
			status: 500,
		});
	}
	console.log("checkpoint5")
	const data = await resp.json();
	console.log("checkpoint6")
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
