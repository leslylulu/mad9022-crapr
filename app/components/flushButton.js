'use client';
import { setFlush } from '@/app/actions';
import { useState } from 'react';

export default function AgreeButton(props) {
	const id = props.id;
	const suggestion = props.suggestion;
	const [message, setMessage] = useState(null);

	return (
		<div className="mt-2">
			{
				message && <p className="text-primary-dark">{message}</p>
			}
			{
				!message && <div>
					<p>Waiting for the buyer to pickup the item at this time and location.</p>
					<p>Address: {suggestion.address}</p>
					<p>Date: {suggestion.date}</p>
					<p>Time: {suggestion.time}</p>
					<button
						type="button"
						data-twe-ripple-init
						data-twe-ripple-color="light"
						onClick={async () => {
							const response = await setFlush(id);
							if (response) {
								setMessage('Once the crap has been taken away, click the FLUSH button.')
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
