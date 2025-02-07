import { db } from './db';

/**
 * Log activity to the database
 * @param message
 * @param level
 * @param source
 * @param user
 */
export async function logActivity({
  user,
  message,
  level = 'info',
  source = 'api',
}: {
  user?: string;
  message: string;
  level?: 'info' | 'error' | 'warn' | 'debug';
  source?: string;
}) {
  try {
    await db.log.create({
      data: {
        user,
        message,
        level,
        source,
      },
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}
