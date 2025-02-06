import { db } from '@/utils/db';

export async function fetchLogs() {
  try {
    const logs = await db.log.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });

    return logs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch logs.');
  }
}
