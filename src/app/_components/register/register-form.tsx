'use client';

import { useFormStatus } from 'react-dom';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import { register } from '@/app/lib/actions/register';
import clsx from 'clsx';
import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(register, initialState);

  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (state.message) {
      if (!state.errors) {
        toast.success(state.message);

        setTimeout(() => {
          const email = formData.email;
          const password = formData.password;

          const signinPromise = signIn('credentials', {
            email,
            password,
            redirect: false,
          });

          toast.promise(signinPromise, {
            loading: 'Login...',
            success: (data: any) => {
              if (data?.error) {
                throw new Error('Something went wrong! Please try again');
              } else {
                router.push('/');
                router.refresh();
                return 'Logged in!';
              }
            },
            error: 'Error while login',
          });

          signIn('credentials', {
            email,
            password,
            redirect: false,
          });
        }, 2000);
      } else {
        toast.error(state.message);
      }
    }
  }, [state.message, state.errors, router, formData]);

  return (
    <form action={dispatch} className="w-full space-y-3 px-10">
      <h1 className="mb-3 text-2xl text-neutral-900">Please register</h1>

      <div className="w-full">
        <div className="flex flex-col gap-1">
          <label className="block text-xs font-medium text-neutral-900" htmlFor="firstname">
            First Name
          </label>
          <div className="relative">
            <input
              className={clsx(
                'peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500',
                { 'border-red-500': state.errors?.firstname },
                { 'border-gray-200': !state.errors?.firstname },
              )}
              id="firstname"
              name="firstname"
              placeholder="Enter your first name"
              required
              minLength={3}
              value={formData.firstname}
              onChange={handleChange}
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-700" />
          </div>
          <div id="firstname-error" aria-live="polite" className="h-4 text-xs text-red-500">
            {state.errors?.firstname && (
              <>
                {state.errors.firstname.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-xs font-medium text-neutral-900" htmlFor="lastname">
            Last Name
          </label>
          <div className="relative">
            <input
              className={clsx(
                'peer block w-full rounded-md border py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500',
                { 'border-red-500': state.errors?.lastname },
                { 'border-gray-200': !state.errors?.lastname },
              )}
              id="lastname"
              name="lastname"
              placeholder="Enter your last name"
              required
              minLength={3}
              value={formData.lastname}
              onChange={handleChange}
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-700" />
          </div>
          <div id="lastname-error" aria-live="polite" className="h-4 text-xs text-red-500">
            {state.errors?.lastname && (
              <>
                {state.errors.lastname.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-xs font-medium text-neutral-900" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className={clsx(
                'peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500',
                { 'border-red-500': state.errors?.email },
                { 'border-gray-200': !state.errors?.email },
              )}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-700" />
          </div>
          <div id="email-error" aria-live="polite" className="h-4 text-xs text-red-500">
            {state.errors?.email && (
              <>
                {state.errors.email.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-xs font-medium text-neutral-900" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className={clsx(
                'peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500',
                { 'border-red-500': state.errors?.password },
                { 'border-gray-200': !state.errors?.password },
              )}
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-700" />
          </div>
          <div id="password-error" aria-live="polite" className="mb-5 text-xs text-red-500">
            {state.errors?.password && (
              <>
                {state.errors.password.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </>
            )}
          </div>
        </div>
        <RegisterButton />
        <div className="flex h-8 items-center space-x-1 py-5">
          {state.message && state.errors && (
            <>
              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
          {state.message && !state.errors && (
            <>
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
              <p className="text-sm text-green-500">{state.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  useEffect(() => {
    let toastId;
    if (pending) {
      toastId = toast.loading('Registering...');
    } else {
      toast.dismiss(toastId);
    }
  });

  return (
    <Button
      className="w-full bg-neutral-900 text-neutral-50 hover:bg-neutral-700 focus-visible:outline-neutral-500 active:bg-neutral-600"
      aria-disabled={pending}
    >
      Register
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
