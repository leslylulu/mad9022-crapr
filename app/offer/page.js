// export const revalidate = false; // means cache forever
// export const revalidate = 0; // don't cache
// export const revalidate = 60 * 10; // means cache for 10 mins

import NavBar from '@/app/components/navbar';
// import { getSession } from '@/app/actions';

export default async function Page() {
  // let token = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <header className="flex items-center flex-col">
        <h1 className="text-4xl font-bold">Crapr</h1>
        <p className="text-xl">Get rid of your crap now</p>
        <NavBar />
      </header>
      <div className="w-full mt-6 px-12">
        <h2 className="text-center">Upload a post of your own crap here.</h2>
        {/* <form className="flex flex-col gap-3 items-start">
          <label className="flex items-center">
            <span className="w-52">Title:</span>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              type="text" name="title" placeholder='title' />
          </label>
          <label className="flex items-center">
            <span className="w-52">Description:</span>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              type="text" name="description" placeholder='description' />
          </label>
          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 4M)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>
          <input type="submit" value="Submit" className="cursor-pointer focus:outline-none text-white bg-primary-dark hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-dark dark:hover:bg-green-700 dark:focus:ring-green-800" />
        </form> */}
      </div>
    </main>
  );
}
