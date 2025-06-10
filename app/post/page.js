import CreateForm from '@/app/components/createForm';

export default async function Page() {


  return (
    <section className="flex min-h-screen flex-col items-center py-12">
      <div className="w-full max-w-4xl mt-6 px-4 sm:px-6 lg:px-8">
        <div className="">
          <h2 className="text-2xl font-semibold text-primary-dark mb-6 text-center">
            Post
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Share what you no longer need
          </p>
          <CreateForm />
        </div>
      </div>
    </section>
  );
}