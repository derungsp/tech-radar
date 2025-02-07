import { fetchLogs } from '../../lib/data/log';
import { db } from '@/utils/db';

jest.mock('@/utils/db', () => ({
  db: {
    log: {
      findMany: jest.fn(),
    },
  },
}));

describe('fetchLogs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch logs successfully', async () => {
    const mockLogs = [
      { id: '1', message: 'Log 1', timestamp: new Date('2023-01-01T10:00:00Z') },
      { id: '2', message: 'Log 2', timestamp: new Date('2023-01-02T12:00:00Z') },
    ];

    (db.log.findMany as jest.Mock).mockResolvedValue(mockLogs);

    const result = await fetchLogs();

    expect(db.log.findMany).toHaveBeenCalledWith({
      orderBy: {
        timestamp: 'desc',
      },
    });
    expect(result).toEqual(mockLogs);
  });

  it('should handle database errors gracefully', async () => {
    (db.log.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(fetchLogs()).rejects.toThrow('Failed to fetch logs.');
    expect(db.log.findMany).toHaveBeenCalled();
  });
});
