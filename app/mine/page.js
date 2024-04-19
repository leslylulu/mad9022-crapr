import { getSession } from '@/app/actions';
import jwt from 'jsonwebtoken';
import CrapCard from '@/app/components/crapCard';

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

export default async function Page() {
	const { NEXT_PAGE_URL } = process.env;
	const token = await getSession();
	console.log("token 111", token?.value);
	const response = await fetch(`${NEXT_PAGE_URL}/api/mine?token=${token?.value}`, {
		method: 'GET',
	});
	const result = await response.json();
	const myList = result.data;
	return (
		<div className="container">
			<h2 className="my-6">These are pieces of crap that you have posted. As well as pieces of crap that you have expressed interest in owning.</h2>
			<h3 className="text-2xl">Crap I Wanna Get Rid Of</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{
					myList && myList.length > 0 && myList.map((crap, index) => {
						return (
							<CrapCard crap={crap} key={index} />
						)
					})
				}
			</div>
			<h3>Crap I Wanna Bring Home</h3>

		</div>
	)
}
