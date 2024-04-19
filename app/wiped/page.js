import { getSession } from '@/app/actions';
import CrapCard from '@/app/components/crapCard';

export default async function Page() {
	const { NEXT_PAGE_URL } = process.env;
	const token = await getSession();
	const response = await fetch(`${NEXT_PAGE_URL}/api/mine?token=${token?.value}`, {
		method: 'GET',
	});
	const result = await response.json();
	const flushedList = result.data?.filter(item => item.status === 'FLUSHED');
	return (
		<div className="container">
			<h2 className="my-6">These are pieces of crap that you have posted and managed to get rid of.</h2>
			<h3 className="text-2xl">Craps that are gone</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{
					flushedList && flushedList.length > 0 && flushedList.map((crap, index) => {
						return (
							<CrapCard crap={crap} key={index} />
						)
					})
				}
			</div>
		</div>
	)
}
