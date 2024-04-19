import { getSession } from '@/app/actions';
import CrapCard from '@/app/components/crapCard';
import isCurrentUser from '@/app/utils';

export default async function Page() {
	const { NEXT_API_URL } = process.env;
	const token = await getSession();
	let response = await fetch(`${NEXT_API_URL}/api/crap/mine`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + token?.value,
		},
		next: { revalidate: 0 },
	});
	try {
		if (!response.ok) throw new Error(JSON.stringify({ msg: "Failed View Crap", code: response.status }));
	} catch (err) {
		let errObj = JSON.parse(err.message);
		return <div className="flex flex-col items-center my-9 container gap-3 w-full">
			<p className="bg-red-200 text-red-800 p-3 rounded-md">Failed to Check Mr crap HTTP code : {errObj.code}</p>
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
	const sellList = result.data?.filter(item => isCurrentUser(token?.value, item?.owner?._id));
	const bringList = result.data?.filter(item => isCurrentUser(token?.value, item?.buyer?._id));
	return (
		<div className="container">
			<h2 className="my-6">These are pieces of crap that you have posted. As well as pieces of crap that you have expressed interest in owning.</h2>
			<h3 className="text-2xl">Crap I Wanna Get Rid Of</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{
					sellList && sellList.length > 0 && sellList.map((crap, index) => {
						return (
							<CrapCard crap={crap} key={index} isMine={true} />
						)
					})
				}
			</div>
			<h3 className="text-2xl">Crap I Wanna Bring Home</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{
					bringList && bringList.length > 0 && bringList.map((crap, index) => {
						return (
							<CrapCard crap={crap} key={index} isMine={false} />
						)
					})
				}
			</div>
		</div>
	)
}
