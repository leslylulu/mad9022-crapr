'use client';
import { handleDeleteCrap } from '@/app/actions';

export default function DeleteButton(props) {

	const id = props.id;


	return (
		<div className="mt-2">
			<button
				type="button"
				data-twe-ripple-init
				data-twe-ripple-color="light"
				// onClick={() => handleDeleteCrap(id)}
				className="inline-block mt-3 rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-primary  focus:outline-none focus:ring-0  motion-reduce:transition-none ">Delete this pieces of crap
			</button>
		</div>
	);
}
