'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

export default function CrapSearch({
	defaultKeyword = "",
	defaultLat = null,
	defaultLong = null,
	defaultDistance = "10000"
}) {
	const router = useRouter();

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [keyword, setKeyword] = useState(defaultKeyword);
	const [distance, setDistance] = useState(defaultDistance);
	const [location, setLocation] = useState({
		lat: defaultLat,
		long: defaultLong
	});
	const [isLoading, setIsLoading] = useState(false);

	// 获取用户位置
	useEffect(() => {
		if (navigator.geolocation && !location.lat && !location.long) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						lat: position.coords.latitude,
						long: position.coords.longitude
					});
				},
				(error) => {
					console.error("Error getting location:", error);
				}
			);
		}
	}, []);

	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
	};

	const handleSearchSubmit = (e) => {
		if (e) e.preventDefault();
		setIsLoading(true);

		// 构建搜索参数
		const searchParams = new URLSearchParams();

		if (keyword) {
			searchParams.set('keyword', keyword);
		}

		if (location.lat && location.long) {
			searchParams.set('lat', location.lat);
			searchParams.set('long', location.long);
		}

		if (distance) {
			searchParams.set('distance', distance);
		}

		router.push(`/?${searchParams.toString()}`);

		router.refresh();
		// 重置加载状态
		setIsLoading(false);
	};


	return (
		<>
			{/* 搜索栏和过滤器UI */}
			<div className="max-w-6xl mx-auto flex items-center w-full">
				<form onSubmit={handleSearchSubmit} className="flex-1 mr-2">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<FaSearch className="text-gray-400" />
						</div>
						<input
							type="text"
							className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-primary-dark focus:border-primary-dark"
							placeholder="Search for free items..."
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<button
							type="submit"
							className="absolute right-1 top-1 bottom-1 px-3 bg-primary-dark text-white rounded-lg"
							disabled={isLoading}
						>
							{isLoading ? 'Searching...' : 'Search'}
						</button>
					</div>
				</form>
				<button
					onClick={toggleFilter}
					className="p-2 text-primary-dark hover:bg-gray-100 rounded-full"
					aria-label="Filter"
				>
					{isFilterOpen ? <FaTimes size={24} /> : <FaFilter size={24} />}
				</button>
			</div>

			{/* 过滤器抽屉 */}
			<aside className={`
        md:w-80 bg-white p-6 rounded-lg shadow-md 
        fixed right-0 top-16 h-screen md:h-auto z-20 
        transform transition-transform duration-300 ease-in-out
        ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
        overflow-y-auto
      `}>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold text-primary-dark">Filters</h2>
					<button onClick={toggleFilter} className="text-gray-500">
						<FaTimes size={20} />
					</button>
				</div>

				<form className="flex flex-col">
					<div className="mb-6">
						<label className="block mb-2 text-md font-medium text-primary-dark">Distance</label>
						<select
							value={distance}
							onChange={(e) => setDistance(e.target.value)}
							name="distance"
							className="bg-white border border-primary-dark text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						>
							<option value="10000">10km</option>
							<option value="30000">30km</option>
							<option value="50000">50km</option>
						</select>
					</div>

					{location.lat && location.long ? (
						<div className="mb-6 text-sm text-green-600">
							✓ Using your current location
						</div>
					) : (
						<div className="mb-6 text-sm text-amber-600">
							Using default location
						</div>
					)}

					<button
						type="button"
						onClick={handleSearchSubmit}
						className="mt-6 text-white bg-primary-dark hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-4 py-2"
						disabled={isLoading}
					>
						Apply Filters
					</button>
				</form>
			</aside>
		</>
	);
}