export const revalidate = 0;
import { getSession } from '@/app/actions';
import DeleteButton from '@/app/components/deleteButton';
import InterestedButton from '@/app/components/interestedButton';
import SuggestForm from '@/app/components/suggestForm';
import AgreeButton from '@/app/components/agreeButton';
import FlushButton from '@/app/components/flushButton';
import Image from 'next/image';
import isCurrentUser from '@/app/utils';
import { cookies } from 'next/headers';

const { NEXT_API_URL } = process.env;
const AVAILABLE = 'AVAILABLE';
const INTERESTED = 'INTERESTED';
const SCHEDULED = 'SCHEDULED';
const AGREED = 'AGREED';
const FLUSHED = 'FLUSHED';

const Page = async ({ params }) => {
	cookies();
	const { id } = params;
	const token = await getSession();
	const response = await fetch(`${NEXT_API_URL}/api/crap/${id}?`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + token?.value,
		},
		next: { revalidate: 0 },
	});
	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "Failed View Crap Detail", code: response.status }));
	} catch (err) {
		let errObj = JSON.parse(err.message);
		return <div className="flex flex-col items-center my-9 container gap-3 w-full">
			<p className="bg-red-200 text-red-800 p-3 rounded-md">Failed to View data HTTP code : {errObj.code}</p>
			<p className="flex items-center bg-primary-dark gap-3 p-3 text-white rounded-lg">
				<span className="material-symbols-outlined">
					home
				</span>
				<a href="/">
					Go back to the home page.
				</a>
			</p>
		</div>
	}

	const result = await response.json();
	const detail = result?.data;
	const isOwner = isCurrentUser(token?.value, detail?.owner._id);
	const date = detail?.suggestion?.date ? new Date(detail?.suggestion?.date) : '';
	const localDate = date ? date.toLocaleDateString() : '';

	return (
		<div className="container">
			{
				isOwner && <h1 className="my-3">
					{
						detail.status === AVAILABLE && <p>Still waiting for a buyer to express interest in your used item.</p>
					}
					{
						detail.status === INTERESTED && <SuggestForm id={detail._id} />
					}
					{
						detail.status === SCHEDULED && <div>
							<div className="bg-white p-3 rounded-lg text-black border-primary-dark border">
								<p>
									<span className="font-bold">Address:</span>
									<span className="ml-2">{detail?.suggestion?.address}</span>
								</p>
								<p>
									<span className="font-bold">Date:</span>
									<span className="ml-2">{localDate}</span>
								</p>
								<p>
									<span className="font-bold">Time:</span>
									<span className="ml-2">{detail?.suggestion?.time}</span>
								</p>
							</div>
						</div>
					}
					{
						detail.status === AGREED && <FlushButton id={detail._id} suggestion={detail?.suggestion} />
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
						detail.status === SCHEDULED && <AgreeButton id={detail._id} suggestion={detail?.suggestion} />
					}
					{
						detail.status === AGREED && <div>
							<p>The owner is waiting for you to come and take this item away.</p>
							<div className="bg-white p-3 rounded-lg text-black border-primary-dark border">
								<p>
									<span className="font-bold">Address:</span>
									<span className="ml-2">{detail?.suggestion?.address}</span>
								</p>
								<p>
									<span className="font-bold">Date:</span>
									<span className="ml-2">{localDate}</span>
								</p>
								<p>
									<span className="font-bold">Time:</span>
									<span className="ml-2">{detail?.suggestion?.time}</span>
								</p>
							</div>
						</div>
					}
					{
						detail.status === FLUSHED && <p>This crap has been flushed away.</p>
					}
				</div>
			}
			{
				detail && <div className="rounded-lg">
					<div>
						{
							detail.images.length > 0 ? <div className="flex gap-0 relative shadow-2xl">
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
												className="w-1/2 h-auto rounded-l-lg"
											/>
										)
									})
								}
								<div className="w-1/2 flex flex-col rounded-r-lg justify-center bg-primary-dark text-white p-12">
									<div className="flex items-center bg-yellow-200 px-6 py-2 rounded-md text-primary-dark">
										<p className="text-lg">{detail.title}</p>
										<span className="mx-3">-</span>
										<span>[{detail.status}]</span>
									</div>
									<p className='mt-6'>{detail.description}</p>
									{
										isOwner && <DeleteButton id={detail._id} />
									}
								</div>
							</div> : <span>no any Image</span>
						}

					</div>

				</div>
			}
		</div>
	)
}

export default Page;
