export const dynamic = 'force-dynamic'
const { NEXT_API_URL } = process.env;

export async function POST(request) {

	const suggestData = await request.json();
	const token = suggestData.token;
	if (!token) {
		return new Response(null, { status: 401 }) // User is not authenticated
	}
	const id = suggestData.id;
	let resp = await fetch(`${NEXT_API_URL}/api/crap/${id}/suggest`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			date: suggestData.date,
			time: suggestData.time,
			address: suggestData.address,
		}),
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
			'Content-Type': 'application/json',
			'access-control-allow-origin': '*',
		},
		status: resp.status,
	});
}