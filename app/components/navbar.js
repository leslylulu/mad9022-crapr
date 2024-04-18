import Link from 'next/link';
import { getSession } from '@/app/actions';

export default async function NavBar(props) {
  let token = await getSession();

  return (
    <nav className="mt-6 w-full flex gap-3 justify-center">
      <Link href="/" className="text-md bg-primary-dark text-white p-3 rounded-md">
        Search
      </Link>
      {token?.value && (
        <>
          <Link href="/offer" className="text-md min-w-24 bg-primary-dark text-white p-3 rounded-md">
            Offer Crap
          </Link>
          <Link href="/mine" className="text-md bg-primary-dark text-white p-3 rounded-md">
            My Crap
          </Link>
          <Link href="/wiped" className="text-md bg-primary-dark text-white p-3 rounded-md">
            Wiped
          </Link>
          <Link href="/" className="text-md bg-primary-dark text-white p-3 rounded-md">
            Logout
          </Link>
        </>
      )}
    </nav>
  );
}
