import {
  fetchAllTechnologies,
  fetchAllPublicTechnologies,
  fetchTechnologyById,
} from '../../lib/data/technology';
import { db } from '@/utils/db';

jest.mock('@/utils/db', () => ({
  db: {
    technology: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('Technology Fetch Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all technologies successfully', async () => {
    const mockTechnologies = [
      { id: '1', name: 'Tech 1', isDraft: false },
      { id: '2', name: 'Tech 2', isDraft: true },
    ];

    (db.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologies);

    const result = await fetchAllTechnologies();

    expect(db.technology.findMany).toHaveBeenCalledWith();
    expect(result).toEqual(mockTechnologies);
  });

  it('should handle database errors when fetching all technologies', async () => {
    (db.technology.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(fetchAllTechnologies()).rejects.toThrow('Failed to fetch all technologies.');
    expect(db.technology.findMany).toHaveBeenCalled();
  });

  it('should fetch all public technologies successfully', async () => {
    const mockPublicTechnologies = [
      { id: '1', name: 'Public Tech 1', isDraft: false },
      { id: '2', name: 'Public Tech 2', isDraft: false },
    ];

    (db.technology.findMany as jest.Mock).mockResolvedValue(mockPublicTechnologies);

    const result = await fetchAllPublicTechnologies();

    expect(db.technology.findMany).toHaveBeenCalledWith({ where: { isDraft: false } });
    expect(result).toEqual(mockPublicTechnologies);
  });

  it('should handle database errors when fetching public technologies', async () => {
    (db.technology.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(fetchAllPublicTechnologies()).rejects.toThrow(
      'Failed to fetch public technologies.',
    );
    expect(db.technology.findMany).toHaveBeenCalledWith({ where: { isDraft: false } });
  });

  it('should fetch a technology by ID successfully', async () => {
    const mockTechnology = { id: '1', name: 'Tech 1', isDraft: false };

    (db.technology.findUnique as jest.Mock).mockResolvedValue(mockTechnology);

    const result = await fetchTechnologyById('1');

    expect(db.technology.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(mockTechnology);
  });

  it('should handle database errors when fetching technology by ID', async () => {
    (db.technology.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(fetchTechnologyById('1')).rejects.toThrow('Failed to fetch technology.');
    expect(db.technology.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
