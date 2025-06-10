import Link from 'next/link';

export const revalidate = 0;

export default async function Home() {


  return (
    <section className="min-h-screen flex flex-col gap-11 justify-center items-center py-12 px-3 md:px-3">
      <h1 className="uppercase text-2xl">Start exploring second-hand treasures 🎁 around you!</h1>
      <Link href="/login" className="text-primary-dark text-lg border border-primary px-8 py-4 rounded-full  hover:bg-primary-dark hover:text-slate-50 transition-all">
        Login in first!
      </Link>
    </section>
  );
}