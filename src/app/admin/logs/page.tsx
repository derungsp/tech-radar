import { Metadata } from 'next';
import LogList from '../../_components/logs/list';
import { fetchLogs } from '../../lib/data/log';

export const metadata: Metadata = {
  title: 'Logs',
};

export default async function Logs() {
  const logs = await fetchLogs();

  return (
    <main>
      <LogList logs={logs} />
    </main>
  );
}
