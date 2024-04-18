import React from 'react'
import { getSession } from '@/app/actions';
import Image from 'next/image';
import jwt from 'jsonwebtoken';

const { NEXT_PAGE_URL } = process.env;

const isCurrentUser = (token, id) => {
	try {
		const decoded = jwt.decode(token, { complete: true });
		if (decoded?.payload?.id === id) {
			return true;
		}
		return false;
	} catch (error) {
		console.error('Error decoding token:', error);
		return false;
	}
};

const Page = async ({ params, searchParams }) => {
	const { id } = params;

	const token = await getSession();
	const response = await fetch(`${NEXT_PAGE_URL}/api/crapDetail?token=${token?.value}&id=${id}`, {
		method: 'GET',
	});
	const result = await response.json();
	const detail = result?.data;
	console.log('detail =', detail);
	const isOwner = isCurrentUser(token?.value, detail?.owner._id);
	console.log('isOwner =', isOwner);


	return (
		<div className="container">
			<h1 className="my-3">Still waiting for some sucker to express interest in your crap.</h1>
			{
				detail && <div className="bg-primary-dark text-white rounded-lg">
					<h2 className="bg-yellow-200 p-3 text-primary-dark">
						{detail.title}
						<span className="mx-3">-</span>
						<span>[{detail.status}]</span>
					</h2>
					<div className="p-3">
						<p className="mb-3">{detail.description}</p>
						{
							detail.images.length > 0 ? <div className="flex gap-2 relative flex-col md:flex-row">
								{
									detail.images.map(item => {
										return (
											<Image
												key={item}
												objectFit="cover"
												width={300}
												height={300}
												unoptimized={true}
												// fill="responsive"
												alt={`${detail.title} image`}
												src={item}
												className="w-full h-full rounded-lg"
											/>
										)
									})
								}
							</div> : <span>no any Image</span>
						}
						{
							isOwner && <button
								type="button"
								data-twe-ripple-init
								data-twe-ripple-color="light"
								className="inline-block mt-3 rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-primary  focus:outline-none focus:ring-0  motion-reduce:transition-none ">Delete this pieces of crap</button>
						}
					</div>

				</div>
			}
		</div>
	)
}

export default Page;
