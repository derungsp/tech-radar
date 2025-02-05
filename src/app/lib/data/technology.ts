import { db } from '@/utils/db';

export async function fetchAllTechnologies() {
  try {
    return await db.technology.findMany();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch technologies.');
  }
}
