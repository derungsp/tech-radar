import { Technology } from '@prisma/client';
import Link from 'next/link';

export default function Table({
  title,
  technologies,
}: {
  title: string;
  technologies: Technology[];
}) {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse rounded-lg border border-gray-300 shadow-lg">
        <caption className="caption-top rounded-t-lg p-3 text-lg font-semibold text-gray-700">
          {title}
        </caption>
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Ring</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {technologies.map((item) => (
            <tr
              key={item.id}
              className="border border-gray-300 transition-colors hover:bg-gray-300"
            >
              <td className="px-4 py-2 text-center">{item.id}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td>{item.category}</td>
              <td>{item.ring}</td>
              <td className="px-4 py-2 text-center">
                <span
                  className={`rounded-full px-2 py-1 text-sm text-white ${
                    item ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  public
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <Link
                  href={'technologies/' + item.id + '/edit'}
                  className="rounded bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600"
                >
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
