'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/app/lib/cn';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.className = isOpen ? 'overflow-hidden' : '';
    return () => {
      document.body.className = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed z-50 flex w-full flex-col bg-white shadow-sm">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative flex h-14 w-64 items-center justify-center">
          <h1 className="text-2xl">TechRadar</h1>
        </Link>

        <nav className="hidden gap-8 lg:flex lg:justify-evenly">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'hover:text-primary',
                pathname === href ? 'text-primary font-semibold' : 'text-gray-900',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
}

const MobileMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.2,
              delay: 0.2,
            },
          }}
          transition={{
            duration: 0.2,
            delay: 0.2,
          }}
          className={
            'absolute inset-0 top-[80px] z-30 flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-1 border-t-[1px] bg-white text-center uppercase'
          }
        >
          <div className="flex flex-col items-center space-y-20 text-xl lg:hidden">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                onClick={() => {
                  setIsOpen(false);
                  router.push(href);
                }}
                href={href}
                className={cn(
                  'hover:text-primary',
                  pathname === href ? 'text-primary font-semibold' : 'text-gray-900',
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const HamburgerButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <button
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="relative block items-center justify-center p-2 lg:hidden"
    >
      {isOpen ? (
        <svg width="40" height="40" viewBox="0 0 23 18" className="stroke-black transition-colors">
          <motion.path
            d="M 2 2.5 L 20 2.5"
            className="top"
            animate={{
              d: 'M 3 16.5 L 17 2.5',
            }}
          />
          <motion.path
            d="M 1 9.423 L 22 9.423"
            animate={{
              opacity: 0,
            }}
            className="middle"
          />
          <motion.path
            d="M 4 16.346 L 20 16.346"
            className="bottom"
            animate={{
              d: 'M 3 2.5 L 17 16.346',
            }}
          />
        </svg>
      ) : (
        <svg width="40" height="40" viewBox="0 0 23 18" className="stroke-black transition-colors">
          <motion.path
            d="M 2 2.5 L 20 2.5"
            className="top"
            animate={{
              d: 'M 4 2.5 L 22 2.5',
            }}
          />
          <motion.path
            d="M 1 9.423 L 22 9.423"
            animate={{
              opacity: 1,
            }}
            className="middle"
          />
          <motion.path
            d="M 4 16.346 L 20 16.346"
            className="bottom"
            animate={{
              d: 'M 4 16.346 L 22 16.346',
            }}
          />
        </svg>
      )}
    </button>
  );
};

export const links = [{ href: '/', label: 'Home' }];
