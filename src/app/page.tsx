import TechRadar from './_components/tech-radar';
import { fetchAllTechnologies } from './lib/data/technology';

export default async function Home() {
  const technologies = await fetchAllTechnologies();

  return (
    <main>
      <TechRadar technologies={technologies} />
    </main>
  );
}
