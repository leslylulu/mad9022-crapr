export const revalidate = 0
export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // 'nodejs' is the default
export const preferredRegion = ['iad1'];

const { NEXT_API_URL } = process.env;

export async function GET(request) {
  const url = new URL(request.url);
  const { searchParams } = new URL(request.url);
  const token = url.searchParams.get('token');
  const distance = url.searchParams.get('distance');
  const keyword = url.searchParams.has('keyword') ? url.searchParams.get('keyword'): undefined;

  const latitude = searchParams.get('lat');
  const longitude = searchParams.get('lat');
  
  // Allow public browsing without token
  console.log("data === ", keyword, distance, latitude, longitude)
  let resp = await fetch(`${NEXT_API_URL}/api/crap?query=${keyword ? keyword : ''}${distance ? '&distance=' + distance : ''}${latitude ? "&lat=" + latitude : ''}${longitude ? "&long=" + longitude : ''}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Only add authorization header if token exists
      ...(token && { authorization: 'Bearer ' + token }),
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
      // Only set cookie if token exists
      ...(token && { 'Set-Cookie': `token=${token}` }),
      'content-type': 'application/json',
      'access-control-allow-methods': 'GET',
      'access-control-allow-origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    status: 200,
  });
}

// Other methods remain the same...