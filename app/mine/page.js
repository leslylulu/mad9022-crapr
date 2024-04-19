import React from 'react'
import Image from 'next/image';

export default async function Page() {
	const data = [
		{
			title: 'ee',
			description: 'ee',
			status: 'AVAILABLE',
			images: ['https://storage.googleapis.com/w2024-310-final-eddie/1713404076853-image_404.jpg', "https://storage.googleapis.com/w2024-310-final-eddie/1713404076853-image_404.jpg"],
		},
		{
			title: 'box',
			description: 'a test data',
			status: 'SCHEDULED',
			images: ['https://storage.googleapis.com/w2024-310-final-eddie/1713404076853-image_404.jpg', "https://storage.googleapis.com/w2024-310-final-eddie/1713404076853-image_404.jpg"],
		}
	]
	return (
		<div className="container">
			<h2 className="my-6">These are pieces of crap that you have posted. As well as pieces of crap that you have expressed interest in owning.</h2>

			<h3>Crap I Wanna Get Rid Of</h3>
			<div className="flex gap-3">
				{
					data.map((crap, index) => {
						return (
							<div key={index} className="flex my-3 flex-col gap-3 border border-w-2 text-white bg-primary-light">
								<div className="bg-primary-light">
									<h4 className="bg-primary-dark p-3">{crap.title}</h4>
									<p className="text-primary-dark px-2">{crap.status}</p>
									<p className="text-primary-dark px-2">{crap.description}</p>
								</div>
								<div className="flex bg-primary-light">
									{
										crap.images.map((image, index) => {
											return (
												<Image width={100} height={100} key={index} src={image} alt="crap" />
											)
										})
									}
								</div>
							</div>
						)
					})
				}

			</div>

			<h3>Crap I Wanna Bring Home</h3>

		</div>
	)
}
