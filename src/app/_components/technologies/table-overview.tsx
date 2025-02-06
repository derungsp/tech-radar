'use client';

import Table from './table';
import { Technology, UserRole } from '@prisma/client';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';

export default function TableOverView({ technologies }: { technologies: Technology[] }) {
  const { user } = useAuth();

  if (user?.role !== UserRole.CTO && user?.role !== UserRole.TECHLEAD) {
    redirect('/');
  }

  return (
    <div className="grid lg:grid-cols-2">
      <Table
        title="PLATFORMS"
        technologies={technologies.filter((i) => i.category === 'PLATFORMS')}
      />
      <Table
        title="LANGUAGES"
        technologies={technologies.filter((i) => i.category === 'LANGUAGES')}
      />
      <Table title="TOOLS" technologies={technologies.filter((i) => i.category === 'TOOLS')} />
      <Table
        title="TECHNIQUES"
        technologies={technologies.filter((i) => i.category === 'TECHNIQUES')}
      />
    </div>
  );
}
