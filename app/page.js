import Image from "next/image";
import NavBar from "@/app/components/navbar";
import Login from "@/app/components/login";
import { getSession } from '@/app/actions';


export default async function Home() {
  let token = await getSession(); //called from server-side can accept a return value
  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <header className="flex items-center flex-col">
        <h1 className="text-4xl font-bold">Crapr</h1>
        <p className="text-xl">Get rid of your crap now</p>
        <NavBar />
      </header>
      <section className="mt-12">
        {
          token?.value ? <div>Login token in the cookies</div> : <Login />
        }
      </section>
    </main>
  );
}
