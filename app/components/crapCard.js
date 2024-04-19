
import Image from 'next/image';
import Link from 'next/link';

export default function CrapCard(props) {
	const crap = props.crap;
	const { NEXT_PAGE_URL } = process.env;

	return (
		<Link href={`${NEXT_PAGE_URL}/crap/${crap._id}`} className="flex my-3 flex-col gap-3 border border-w-2 text-white bg-primary-light">
			<div className="bg-primary-light">
				<div className="flex bg-primary-dark p-3 justify-between items-center">
					<h4>{crap.title}</h4>
					<p className="p-3 rounded-md text-purple-300">{crap.status}</p>
				</div>
				{crap.status !== 'AVAILABLE' && <p className="text-primary-dark text-center">🔥🔥🔥 Action Required 🔥🔥🔥</p>}
				<p className="text-primary-dark px-2 pt-3">"{crap.description}"</p>
			</div>
			<div className="flex bg-primary-light flex-col">
				{
					crap.images.map((image, index) => {
						return (
							<Image
								width={100}
								height={100}
								key={index}
								src={image}
								alt="crap"
								className="h-full w-full"
							/>
						)
					})
				}
			</div>
		</Link>
	);
}
