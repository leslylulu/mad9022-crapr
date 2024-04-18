import React from 'react'
import { getSession } from '@/app/actions';
import DeleteButton from '@/app/components/deleteButton';
import InterestedButton from '@/app/components/interestedButton';
import SuggestForm from '@/app/components/suggestForm';
import AgreeButton from '@/app/components/agreeButton';
import FlushButton from '@/app/components/flushButton';
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
	const AVAILABLE = 'AVAILABLE';
	const INTERESTED = 'INTERESTED';
	const SCHEDULED = 'SCHEDULED';
	const AGREED = 'AGREED';
	const FLUSHED = 'FLUSHED';
	console.log('detail.status =', detail);

	return (
		<div className="container">
			{
				isOwner && <h1 className="my-3">
					{
						detail.status === AVAILABLE && <p>Still waiting for some sucker to express interest in your crap.</p>
					}
					{
						detail.status === INTERESTED && <SuggestForm id={detail._id} />
					}
					{
						detail.status === AGREED && <FlushButton id={detail._id} suggestion={detail.suggestion} />
					}
					{
						detail.status === FLUSHED && <p>This crap has been flushed away.</p>
					}
				</h1>
			}
			{
				!isOwner && <div className="my-3">
					{
						detail.status === AVAILABLE && <InterestedButton id={detail._id} />
					}
					{
						detail.status === INTERESTED && <span>Someone has scheduled to pick up this crap</span>
					}
					{
						detail.status === SCHEDULED && <AgreeButton id={detail._id} suggestion={detail.suggestion} />
					}
					{
						detail.status === AGREED && <div>
							<p>The owner is waiting for you to come and take this item away.</p>
							<p>{detail.suggestion.address}</p>
							<p>{detail.suggestion.date}</p>
							<p>{detail.suggestion.time}</p>
						</div>
					}
					{
						detail.status === FLUSHED && <p>This crap has been flushed away.</p>
					}
				</div>
			}
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
							detail.images.length > 0 ? <div className="flex gap-2 relative flex-col lg:flex-row">
								{
									detail.images.map(item => {
										return (
											<Image
												key={item}
												objectFit="cover"
												width={300}
												height={300}
												unoptimized={true}
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
							isOwner && <DeleteButton id={detail._id} />
						}
					</div>

				</div>
			}
		</div>
	)
}

export default Page;
