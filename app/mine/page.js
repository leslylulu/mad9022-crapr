import CrapCard from '@/app/components/crapCard';
import Login from '@/app/components/login';
import { getSession  } from '@/app/actions'
import isCurrentUser from '@/app/utils'

export default async function Page() {
	const { NEXT_API_URL } = process.env;

	const token = await getSession();

	if (!token?.value) {
		return (
			<div className="container flex flex-col items-center justify-center min-h-screen py-12">
				<h2 className="text-2xl font-semibold text-primary-dark mb-6 text-center">
					Login Required
				</h2>
				<p className="text-gray-600 mb-8 text-center">
					Please login to view your crap items
				</p>
				<div className="mt-2">
					<Login callbackUrl="/mine" />
				</div>
			</div>
		);
	}

	let response = await fetch(`${NEXT_API_URL}/api/crap/mine`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + token.value,
		},
		cache: 'no-store'
	});

	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "Failed View Crap", code: response.status }));

		const result = await response.json();

		const sellList = result.data?.filter(item =>
			isCurrentUser(token.value, item?.owner._id ) && item?.status !== 'FLUSHED'
		);

		const bringList = result.data?.filter(item =>
			isCurrentUser(token.value, item?.buyer._id) && item?.status !== 'FLUSHED'
		);

		return (
			<div className="container mx-auto px-4">
				<h2 className="text-xl my-6">These are pieces of crap that you have posted. As well as pieces of crap that you have expressed interest in owning.</h2>

				<h3 className="text-2xl font-semibold mt-8 mb-4">Crap I Wanna Get Rid Of</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{sellList && sellList.length > 0 ? (
						sellList.map((crap, index) => (
							<CrapCard crap={crap} key={index} isMine={true} />
						))
					) : (
						<p className="text-gray-500 col-span-full">You haven't posted any items yet.</p>
					)}
				</div>

				<h3 className="text-2xl font-semibold mt-12 mb-4">Crap I Wanna Bring Home</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{bringList && bringList.length > 0 ? (
						bringList.map((crap, index) => (
							<CrapCard crap={crap} key={index} isMine={false} />
						))
					) : (
						<p className="text-gray-500 col-span-full">You haven't expressed interest in any items yet.</p>
					)}
				</div>
			</div>
		);

	} catch (err) {
		let errObj = JSON.parse(err.message);
		return <div className="flex flex-col items-center my-9 container gap-3 w-full">
			<p className="bg-red-200 text-red-800 p-3 rounded-md">Failed to Check crap HTTP code : {errObj.code}</p>
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
}