import { createTechnology, updateTechnology, deleteTechnology } from '../../lib/actions/technology';
import { db } from '@/utils/db';
import { revalidatePath } from 'next/cache';

jest.mock('@/utils/db', () => ({
  db: {
    technology: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Technology CRUD operations', () => {
  const createFormData = (data: Record<string, string>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    return formData;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create technology successfully', async () => {
    const formData = createFormData({
      name: 'New Tech',
      techDescription: 'Some description',
      ringDescription: 'Optional ring description',
      ring: 'ADOPT',
      category: 'TOOLS',
      isDraft: 'false',
    });

    const result = await createTechnology({}, formData);

    expect(db.technology.create).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith('/admin/technologies');
    expect(result).toEqual({ message: 'Technology successfully created!', success: true });
  });

  it('should return validation errors for missing required fields', async () => {
    const formData = createFormData({
      name: '',
      techDescription: '',
      category: '',
      isDraft: 'false',
    });

    const result = await createTechnology({}, formData);

    expect(result.errors?.name).toBeDefined();
    expect(result.errors?.techDescription).toBeDefined();
    expect(result.errors?.category).toBeDefined();
    expect(result.message).toBe('Missing Fields. Failed to create technology.');
  });

  it('should handle database errors gracefully on creation', async () => {
    (db.technology.create as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const formData = createFormData({
      name: 'Valid Tech',
      techDescription: 'Valid description',
      ringDescription: 'Valid ring description',
      ring: 'ADOPT',
      category: 'TOOLS',
      isDraft: 'false',
    });

    const result = await createTechnology({}, formData);

    expect(result.message).toBe('Database Error: Failed to create technology.');
  });

  it('should update technology successfully', async () => {
    const formData = createFormData({
      name: 'Updated Tech',
      techDescription: 'Updated description',
      ring: 'TRIAL',
      category: 'LANGUAGES',
      isDraft: 'true',
    });

    const result = await updateTechnology('123', {}, formData);

    expect(db.technology.update).toHaveBeenCalledWith({
      where: { id: '123' },
      data: expect.objectContaining({
        name: 'Updated Tech',
        techDescription: 'Updated description',
        ring: 'TRIAL',
        category: 'LANGUAGES',
        isDraft: true,
      }),
    });
    expect(revalidatePath).toHaveBeenCalledWith('/admin/technologies');
    expect(result).toEqual({ message: 'Technology successfully edited!', success: true });
  });

  it('should return validation errors for missing fields during update', async () => {
    const formData = createFormData({
      name: '',
      techDescription: '',
      category: '',
      isDraft: 'false',
    });

    const result = await updateTechnology('123', {}, formData);

    expect(result.errors?.name).toBeDefined();
    expect(result.errors?.techDescription).toBeDefined();
    expect(result.errors?.category).toBeDefined();
    expect(result.message).toBe('Missing Fields. Failed to update technology.');
  });

  it('should handle database errors gracefully on update', async () => {
    (db.technology.update as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const formData = createFormData({
      name: 'Valid Tech Update',
      techDescription: 'Updated description',
      ring: 'HOLD',
      category: 'PLATFORMS',
      ringDescription: 'Valid ring description',
      isDraft: 'false',
    });

    const result = await updateTechnology('123', {}, formData);

    expect(result.message).toBe('Database Error: Failed to update technology.');
  });

  it('should delete technology successfully', async () => {
    const result = await deleteTechnology('123');

    expect(db.technology.delete).toHaveBeenCalledWith({ where: { id: '123' } });
    expect(revalidatePath).toHaveBeenCalledWith('/admin/technologies');
    expect(result).toEqual({ message: 'Technology successfully deleted!', success: true });
  });

  it('should handle database errors gracefully on deletion', async () => {
    (db.technology.delete as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const result = await deleteTechnology('123');

    expect(result.message).toBe('Database Error: Failed to delete technology.');
  });
});
