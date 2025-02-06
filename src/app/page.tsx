import TechRadar from './_components/tech-radar';
import { fetchAllPublicTechnologies } from './lib/data/technology';

export default async function Home() {
  const technologies = await fetchAllPublicTechnologies();

  return (
    <main>
      <TechRadar technologies={technologies} />
    </main>
  );
}
