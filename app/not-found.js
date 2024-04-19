import React from 'react';

const FourOhFour = () => {
	return (
		<div className="container flex items-center justify-center mt-3 flex-col gap-8">
			<h1 className="text-3xl">Oops, Page no exists here.</h1>
			<p className="flex items-center bg-primary-dark gap-3 p-3 text-white rounded-lg">
				<span className="material-symbols-outlined">
					home
				</span>
				<a href="/">
					Go back to the home page.
				</a>
			</p>
		</div>
	);
};

export default FourOhFour;
