'use client';

import Link from 'next/link';
import { Button } from './button';
import { PauseCircleIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export const RegisterPageButton = () => {
  return (
    <Link href="/register" as="/register">
      <Button className="border bg-white shadow-sm hover:bg-gray-200 focus-visible:outline-gray-600 active:bg-gray-200">
        <UserPlusIcon className="h-7 w-7" />
      </Button>
    </Link>
  );
};

export const LoginPageButton = () => {
  return (
    <Link href="/login" as="/login">
      <Button className="border bg-white shadow-sm hover:bg-gray-200 focus-visible:outline-gray-600 active:bg-gray-200">
        <UserIcon className="h-7 w-7" />
      </Button>
    </Link>
  );
};

export const LogoutButton = () => {
  const { pending } = useFormStatus();

  const router = useRouter();

  const logout = async () => {
    toast.promise(
      (async () => {
        await signOut({ redirect: false });
        router.push('/');
        router.refresh();
        return 'Logged out successfully!';
      })(),
      {
        loading: 'Logging out...',
        success: 'Logged out successfully!',
        error: 'Error while logging out',
      },
    );
  };

  return (
    <form action={logout}>
      <Button
        className="border bg-white px-4 py-2 shadow-sm hover:bg-gray-200 focus-visible:outline-gray-600 active:bg-gray-200"
        aria-disabled={pending}
      >
        <PauseCircleIcon className="h-7 w-7" />
      </Button>
    </form>
  );
};
