import TableOverView from '../../_components/technologies/table-overview';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { fetchAllTechnologies } from '../../lib/data/technology';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technologies',
};

export default async function Technologies() {
  const technologies = await fetchAllTechnologies();

  return (
    <main>
      <div className="mt-10 flex md:justify-between">
        <div></div>
        <Link
          href="/admin/technologies/create"
          className="flex w-full items-center gap-2 rounded-lg border bg-neutral-900 px-4 py-1 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline-neutral-500 active:bg-neutral-600 md:w-auto"
        >
          <PlusCircleIcon className="h-8 w-8" />
          <span>Add technology</span>
        </Link>
      </div>

      <TableOverView technologies={technologies} />
    </main>
  );
}
