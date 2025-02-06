'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LogoutLink } from '../login-link';
import { useAuth } from '@/context/auth-context';
import clsx from 'clsx';
import { UserRole } from '@prisma/client';

export default function Header() {
  const { user } = useAuth();

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.className = isOpen ? 'overflow-hidden' : '';
    return () => {
      document.body.className = '';
    };
  }, [isOpen]);

  return (
    <header className="z-50 flex w-full flex-col bg-white shadow-sm">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative flex h-14 items-center justify-center">
          <h1 className="text-2xl">TechRadar</h1>
        </Link>

        <nav className="hidden gap-8 lg:flex lg:justify-evenly">
          <Link
            href={'/'}
            className={clsx(
              'hover:text-primary',
              pathname === '/' ? 'text-primary font-semibold' : 'text-gray-900',
            )}
          >
            Home
          </Link>

          {user?.role === UserRole.CTO || user?.role === UserRole.TECHLEAD ? (
            <>
              <Link
                href={'/admin/technologies'}
                className={clsx(
                  'hover:text-primary',
                  pathname === '/admin/technologies'
                    ? 'text-primary font-semibold'
                    : 'text-gray-900',
                )}
              >
                Technologies
              </Link>
              <Link
                href={'/admin/logs'}
                className={clsx(
                  'hover:text-primary',
                  pathname === '/admin/logs' ? 'text-primary font-semibold' : 'text-gray-900',
                )}
              >
                Logs
              </Link>
            </>
          ) : (
            <></>
          )}

          {user ? (
            <>
              <p>Welcome {user ? user.firstname + ' ' + user.lastname : ''}</p>
              <LogoutLink />
            </>
          ) : (
            <></>
          )}
        </nav>

        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
}

const MobileMenu = ({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: UserRole;
  } | null;
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
            <Link
              onClick={() => {
                setIsOpen(false);
                router.push('/');
              }}
              href={'/'}
              className={clsx(
                'hover:text-primary',
                pathname === '/' ? 'text-primary font-semibold' : 'text-gray-900',
              )}
            >
              Home
            </Link>

            {user?.role === UserRole.CTO || user?.role === UserRole.TECHLEAD ? (
              <>
                <Link
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/admin/technologies');
                  }}
                  href={'/admin/technologies'}
                  className={clsx(
                    'hover:text-primary',
                    pathname === '/admin/technologies'
                      ? 'text-primary font-semibold'
                      : 'text-gray-900',
                  )}
                >
                  Technologies
                </Link>
                <Link
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/admin/logs');
                  }}
                  href={'/admin/logs'}
                  className={clsx(
                    'hover:text-primary',
                    pathname === '/admin/logs' ? 'text-primary font-semibold' : 'text-gray-900',
                  )}
                >
                  Logs
                </Link>
              </>
            ) : (
              <></>
            )}

            <LogoutLink />
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
