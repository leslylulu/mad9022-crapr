// export const revalidate = false; // means cache forever
export const revalidate = 0; // means cache for 10 mins
import jwt from 'jsonwebtoken';
import { getSession } from '@/app/actions';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';


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
	// console.log('list', list);
	const myId = decodeToken(token?.value)?.payload?.id;

	return (
		<main className="flex min-h-screen flex-col items-center py-12">
			<div className="w-full mt-6 px-12">
				<h2 className="text-center text-xl">There are
					<span className="font-bold mx-2 text-2xl">{list.length > 0 ? list.length : '0'}</span>
					<span className="text-yellow-500 mx-2 font-bold">AVAILABLE</span> matches for
					<span className="font-bold text-2xl ml-3">{keyword ? keyword : ''}</span>
				</h2>
			</div>
			<div className="w-full p-3 flex flex-col gap-3 container">
				{
					list && list.length > 0 && list.map(item => {
						return (
							<Link key={item._id} href={`/crap/${item._id}`} className=" text-white rounded-md w-full p-3 flex justify-between items-center">
								<div className='flex items-center gap-0 w-full'>
									<Image width={200} height={200} alt="small picture" src={item.images[0]} className="h-80 w-1/2 object-cover rounded-l-lg shadow-2xl " />
									<div className='flex items-center bg-primary-dark w-1/2 p-3 h-80 rounded-r-lg'>
										<div>
											<h3 className="text-xl uppercase mb-6">{item.title}</h3>
											<p className='w-auto'>{item.description}</p>
											{
												item.owner._id == myId && <p className="text-yellow-400 font-bold">This is your own crap</p>
											}
										</div>
										<span className="material-symbols-outlined text-xl ml-3">
											chevron_right
										</span>
									</div>
								</div>
							</Link>
						)
					})
				}
			</div>
		</main>
	);
}
