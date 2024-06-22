import { getSession } from '@/app/actions';
import LogoutButton from '@/app/components/logoutButton';
import LinkButton from './linkButton';

export default async function NavBar() {
  let token = await getSession();

  return (
    <nav className="mt-6 w-full flex gap-3 justify-center">

      {token?.value && (
        <>
          <LinkButton title="Search" linkUrl="/" />
          <LinkButton title="Offer Crap" linkUrl="/offer" />
          <LinkButton title="My Crap" linkUrl="/mine" />
          <LinkButton title="Wiped" linkUrl="/wiped" />
          <LogoutButton />
        </>
      )}
    </nav>
  );
}
