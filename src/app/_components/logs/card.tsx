'use client';

import { useAuth } from '@/context/auth-context';
import { Log, UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';

export default function Card({ log }: { log: Log }) {
  const { user } = useAuth();

  if (user?.role !== UserRole.CTO && user?.role !== UserRole.TECHLEAD) {
    redirect('/');
  }

  return (
    <div className="my-5 w-full rounded-lg border p-2 shadow-sm">
      <div className="p-4">
        <h3 className="py-1 text-sm font-medium">{log.timestamp.toISOString()}</h3>
        <h3 className="py-1 text-sm font-medium">{log.user}</h3>
        <h3 className="py-1 text-sm font-medium">{log.message}</h3>
      </div>
    </div>
  );
}
