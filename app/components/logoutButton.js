'use client';
import { logout } from '@/app/actions';

export default function LogoutButton() {

	return (
		<form action={logout}>
			<button type="submit" className="text-md bg-primary-dark text-white p-3 rounded-md">
				Logout
			</button>
		</form>

	);
}
