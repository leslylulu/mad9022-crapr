'use client';
import { logout } from '@/app/actions';
import { useState } from 'react';

export default function LogoutButton() {
	const [message, setMessage] = useState(null);

	const handleLogout = async () => {
		const response = await logout();
		if (response) {
			setMessage('You have been logged out.')
		}
	}

	return (
		<form action={handleLogout}>
			<button onClick={logout} className="text-md bg-primary-dark text-white p-3 rounded-md">
				Logout
			</button>
		</form>

	);
}
