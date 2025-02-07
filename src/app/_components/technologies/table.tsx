import { Technology } from '@prisma/client';
import Link from 'next/link';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteTechnology } from '@/app/lib/actions/technology';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Table({
  title,
  technologies,
}: {
  title: string;
  technologies: Technology[];
}) {
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
    <div className="overflow-x-auto py-4 lg:p-4">
      <table className="w-full border-collapse rounded-lg border border-gray-300 shadow-lg">
        <caption className="caption-top rounded-t-lg py-3 text-left text-lg font-semibold text-gray-700">
          {title}
        </caption>
        <thead>
          <tr className="bg-gray-200 text-left text-gray-700">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Ring</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {technologies.length <= 0 ? <tr>no technologies existing</tr> : <></>}

          {technologies.map((technology) => (
            <tr
              key={technology.id}
              className="border border-gray-200 transition-colors hover:bg-gray-200"
            >
              <td className="px-4 py-2">{technology.name}</td>
              <td className="px-4 py-2">{technology.ring}</td>
              <td className="px-4 py-2">
                <span
                  className={`rounded-full px-2 py-1 text-sm text-white ${
                    !technology.isDraft ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {!technology.isDraft ? 'public' : 'draft'}
                </span>
              </td>
              <td className="flex gap-x-3 px-4 py-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
