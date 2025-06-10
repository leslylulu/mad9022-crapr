import CrapList from "@/app/components/crapList";
import CrapSearch from "@/app/components/crapSearch";
import { getAllCrapItems } from "@/app/actions";
import { Suspense } from "react";

export const revalidate = 0;

export default async function Page({ searchParams }) {

  const keyword = searchParams?.keyword || searchParams?.q || "";
  const lat = searchParams?.lat ? parseFloat(searchParams.lat) : null;
  const long = searchParams?.long ? parseFloat(searchParams.long) : null;
  const distance = searchParams?.distance ? parseInt(searchParams.distance) : 10000;
  const { data: crapItems = [], error } = await getAllCrapItems({
    keyword,
    lat,
    long,
    distance
  });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-24 px-3 md:px-3">
      <h1 className="text-3xl font-bold text-primary-dark mb-6 text-center">Find Free Items</h1>

      <CrapSearch
        defaultKeyword={keyword}
        defaultLat={lat}
        defaultLong={long}
        defaultDistance={distance}
      />

      <div className="w-full max-w-6xl px-4 md:px-0 mt-16" suppressHydrationWarning>
        <Suspense fallback={
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
          </div>
        }>
          <div className="w-full">
            {error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <CrapList items={crapItems || []} />
            )}
          </div>
        </Suspense>
      </div>
    </section>
  );
}