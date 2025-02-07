import { Metadata } from 'next';
import LogList from '../../_components/logs/list';
import { fetchLogs } from '../../lib/data/log';
import Card from '@/app/_components/logs/card';

export const metadata: Metadata = {
  title: 'Logs',
};

export default async function Logs() {
  const logs = await fetchLogs();

  return (
    <main>
      {logs.length <= 0 ? (
        <tr>no logs existing</tr>
      ) : (
        <>
          <div className="my-5 hidden lg:block">
            <LogList logs={logs} />
          </div>

          <div className="lg:hidden">
            {logs.map((log) => (
              <Card log={log} key={log.id} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
