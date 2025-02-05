import TableOverView from '../_components/technologies/table-overview';

import { fetchAllTechnologies } from '../lib/data/technology';

export default async function Technologies() {
  const technologies = await fetchAllTechnologies();

  return (
    <main>
      <TableOverView technologies={technologies} />
    </main>
  );
}
