export const revalidate = 0;
import { getSession } from '@/app/actions';
import DeleteButton from '@/app/components/deleteButton';
import InterestedButton from '@/app/components/interestedButton';
import SuggestForm from '@/app/components/suggestForm';
import AgreeButton from '@/app/components/agreeButton';
import FlushButton from '@/app/components/flushButton';
import Image from 'next/image';
import isCurrentUser from '@/app/utils';

const { NEXT_PAGE_URL } = process.env;
const AVAILABLE = 'AVAILABLE';
const INTERESTED = 'INTERESTED';
const SCHEDULED = 'SCHEDULED';
const AGREED = 'AGREED';
const FLUSHED = 'FLUSHED';


const Page = async ({ params, searchParams }) => {

	const { id } = params;
	const token = await getSession();
	const response = await fetch(`${NEXT_PAGE_URL}/api/crapDetail?token=${token?.value}&id=${id}`, {
		method: 'GET',
	});
	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "Failed View Crap Detail", code: response.status }));
	} catch (err) {
		let errObj = JSON.parse(err.message);
		return <div className="flex flex-col items-center my-9 container gap-3 w-full">
			<p className="bg-red-200 text-red-800 p-3 rounded-md">Failed to fetch data HTTP code : {errObj.code}</p>
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
						detail.status === AVAILABLE && <p>Still waiting for some sucker to express interest in your crap.</p>
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
				detail && <div className="bg-primary-dark text-white rounded-lg">
					<h2 className="bg-yellow-200 p-3 text-primary-dark">
						{detail.title}
						<span className="mx-3">-</span>
						<span>[{detail.status}]</span>
					</h2>
					<div className="p-3">
						<p className="mb-3">{detail.description}</p>
						{
							detail.images.length > 0 ? <div className="flex gap-2 relative flex-col ">
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
