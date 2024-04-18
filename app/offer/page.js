export const revalidate = false; // means cache forever
// export const revalidate = 0; // don't cache
// export const revalidate = 60 * 10; // means cache for 10 mins
import { createCrap } from '@/app/actions';

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center py-12">

      <div className="w-full mt-6 px-12">
        <h2 className="text-center my-3 text-lg">Upload a post of your own crap here.</h2>

        <form className="max-w-lg mx-auto" action={createCrap}>
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-primary-dark ">Title</label>
            <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="title" required />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-primary-dark">Description</label>
            <input
              required
              placeholder="description"
              type="text"
              name="description"
              className="bg-gray-50 border border-gray-300 text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="max-w-lg mx-auto mb-5">
            <label className="text-md text-primary-dark mb-2 block">Upload file</label>
            <input name="images" type="file" multiple
              className="w-full text-black text-sm bg-gray-50 border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-300 file:hover:bg-gray-200 file:text-black rounded-lg" />
            <p className="text-sm text-primary-dark mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.(MAX size: 4M)</p>
          </div>
          <button type="submit" className="text-white bg-primary-dark hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
        </form>
      </div>
    </main >
  );
}
