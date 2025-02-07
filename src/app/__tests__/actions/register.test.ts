import { register } from '../../lib/actions/register';
import { db } from '@/utils/db';
import bcrypt from 'bcrypt';

jest.mock('@/utils/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedPassword'),
}));

describe('register', () => {
  const createFormData = (data: Record<string, string>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    return formData;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);

    const formData = createFormData({
      email: 'test@example.com',
      password: 'Password123!',
      firstname: 'John',
      lastname: 'Doe',
    });

    const result = await register({}, formData);

    expect(db.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.hash).toHaveBeenCalledWith('Password123!', 10);
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        email: 'test@example.com',
        password: 'hashedPassword',
        firstname: 'John',
        lastname: 'Doe',
      },
    });
    expect(result.message).toBe('User created successfully.');
  });

  it('should return an error if the user already exists', async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValue({ id: '1', email: 'test@example.com' });

    const formData = createFormData({
      email: 'test@example.com',
      password: 'Password123!',
      firstname: 'John',
      lastname: 'Doe',
    });

    const result = await register({}, formData);

    expect(result.errors?.email).toEqual(['User already exists.']);
    expect(result.message).toBe('User already exists.');
  });

  it('should return validation errors for invalid data', async () => {
    const formData = createFormData({
      email: 'invalid-email',
      password: 'short',
      firstname: 'Jo',
      lastname: 'D',
    });

    const result = await register({}, formData);

    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.password).toBeDefined();
    expect(result.errors?.firstname).toBeDefined();
    expect(result.errors?.lastname).toBeDefined();
    expect(result.message).toBe('Missing Fields. Failed to Register User.');
  });

  it('should handle database errors gracefully', async () => {
    (db.user.findUnique as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const formData = createFormData({
      email: 'test@example.com',
      password: 'Password123!',
      firstname: 'John',
      lastname: 'Doe',
    });

    const result = await register({}, formData);

    expect(result.message).toBe('Database Error: Failed to Register User.');
  });
});
