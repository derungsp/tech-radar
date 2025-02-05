import Table from '../_components/technologies/table';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { fetchAllTechnologies } from '../lib/data/technology';

export default async function Technologies() {
  const technologies = await fetchAllTechnologies();

  return (
    <main className="min-h-screen bg-gray-100 p-6 pt-20">
      <div className="col-span-2">
        <Link
          href="/technologies/create"
          className="flex items-center gap-2 rounded-lg border bg-neutral-900 px-4 py-1 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline-neutral-500 active:bg-neutral-600"
        >
          <PlusCircleIcon className="h-8 w-8" />
          <span>Add technology</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2">
        <Table
          title="PLATFORMS"
          technologies={technologies.filter((i) => i.category === 'PLATFORMS')}
        />
        <Table
          title="LANGUAGES"
          technologies={technologies.filter((i) => i.category === 'LANGUAGES')}
        />
        <Table title="TOOLS" technologies={technologies.filter((i) => i.category === 'TOOLS')} />
        <Table
          title="TECHNIQUES"
          technologies={technologies.filter((i) => i.category === 'TECHNIQUES')}
        />
      </div>
    </main>
  );
}
