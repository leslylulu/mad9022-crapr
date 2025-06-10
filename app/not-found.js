import React from 'react';

const FourOhFour = () => {
	return (
		<div className="min-h-screen flex items-center justify-center mt-3 flex-col gap-8">
			<h1 className="text-3xl">404</h1>
			<p>Oops, Page no exists here.</p>
			<p className="flex items-center bg-primary-dark gap-3 p-3 text-white rounded-lg">
				<span className="material-symbols-outlined">
					home
				</span>
				<a href="/">
					Home page.
				</a>
			</p>
		</div>
	);
};

export default FourOhFour;
