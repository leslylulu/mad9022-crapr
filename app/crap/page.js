// export const revalidate = false; // means cache forever
// export const revalidate = 0; // don't cache
// export const revalidate = 60 * 10; // means cache for 10 mins

import NavBar from '@/app/components/navbar';
import { getSession } from '@/app/actions';

export default async function Page({ params, searchParams }) {
	const { distance, keyword } = searchParams;
	const { NEXT_PAGE_URL } = process.env;
	const token = await getSession();
	console.log('page token =', token);
	const response = await fetch(`${NEXT_PAGE_URL}/api/crap?distance=${distance}${keyword ? '&keyword=' + keyword : ''}`);

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
