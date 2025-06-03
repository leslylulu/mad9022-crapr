import CreateForm from '@/app/components/createForm';
import GoogleLogin from '@/app/components/googleLogin';
import { getSession } from '@/app/actions';

export default async function Page() {
  const token = await getSession();
  const isLoggedIn = !!token?.value;

  const apiUrl = process.env.NEXT_API_URL || 'http://localhost:4000';
  const pageUrl = process.env.NEXT_PAGE_URL || 'http://localhost:3000';
  const redirectUrl = encodeURIComponent(`${pageUrl}/post`);
  const googleAuthUrl = `${apiUrl}/auth/google?redirect_url=${redirectUrl}`;


  return (
    <section className="flex min-h-screen flex-col items-center py-12">
      <div className="w-full max-w-4xl mt-6 px-4 sm:px-6 lg:px-8">
        {!isLoggedIn ? (
          <div className="backdrop-blur-sm">
            <h2 className="text-2xl text-center font-semibold text-primary-dark mb-6">
              Login Required
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-600 mb-4">
                If you want to release a post
              </p>
              <div className="mt-2">
                <GoogleLogin googleAuthUrl={googleAuthUrl} />
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <h2 className="text-2xl font-semibold text-primary-dark mb-6 text-center">
              Post
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Share what you no longer need
            </p>
            <CreateForm />
          </div>
        )}
      </div>
    </section>
  );
}