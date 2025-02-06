import LogList from '../../_components/logs/list';
import { fetchLogs } from '../../lib/data/log';

export default async function Logs() {
  const logs = await fetchLogs();

  return (
    <main>
      <LogList logs={logs} />
    </main>
  );
}
