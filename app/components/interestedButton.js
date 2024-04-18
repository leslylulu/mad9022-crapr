'use client';
import { setInterested } from '@/app/actions';
import { useState } from 'react';

export default function InterestedButton(props) {
	const id = props.id;
	const [message, setMessage] = useState(null);

	return (
		<div className="mt-2">
			{
				!message && <p>If you would like this item, please click the interested button.</p>
			}
			{
				message && <p className="text-primary-dark">{message}</p>
			}
			{
				!message && <button
					type="button"
					data-twe-ripple-init
					data-twe-ripple-color="light"
					onClick={async () => {
						const response = await setInterested(id);
						if (response) {
							setMessage('Waiting for a response from the seller.')
						}
					}}
					className="inline-block mt-3 rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-primary  focus:outline-none focus:ring-0  motion-reduce:transition-none">
					INTERESTED
				</button>
			}

		</div>
	);
}
