import EditForm from '@/app/_components/technologies/edit-form';
import { fetchTechnologyById } from '@/app/lib/data/technology';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Technology edit',
};

export default async function EditTechnology({
  params,
}: {
  params: Promise<{ technologyId: string }>;
}) {
  const id = (await params).technologyId;

  const technology = await fetchTechnologyById(id);

  if (!technology) {
    return notFound();
  }

  return (
    <main className="mt-10 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 rounded-lg border bg-white p-5 shadow-sm lg:w-[800px]">
        <EditForm technology={technology} />
      </div>
    </main>
  );
}
