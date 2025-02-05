import { Technology } from '@prisma/client';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteTechnology } from '@/app/lib/actions/technology';

export default function Table({
  title,
  technologies,
}: {
  title: string;
  technologies: Technology[];
}) {
  const deleteTechnologyById = async (technologyId: string) => {
    await deleteTechnology(technologyId);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse rounded-lg border border-gray-300 shadow-lg">
        <caption className="caption-top rounded-t-lg p-3 text-lg font-semibold text-gray-700">
          {title}
        </caption>
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Ring</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {technologies.map((technology) => (
            <tr
              key={technology.id}
              className="border border-gray-300 transition-colors hover:bg-gray-300"
            >
              <td className="px-4 py-2">{technology.name}</td>
              <td>{technology.category}</td>
              <td>{technology.ring}</td>
              <td className="px-4 py-2 text-center">
                <span
                  className={`rounded-full px-2 py-1 text-sm text-white ${
                    technology ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  public
                </span>
              </td>
              <td className="flex gap-x-3 px-4 py-2 text-center">
                <Link
                  href={'technologies/' + technology.id + '/edit'}
                  className="rounded bg-blue-500 px-3 text-white transition hover:bg-blue-600"
                >
                  edit
                </Link>

                <form action={async () => deleteTechnologyById(technology.id)}>
                  <button className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600">
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
