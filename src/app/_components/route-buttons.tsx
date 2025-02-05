'use client';

import Link from 'next/link';
import { Button } from './button';
import { UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export const RegisterPageButton = () => {
  return (
    <Link href="/register" as="/register">
      <Button className="my-3 border bg-white shadow-sm hover:bg-gray-200 focus-visible:outline-gray-600 active:bg-gray-200">
        <UserPlusIcon className="h-7 w-7" />
      </Button>
    </Link>
  );
};

export const LoginPageButton = () => {
  return (
    <Link href="/login" as="/login">
      <Button className="my-3 border bg-white shadow-sm hover:bg-gray-200 focus-visible:outline-gray-600 active:bg-gray-200">
        <UserIcon className="h-7 w-7" />
      </Button>
    </Link>
  );
};
