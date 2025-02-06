import { db } from '@/utils/db';

export async function fetchAllTechnologies() {
  try {
    return await db.technology.findMany();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all technologies.');
  }
}

export async function fetchAllPublicTechnologies() {
  try {
    return await db.technology.findMany({ where: { isDraft: false } });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch public technologies.');
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
