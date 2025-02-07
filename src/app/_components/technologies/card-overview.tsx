'use client';

import { Technology, UserRole } from '@prisma/client';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';
import Card from './card';

export default function CardOverView({ technologies }: { technologies: Technology[] }) {
  const { user } = useAuth();

  if (user?.role !== UserRole.CTO && user?.role !== UserRole.TECHLEAD) {
    redirect('/');
  }

  return (
    <div className="grid gap-2 py-2">
      <p className="rounded-t-lg py-3 text-left text-lg font-semibold text-gray-700">PLATFORMS</p>

      {technologies.length <= 0 ? <p>no technologies existing</p> : <></>}

      {technologies
        .filter((i) => i.category === 'PLATFORMS')
        .map((technology) => (
          <Card key={technology.id} technology={technology} />
        ))}

      <p className="rounded-t-lg py-3 text-left text-lg font-semibold text-gray-700">LANGUAGES</p>
      {technologies
        .filter((i) => i.category === 'LANGUAGES')
        .map((technology) => (
          <Card key={technology.id} technology={technology} />
        ))}

      <p className="rounded-t-lg py-3 text-left text-lg font-semibold text-gray-700">TOOLS</p>
      {technologies
        .filter((i) => i.category === 'TOOLS')
        .map((technology) => (
          <Card key={technology.id} technology={technology} />
        ))}

      <p className="rounded-t-lg py-3 text-left text-lg font-semibold text-gray-700">TECHNIQUES</p>
      {technologies
        .filter((i) => i.category === 'TECHNIQUES')
        .map((technology) => (
          <Card key={technology.id} technology={technology} />
        ))}
    </div>
  );
}
