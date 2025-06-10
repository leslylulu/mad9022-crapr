"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
	};

	return (
		<>
			{error && (
				<div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
					{error}
				</div>
			)}

			<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
				<div className="-space-y-px rounded-md shadow-sm">
					<div>
						<label htmlFor="email-address" className="sr-only">Email address</label>
						<input
							id="email-address"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="relative block w-full rounded-t-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
							placeholder="Email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="relative block w-full rounded-b-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						disabled={loading}
						className="group relative flex w-full justify-center rounded-md bg-primary-dark py-2 px-3 text-sm font-medium text-white hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
					>
						{loading ? 'Signing in...' : 'Sign in'}
					</button>
				</div>
			</form>
		</>
	);
}