import LoginForm from '@/app/components/login/LoginForm';
import GoogleLogin from '@/app/components/login/GoogleLogin';

export default async function Login() {
	
	return (
		<section className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md">
				<div>
					<h1 className="text-center text-xl font-bold tracking-tight text-primary-dark">
						Welcome to Recycle Platform
					</h1>
					<p className="mt-2 text-center text-sm text-gray-600">
						Sign in to your account
					</p>
				</div>

				<LoginForm />

				<div className="mt-6 flex flex-col gap-9">
					<div className="text-slate-700 text-sm text-center">
						Or continue with
					</div>
					<GoogleLogin/>
				</div>
			</div>
		</section>
	);
}