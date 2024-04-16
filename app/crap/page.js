// export const revalidate = false; // means cache forever
export const revalidate = 0; // means cache for 10 mins
import NavBar from '@/app/components/navbar';
import { getSession } from '@/app/actions';
import { cookies } from 'next/headers';

export default async function Page({ params, searchParams }) {
	cookies();
	const { distance, keyword } = searchParams;
	const { NEXT_PAGE_URL } = process.env;
	const token = await getSession();
	const response = await fetch(`${NEXT_PAGE_URL}/api/crap?distance=${distance}${keyword ? '&keyword=' + keyword : ''}`, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token?.value,
			credentials: 'include',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		}
	});
	const data = await response.json();
	console.log('page data =', data);

	return (
		<main className="flex min-h-screen flex-col items-center py-12">
			<header className="flex items-center flex-col">
				<h1 className="text-4xl font-bold">Crapr</h1>
				<p className="text-xl">Get rid of your crap now</p>
				<NavBar />
			</header>
			<div className="w-full mt-6 px-12">
				<h2 className="text-center text-xl">There are 6
					<span className="text-yellow-500 mx-2 font-bold">AVAILABLE</span> matches  {keyword ? 'for ' + keyword : 'in ' + distance + 'm'}</h2>
			</div>
		</main>
	);
}
