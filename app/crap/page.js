// export const revalidate = false; // means cache forever
export const revalidate = 0; // means cache for 10 mins
import jwt from 'jsonwebtoken';
import { getSession } from '@/app/actions';
import { cookies } from 'next/headers';
import Link from 'next/link';


const decodeToken = (token) => {
	try {
		const decoded = jwt.decode(token, { complete: true });
		return decoded;
	} catch (error) {
		console.error('Error decoding token:', error);
		return null;
	}
};

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
	const myId = decodeToken(token?.value)?.payload?.id;

	return (
		<main className="flex min-h-screen flex-col items-center py-12">
			<div className="w-full mt-6 px-12">
				<h2 className="text-center text-xl">There are
					<span className="font-bold mx-2">{list.length > 0 ? list.length : '0'}</span>
					<span className="text-yellow-500 mx-2 font-bold">AVAILABLE</span> matches  {keyword ? 'for ' + keyword : 'in ' + distance + 'm'}</h2>
			</div>
			<div className="w-full p-3 flex flex-col gap-3 container">
				{
					list && list.length > 0 && list.map(item => {
						return (
							<Link key={item._id} href={`/crap/${item._id}`} className="bg-primary-dark text-white rounded-md w-full p-3 flex justify-between items-center">
								<div>
									<h3 className="text-xl uppercase">{item.title}</h3>
									<p>{item.description}</p>
									{
										item.owner._id == myId && <p className="text-yellow-400 font-bold">This is your own crap</p>
									}
								</div>
								<span className="material-symbols-outlined text-xl">
									chevron_right
								</span>
							</Link>
						)
					})
				}
			</div>
		</main>
	);
}
