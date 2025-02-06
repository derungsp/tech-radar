'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Log, UserRole } from '@prisma/client';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';

export default function LogList({ logs }: { logs: Log[] }) {
  const { user } = useAuth();

  if (user?.role !== UserRole.CTO && user?.role !== UserRole.TECHLEAD) {
    redirect('/');
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="w-full rounded-lg border border-neutral-200 bg-white p-5 py-3 shadow-sm">
        <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-8 shadow-sm hover:border-neutral-400">
          <MagnifyingGlassIcon className="h-5 w-5 text-neutral-700" />
          <p className="select-none">No logs existing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-md border border-neutral-200 bg-white p-2.5">
      <Accordion
        className="w-full rounded-md bg-white shadow-sm hover:border-neutral-400"
        type="single"
        collapsible
      >
        {logs.map((log) => (
          <AccordionItem
            value={log.id}
            key={log.id}
            className="border border-neutral-200 first:rounded-t-md last:rounded-b-md hover:border-neutral-400 hover:bg-neutral-50 data-[state=open]:hover:bg-neutral-100"
          >
            <AccordionTrigger className="flex w-full border-neutral-200 px-2">
              <div className="flex w-full items-center justify-between gap-8 text-left text-xs font-semibold">
                <span className="flex-1 text-xs">{log.message}</span>
                <span className="flex-1 text-xs">{log.level}</span>
                <span className="flex-1 text-xs">{log.source}</span>
                <span className="flex-1 text-xs">{log.timestamp.toUTCString()}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col bg-neutral-50 p-2">
              <div className="flex items-center justify-between gap-8 text-xs font-semibold">
                <span className="flex-1">Message</span>
                <span className="flex-1">Level</span>
                <span className="flex-1">Source</span>
                <span className="flex-1">Timestamp</span>
              </div>
              <div className="flex items-start justify-between gap-8 text-sm">
                <span className="flex-1">{log.message}</span>
                <span className="flex-1">{log.level}</span>
                <span className="flex-1">{log.source}</span>
                <span className="flex-1">{log.timestamp.toUTCString()}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
