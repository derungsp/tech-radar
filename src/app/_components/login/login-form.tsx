'use client';

import { useFormStatus } from 'react-dom';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import { signIn } from 'next-auth/react';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function SearchParamsHandler({ setCallbackUrl }: { setCallbackUrl: (url: string | null) => void }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    setCallbackUrl(callbackUrl);
  }, [callbackUrl, setCallbackUrl]);

  return null;
}

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);

  const authenticate = async (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const signinPromise = signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      toast.promise(signinPromise, {
        loading: 'Login...',
        success: (data: any) => {
          if (data?.error) {
            setError('CredentialsSignin');
            throw new Error('Invalid credentials');
          } else {
            router.push(callbackUrl || '/');
            router.refresh();
            return 'Logged in!';
          }
        },
        error: 'Error while login',
      });
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <form action={authenticate} className="w-full space-y-3 px-10">
      <h1 className="mb-3 text-2xl text-neutral-900">Please login</h1>

      <Suspense fallback={<div>Loading search parameter...</div>}>
        <SearchParamsHandler setCallbackUrl={setCallbackUrl} />
      </Suspense>

      <div className="w-full">
        <div>
          <label className="mb-3 mt-5 block text-xs font-medium text-neutral-900" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Please enter your email address"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-700" />
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-neutral-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Please enter your password"
              required
              minLength={8}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-700" />
          </div>
        </div>
      </div>
      <LoginButton />
      <div className="flex h-8 items-start space-x-1">
        {error === 'CredentialsSignin' && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p aria-live="polite" className="text-sm text-red-500">
              Invalid credentials
            </p>
          </>
        )}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full bg-neutral-900 text-neutral-50 hover:bg-neutral-700 focus-visible:outline-neutral-500 active:bg-neutral-600"
      aria-disabled={pending}
    >
      Login
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
