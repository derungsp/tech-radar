import TableOverView from '../_components/technologies/table-overview';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { fetchAllTechnologies } from '../lib/data/technology';

export default async function Technologies() {
  const technologies = await fetchAllTechnologies();

  return (
    <main>
      <Link
        href="/technologies/create"
        className="flex items-center gap-2 rounded-lg border bg-neutral-900 px-4 py-1 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline-neutral-500 active:bg-neutral-600"
      >
        <PlusCircleIcon className="h-8 w-8" />
        <span>Add technology</span>
      </Link>

      <TableOverView technologies={technologies} />
    </main>
  );
}
