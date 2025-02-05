import TechRadar from './_components/tech-radar';
import { fetchAllTechnologies } from './lib/data/technology';

export default async function Home() {
  const technologies = await fetchAllTechnologies();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <TechRadar technologies={technologies} />
    </main>
  );
}
