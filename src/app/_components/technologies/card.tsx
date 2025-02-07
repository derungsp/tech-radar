'use client';

import { Technology } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteTechnology } from '@/app/lib/actions/technology';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function Card({ technology }: { technology: Technology }) {
  const router = useRouter();

  const deleteTechnologyById = async (technologyId: string) => {
    try {
      const result = await deleteTechnology(technologyId);

      if (result.success) {
        toast.success(result.message);
        router.push('/admin/technologies');
        router.refresh();
      } else {
        toast.error(result.message || 'Failed to delete technology.');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div
      className={clsx(
        'w-full rounded-lg border p-2 shadow-sm',
        technology.isDraft ? 'bg-red-100' : 'bg-green-50',
      )}
    >
      <div className="flex items-center justify-between gap-x-5 p-4">
        <h3 className="text-sm font-medium">{technology.name}</h3>

        <div className="flex gap-x-5">
          <Link
            href={'technologies/' + technology.id + '/edit'}
            className="rounded bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600"
          >
            <PencilSquareIcon className="h-6 w-6" />
          </Link>

          <form action={async () => deleteTechnologyById(technology.id)}>
            <button className="h-full rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600">
              <TrashIcon className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
