import CreateForm from '@/app/components/createForm';

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <div className="w-full mt-6 px-12">
        <h2 className="text-center my-3 text-lg">Upload a post of your own crap here.</h2>
        <CreateForm />
      </div>
    </main >
  );
}
