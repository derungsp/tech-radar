'use client';

import Table from './table';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Technology, UserRole } from '@prisma/client';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';

export default function TableOverView({ technologies }: { technologies: Technology[] }) {
  const { user } = useAuth();

  if (user?.role !== UserRole.CTO && user?.role !== UserRole.TECHLEAD) {
    redirect('/');
  }

  return (
    <>
      <Link
        href="/technologies/create"
        className="flex items-center gap-2 rounded-lg border bg-neutral-900 px-4 py-1 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline-neutral-500 active:bg-neutral-600"
      >
        <PlusCircleIcon className="h-8 w-8" />
        <span>Add technology</span>
      </Link>

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
    </>
  );
}
