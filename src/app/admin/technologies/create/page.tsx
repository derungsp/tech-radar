import CreateForm from '@/app/_components/technologies/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology create',
};

export default function CreateTechnology() {
  return (
    <main className="mt-10 flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-8 rounded-lg border bg-white p-5 shadow-sm lg:w-[800px]">
        <CreateForm />
      </div>
    </main>
  );
}
