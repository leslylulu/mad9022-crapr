import React from 'react'
import { cookies } from 'next/headers';


export default async function Page() {
	cookies();
	return (
		<div>
			<h1>Page</h1>
		</div>
	)
}
