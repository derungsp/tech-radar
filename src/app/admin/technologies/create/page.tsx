import CreateForm from '@/app/_components/technologies/create-form';

export default function CreateTechnology() {
  return (
    <main className="mt-10 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 rounded-lg border bg-white p-5 shadow-sm lg:w-[800px]">
        <CreateForm />
      </div>
    </main>
  );
}
