'use client';
import { useState } from 'react';
import { suggestLocation } from '@/app/actions';

export default function SuggestForm(props) {
	const id = props.id;
	const [suggestion, setSuggestion] = useState(null);
	const [code, setCode] = useState(null);
	const [message, setMessage] = useState(null);
	const [localDate, setLocalDate] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const address = formData.get('address');
		const date = formData.get('date');
		const time = formData.get('time');
		const response = await suggestLocation(id, address, date, time);
		if (response.status !== 200) {
			setCode(response.status);
			setMessage(response.message);
		} else {
			setSuggestion(response.result?.data?.suggestion);
			const date = response.result?.data?.suggestion?.date;
			setLocalDate(new Date(date));
		}
	};

	return (
		<div className="mt-6">
			{
				suggestion ? <div>
					<p>Waiting for the buyer to agree to the proposed pickup:</p>
					<div className="bg-white p-3 rounded-lg text-black">
						<p>
							<span className="font-bold">Address:</span>
							<span className="ml-2">{suggestion.address}</span>
						</p>
						<p>
							<span className="font-bold">Date:</span>
							<span className="ml-2">{localDate.toLocaleDateString()}</span>
						</p>
						<p>
							<span className="font-bold">Time:</span>
							<span className="ml-2">{suggestion.time}</span>
						</p>
					</div>
				</div> : <form onSubmit={handleSubmit}>
					{
						code && code !== 200 && <p className="text-red-800 bg-red-200 p-3 mb-3 rounded-lg">Faild to Suggest. HTTP status {code} - {message}</p>
					}
					<div className="mb-5 flex w-full items-center">
						<label className="inline-block text-md text-primary-dark w-1/3">Pickup Address:</label>
						<input type="test" name="address" className="bg-gray-50 inline-block border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 " placeholder="pickup address" required />
					</div>
					<div className="mb-5 flex w-full items-center">
						<label className="inline-block text-md text-primary-dark w-1/3">Pickup Date:</label>
						<input datepicker="true" type="date" name="date" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full ps-2 p-2.5 " placeholder="Select date" />
					</div>
					<div className="mb-5 flex w-full items-center">
						<label className="inline-block text-md text-primary-dark w-1/3">Pickup Time:</label>
						<select defaultValue="9am-12pm" name="time" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full ps-2 p-2.5 ">
							<option value="6am-9am">6am - 9am</option>
							<option value="9am-12pm">9am - 12pm</option>
							<option value="12pm-3pm">12pm - 3pm</option>
							<option value="3pm-6pm">3pm - 6pm</option>
							<option value="6pm-9pm">6pm - 9pm</option>
							<option value="9pm-12am">9pm - 12am</option>
						</select>
					</div>
					<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Suggest Pickup TIME and LOCATION</button>
				</form>
			}

		</div >
	);
}
