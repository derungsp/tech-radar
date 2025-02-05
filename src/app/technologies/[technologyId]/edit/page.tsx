import EditForm from '@/app/_components/technologies/edit-form';
import { fetchTechnologyById } from '@/app/lib/data/technology';
import { notFound } from 'next/navigation';

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
    <main>
      <EditForm technology={technology} />
    </main>
  );
}
