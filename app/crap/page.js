// export const revalidate = false; // means cache forever
export const revalidate = 0; // means cache for 10 mins
import { getSession } from '@/app/actions';
import { cookies } from 'next/headers';

export default async function Page({ params, searchParams }) {
	cookies();
	const { distance, keyword } = searchParams;
	const { NEXT_PAGE_URL } = process.env;
	const token = await getSession();
	const response = await fetch(`${NEXT_PAGE_URL}/api/crap?token=${token?.value}&distance=${distance}${keyword ? '&keyword=' + keyword : ''}`, {
		method: 'GET',
	});
	const data = await response.json();
	const list = data?.data;
	console.log('page data =', data);

	return (
		<main className="flex min-h-screen flex-col items-center py-12">
			<div className="w-full mt-6 px-12">
				<h2 className="text-center text-xl">There are 6
					<span className="text-yellow-500 mx-2 font-bold">AVAILABLE</span> matches  {keyword ? 'for ' + keyword : 'in ' + distance + 'm'}</h2>
			</div>
			<div className="w-full p-3 flex flex-col gap-3">
				{
					list && list.length > 0 && list.map((item, index) => {
						return (
							<div className="bg-primary-dark text-white rounded-md w-full p-3">
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</div>
						)
					})
				}
			</div>
		</main>
	);
}
