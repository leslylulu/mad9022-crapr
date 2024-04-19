'use client';
import { setFlush } from '@/app/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AgreeButton(props) {
	const id = props.id;
	const router = useRouter();
	const suggestion = props.suggestion;
	const [message, setMessage] = useState(null);
	const date = new Date(suggestion.date);

	return (
		<div className="mt-2">
			{
				message && <p className="text-primary-dark">{message}</p>
			}
			{
				!message && <div>
					<p className="flex items-center text-lg mb-3">
						<span className="material-symbols-outlined">
							hourglass_top
						</span>
						Waiting for the buyer to pickup the item at this time and location.
					</p>
					<div className="bg-white p-3 rounded-lg text-black">
						<p>
							<span className="font-bold">Address:</span>
							<span className="ml-2">{suggestion.address}</span>
						</p>
						<p>
							<span className="font-bold">Date:</span>
							<span className="ml-2">{date.toLocaleDateString()}</span>
						</p>
						<p>
							<span className="font-bold">Time:</span>
							<span className="ml-2">{suggestion.time}</span>
						</p>
					</div>
					<button
						type="button"
						data-twe-ripple-init
						data-twe-ripple-color="light"
						onClick={async () => {
							const response = await setFlush(id);
							if (response?.status !== 200) {
								setMessage(response?.message)
							} else {
								router.refresh();
								setMessage('The item has been flushed away.')
							}
						}}
						className="inline-block mt-3 rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-primary  focus:outline-none focus:ring-0  motion-reduce:transition-none">
						FLUSH
					</button>
					<p>Once the crap has been taken away, click the FLUSH button.</p>
				</div>
			}

		</div>
	);
}
