// import { GetServerSideProps } from 'next';
// import Image from "next/image";
import NavBar from "@/app/components/navbar";
import Login from "@/app/components/login";
import { getSession, handleSearch } from '@/app/actions';


export default async function Home() {
  let token = await getSession(); //called from server-side can accept a return value
  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <header className="flex items-center flex-col">
        <h1 className="text-4xl font-bold">Crapr</h1>
        <p className="text-xl">Get rid of your crap now</p>
        <NavBar />
      </header>
      <section className="mt-12 w-full flex justify-center">
        {
          token?.value ? <div className="px-24">
            <form className="w-[1/2] mx-auto flex flex-col" action={handleSearch}>
              <div className="mb-6">
                <label className="block mb-2 text-md font-medium text-primary-dark">Search for some Crap:</label>
                <input placeholder="keyword" type="text" name="keyword" className="bg-white border border-primary-dark text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                <p className="text-sm text-cyan-700">Leave form blank to match everything within the indicated distance.</p>
              </div>
              <label className="block mb-2 text-md font-medium text-primary-dark ">Select an option</label>
              <select defaultValue="30000" name="distance" className="bg-white border border-primary-dark text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                <option value="10000">10km</option>
                <option value="30000">30km</option>
                <option value="50000">50km</option>
              </select>
              <button type="submit" className="mt-6 text-white bg-primary-dark hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </form>
          </div> : <Login />
        }
      </section >
    </main >
  );
}
