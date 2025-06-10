import Link from 'next/link';
import { calculateDistance } from "@/app/utils"

export default function CrapList({ items = [] }) {
	if (items.length === 0) {
		return (
			<div className="text-center py-10">
				<p className="text-lg text-gray-600">No items found. Try a different search or check back later!</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{items.map((item) => (
				<Link href={`/crap/${item._id}`} key={item._id} className="block">
					<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
						<div className="relative w-full pt-[75%]">
							{item.images && item.images.length > 0 ? (
								<img
									src={item.images[0]}
									alt={item.title}
									className="absolute top-0 left-0 w-full h-full object-cover"
								/>
							) : (
								<div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
									<p className="text-gray-500">No image</p>
								</div>
							)}
						</div>

						<div className="p-4 flex flex-col flex-grow">
							<h3 className="font-bold text-lg text-primary-dark truncate">{item.title}</h3>
							<p className="text-gray-600 mt-1 mb-2 line-clamp-2 flex-grow">{item.description}</p>

							<div className="flex justify-between items-center mt-2 text-sm text-gray-500">
								<span>{new Date(item.createdAt).toLocaleDateString()}</span>
								<div className="flex items-center">
									<svg className="w-4 h-4 text-primary-dark mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
									</svg>
									{/* <span>
										{item.distance ? `${calculateDistance(item.distance / 1000).toFixed(1)} km` : 'Unknown distance'}
									</span> */}
								</div>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}