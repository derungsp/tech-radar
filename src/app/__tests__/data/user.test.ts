import { fetchUserById } from '../../lib/data/user';
import { db } from '@/utils/db';

jest.mock('@/utils/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe('fetchUserById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch a user by ID successfully', async () => {
    const mockUser = {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
    };

    (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await fetchUserById('1');

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
      },
    });
    expect(result).toEqual(mockUser);
  });

  it('should return null if user is not found', async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await fetchUserById('non-existing-id');

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'non-existing-id' },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
      },
    });
    expect(result).toBeNull();
  });

  it('should handle database errors gracefully', async () => {
    (db.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(fetchUserById('1')).rejects.toThrow('Failed to fetch user.');
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
      },
    });
  });
});
