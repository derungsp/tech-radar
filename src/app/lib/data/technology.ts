import { db } from '@/utils/db';

export async function fetchAllTechnologies() {
  try {
    return await db.technology.findMany();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch technologies.');
  }
}

export async function fetchTechnologyById(id: string) {
  try {
    return await db.technology.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch technology.');
  }
}
