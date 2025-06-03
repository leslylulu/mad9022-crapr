export const revalidate = 0;
import jwt from 'jsonwebtoken';
import { getSession } from '@/app/actions';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Login from "@/app/components/login";

const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default async function Page({ params, searchParams }) {
  cookies();
  const { distance, keyword } = searchParams;
  const { NEXT_PAGE_URL } = process.env;
  const token = await getSession();
  
  // Handle the case when user is not logged in
  let response;
  try {
    // Attempt to fetch data without token for public browsing
    response = await fetch(`${NEXT_PAGE_URL}/api/crap?distance=${distance}${keyword ? '&keyword=' + keyword : ''}`, {
      method: 'GET',
    });
    
    // If API requires token, handle the fallback
    if (!response.ok) {
      return (
        <main className="flex min-h-screen flex-col items-center py-12">
          <div className="w-full mt-6 px-12">
            <h2 className="text-center text-xl">Please login to browse crap</h2>
            <div className="text-center mt-6">
              <Login />
            </div>
          </div>
        </main>
      );
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <main className="flex min-h-screen flex-col items-center py-12">
        <div className="w-full mt-6 px-12">
          <h2 className="text-center text-xl">Error loading data. Please try again later.</h2>
        </div>
      </main>
    );
  }
  
  const data = await response.json();
  const list = data?.data || [];
  const myId = token ? decodeToken(token?.value)?.payload?.id : null;

  return (
    <section className="flex min-h-screen flex-col items-center py-12">
      <div className="w-full mt-6 px-12">
        <h2 className="text-center text-xl">There are
          <span className="font-bold mx-2">{list.length > 0 ? list.length : '0'}</span>
          <span className="text-yellow-500 mx-2 font-bold">AVAILABLE</span> matches  {keyword ? 'for ' + keyword : 'in ' + distance + 'm'}</h2>
      </div>
      <div className="w-full p-3 flex flex-col gap-3 container">
        {
          list && list.length > 0 && list.map(item => {
            return (
              <Link key={item._id} href={`/crap/${item._id}`} className="bg-primary-dark text-white rounded-md w-full p-3 flex justify-between items-center">
                <div>
                  <h3 className="text-xl uppercase">{item.title}</h3>
                  <p>{item.description}</p>
                  {
                    myId && item.owner._id == myId && <p className="text-yellow-400 font-bold">This is your own crap</p>
                  }
                </div>
                <span className="material-symbols-outlined text-xl">
                  chevron_right
                </span>
              </Link>
            )
          })
        }
      </div>
      
      {!token?.value && (
        <div className="mt-6 text-center">
          <p className="mb-4">Sign in to post your own crap or express interest</p>
          <Login />
        </div>
      )}
    </section>
  );
}