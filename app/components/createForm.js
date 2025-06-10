'use client';
import { createCrap } from '@/app/actions';
import { useState, useRef, useEffect } from 'react';

export default function CreateForm() {
	const [code, setCode] = useState(null);
	const [message, setMessage] = useState(null);
	const [previewImages, setPreviewImages] = useState([]);
	const [isDragging, setIsDragging] = useState(false);
	const [location, setLocation] = useState({ latitude: null, longitude: null });
	const [locationStatus, setLocationStatus] = useState('');
	const fileInputRef = useRef(null);

	useEffect(() => {
		if (navigator.geolocation) {
			setLocationStatus('Fetching location...');
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					});
					setLocationStatus('Location acquired');
				},
				(error) => {
					console.error('Error getting location:', error);
					setLocationStatus('Failed to get location');
				},
				{ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
			);
		} else {
			setLocationStatus('Geolocation is not supported by your browser');
		}
	}, []);

	const handleCreate = async (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);

		if (location.latitude && location.longitude) {
			fd.append('lat', location.latitude);
			fd.append('long', location.longitude);
		}

		const response = await createCrap(fd);
		if (response?.status) {
			setCode(response?.status);
			setMessage(response?.message);
		}
	}

	const handleFileChange = (e) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			displayPreviewImages(files);
		}
	}

	const displayPreviewImages = (files) => {
		const newPreviewImages = [];

		Array.from(files).forEach(file => {
			if (!file.type.match('image.*')) return;

			const reader = new FileReader();
			reader.onload = (e) => {
				newPreviewImages.push({
					url: e.target.result,
					name: file.name,
					size: (file.size / 1024).toFixed(1) + ' KB'
				});

				if (newPreviewImages.length === files.length) {
					setPreviewImages([...previewImages, ...newPreviewImages]);
				}
			};
			reader.readAsDataURL(file);
		});
	}

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			fileInputRef.current.files = files;
			displayPreviewImages(files);
		}
	}

	const removePreview = (index) => {
		const newPreviews = [...previewImages];
		newPreviews.splice(index, 1);
		setPreviewImages(newPreviews);
	}

	const openFileDialog = () => {
		fileInputRef.current.click();
	}

	return (
		<div>
			{
				code && code !== 200 && <div className="text-red-700 bg-red-200 p-2 rounded-md mx-12 mb-2">{message} HTTP Code {code}</div>
			}
			<form className="max-w-lg mx-auto" onSubmit={handleCreate} >
				<div className="mb-5">
					<label className="block mb-2 text-md font-medium text-primary-dark ">Title</label>
					<input type="text" name="title" className="bg-gray-50 border border-gray-300 text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="title" required />
				</div>
				<div className="mb-5">
					<label className="block mb-2 text-md font-medium text-primary-dark">Description</label>
					<input
						required
						placeholder="description"
						type="text"
						name="description"
						className="bg-gray-50 border border-gray-300 text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
					/>
				</div>

				<div className="mb-5">
					<div className="flex items-center justify-between">
						<label className="block mb-2 text-md font-medium text-primary-dark">Location</label>
						<span className={`text-xs ${locationStatus === 'Location acquired' ? 'text-green-600' : 'text-amber-600'}`}>
							{locationStatus}
						</span>
					</div>
					<div className="bg-gray-50 border border-gray-300 text-primary-dark text-sm rounded-lg p-2.5 flex justify-between">
						{location.latitude && location.longitude ? (
							<>
								<span>Latitude: {location.latitude.toFixed(6)}</span>
								<span>Longitude: {location.longitude.toFixed(6)}</span>
							</>
						) : (
							<span>Waiting for location...</span>
						)}
					</div>
					<p className="text-xs text-gray-500 mt-1">Your location helps others find items near them</p>
				</div>

				<div className="max-w-lg mx-auto mb-5">
					<label className="text-md text-primary-dark mb-2 block">Upload Images</label>
					<div
						className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						onClick={openFileDialog}
					>
						<svg className="w-10 h-10 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
						</svg>
						<p className="mb-2 text-sm text-gray-500">
							<span className="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p className="text-xs text-gray-500">PNG, JPG, SVG, WEBP, and GIF are allowed (MAX size: 4MB)</p>
						<input
							ref={fileInputRef}
							name="images"
							type="file"
							multiple
							className="hidden"
							onChange={handleFileChange}
							accept="image/png, image/jpeg, image/svg+xml, image/webp, image/gif"
						/>
					</div>

					{/* Image Preview Area */}
					{previewImages.length > 0 && (
						<div className="mt-4">
							<h4 className="text-sm font-medium text-gray-700 mb-2">Image Previews:</h4>
							<div className="grid grid-cols-3 gap-3">
								{previewImages.map((image, index) => (
									<div key={index} className="relative">
										<img
											src={image.url}
											alt={`Preview ${index}`}
											className="w-full h-24 object-cover rounded-lg border border-gray-200"
										/>
										<button
											type="button"
											onClick={() => removePreview(index)}
											className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center"
										>
											✕
										</button>
										<p className="text-xs truncate mt-1">{image.name}</p>
										<p className="text-xs text-gray-500">{image.size}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<button
					type="submit"
					className="text-white bg-primary-dark hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					disabled={!location.latitude || !location.longitude}
				>
					Submit
				</button>
			</form>
		</div>
	)
}