
import Image from 'next/image';
import Link from 'next/link';

export default function CrapCard(props) {
	const crap = props.crap;
	const { NEXT_PAGE_URL } = process.env;
	const isMine = props.isMine;

	return (
		<Link href={`${NEXT_PAGE_URL}/crap/${crap._id}`} className="flex my-3 flex-col text-white ">
			<div >
				<div className="flex bg-primary-dark rounded-t-lg p-3 justify-between items-center">
					<h4 className="font-bold text-lg">{crap.title}</h4>
					<p className="p-3 rounded-md text-purple-300">{crap.status}</p>
				</div>
				{(isMine && crap.status == 'INTERESTED' || isMine && crap.status == 'AGREED') && <p className="text-primary-dark text-center">🔥🔥🔥 Action Required 🔥🔥🔥</p>}
				{!isMine && crap.status == 'SCHEDULED' && <p className="text-primary-dark text-center">🔥🔥🔥 Action Required 🔥🔥🔥</p>}
			</div>
			<div className="flex flex-col">
				{
					crap.images.map((image, index) => {
						return (
							<Image
								width={600}
								height={600}
								key={index}
								src={image}
								alt="crap"
								className="w-full h-min-40 rounded-b-lg shadow-lg"
							/>
						)
					})
				}
				<p className="text-primary-dark px-2 pt-3">{crap.description}</p>
			</div>
		</Link>
	);
}
