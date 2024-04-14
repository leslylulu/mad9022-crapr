import Link from 'next/link';
import { getSession } from '@/app/actions';

export default async function NavBar(props) {
  let token = await getSession();

  return (
    <nav className="mt-6 w-full flex justify-center">
      <span className="px-6">
        <Link href="/" className="text-md bg-primary-dark text-white px-6 py-2 rounded-md">
          Search
        </Link>
      </span>
      {token?.value && (
        <>
          <span className="px-4">
            <Link href="/offer" className="text-md bg-primary-dark text-white px-6 py-2 rounded-md">
              Offer Crap
            </Link>
          </span>
          <span className="px-4">
            <Link href="/mine" className="text-md bg-primary-dark text-white px-6 py-2 rounded-md">
              My Crap
            </Link>
          </span>
          <span className="px-4">
            <Link href="/wiped" className="text-md bg-primary-dark text-white px-6 py-2 rounded-md">
              Wiped
            </Link>
          </span>
          <span className="px-4">
            <Link href="/" className="text-md bg-primary-dark text-white px-6 py-2 rounded-md">
              Logout
            </Link>
          </span>
        </>
      )}
    </nav>
  );
}
