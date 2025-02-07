'use client';

import { Technology, UserRole } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/app/_components/button';
import { useFormStatus } from 'react-dom';
import { CheckIcon, ChevronDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useActionState, useEffect, useState } from 'react';
import { updateTechnology } from '@/app/lib/actions/technology';
import { Ring, TechnologyCategory } from '@prisma/client';
import clsx from 'clsx';
import { useAuth } from '@/context/auth-context';
import { redirect, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditForm({ technology }: { technology: Technology }) {
  const { user } = useAuth();
  const router = useRouter();

  if (user?.role !== UserRole.CTO && user?.role !== UserRole.TECHLEAD) {
    redirect('/');
  }

  const initialState = { message: '', errors: {} };
  const updateTechnologyById = updateTechnology.bind(null, technology.id);
  const [state, dispatch] = useActionState(updateTechnologyById, initialState);
  const { pending } = useFormStatus();

  const [selectedCategory, setSelectedCategory] = useState<TechnologyCategory | null>(
    technology.category,
  );
  const [selectedRing, setSelectedRing] = useState<Ring | null>(technology.ring);
  const [isDraft, setIsDraft] = useState(technology.isDraft);

  const handleSubmit = (formData: FormData) => {
    formData.set('isDraft', isDraft.toString());
    dispatch(formData);
  };

  useEffect(() => {
    if (state.message) {
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
        router.push('/admin/technologies');
        router.refresh();
      }
    }
  }, [state, router]);

  return (
    <form
      action={handleSubmit}
      className="flex w-full flex-col items-start justify-center gap-2 px-4"
    >
      <div className="flex w-full flex-col items-start justify-center gap-1">
        <label className="block text-xs font-medium text-neutral-950" htmlFor="title">
          Name
        </label>
        <input
          className="peer block w-full rounded-md border border-neutral-200 p-4 text-sm text-neutral-950 outline-2 placeholder:text-gray-500"
          id="name"
          name="name"
          placeholder="Name"
          defaultValue={technology.name}
        />
        <div id="name-error" aria-live="polite" className="h-4 text-xs text-red-500">
          {state.errors?.name && (
            <>
              {state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-1">
        <label className="block text-xs font-medium text-neutral-950" htmlFor="description">
          Technology Description
        </label>
        <textarea
          className="peer block w-full rounded-md border border-neutral-200 p-4 text-sm text-neutral-950 outline-2 placeholder:text-gray-500"
          id="techDescription"
          name="techDescription"
          placeholder="Technology Description"
          defaultValue={technology.techDescription}
        />
        <div id="ringDescription-error" aria-live="polite" className="h-4 text-xs text-red-500">
          {state.errors?.techDescription && (
            <>
              {state.errors.techDescription.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-1">
        <label className="block text-xs font-medium text-neutral-950" htmlFor="ring">
          Category
        </label>
        <CategorySelect
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <input type="hidden" name="category" value={selectedCategory ?? ''} />
        <div id="category-error" aria-live="polite" className="h-4 text-xs text-red-500">
          {state.errors?.category && (
            <>
              {state.errors.category.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-1">
        <label className="block text-xs font-medium text-neutral-950" htmlFor="ring">
          Ring
        </label>
        <RingSelect selectedRing={selectedRing} setSelectedRing={setSelectedRing} />
        <input type="hidden" name="ring" value={selectedRing ?? ''} />
        <div id="ring-error" aria-live="polite" className="h-4 text-xs text-red-500">
          {state.errors?.ring && (
            <>
              {state.errors.ring.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-1">
        <label className="block text-xs font-medium text-neutral-950" htmlFor="description">
          Ring Description
        </label>
        <textarea
          className="peer block w-full rounded-md border border-neutral-200 p-4 text-sm text-neutral-950 outline-2 placeholder:text-gray-500"
          id="ringDescription"
          name="ringDescription"
          placeholder="Ring Description"
          defaultValue={technology.ringDescription ?? ''}
        />
        <div id="ringDescription-error" aria-live="polite" className="h-4 text-xs text-red-500">
          {state.errors?.ringDescription && (
            <>
              {state.errors.ringDescription.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </>
          )}
        </div>
      </div>

      <input
        type="hidden"
        className="peer block rounded-md border border-neutral-200 p-2 text-neutral-950 outline-2"
        id="isDraft"
        name="isDraft"
        value={isDraft ? 'true' : 'false'}
      />

      <div aria-live="polite" className="flex h-8 items-center gap-1 text-sm text-red-500">
        {!state.success && state.message && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p>{state.message}</p>
          </>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            aria-disabled={pending}
            className={
              'border bg-neutral-900 px-4 py-2 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline-neutral-500 active:bg-neutral-600'
            }
            onClick={() => {
              setIsDraft(false);
            }}
          >
            {!technology.isDraft ? 'Edit' : 'Edit and publish'}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-disabled={pending}
            className={
              'border bg-gray-100 px-4 py-2 text-neutral-950 shadow-sm hover:bg-neutral-900 hover:text-white focus-visible:outline-neutral-500 active:bg-neutral-600'
            }
            onClick={() => {
              setIsDraft(true);
            }}
          >
            {technology.isDraft ? 'Edit draft' : 'Edit and save as draft'}
          </Button>

          <Link
            href={`/admin/technologies`}
            className="h-10 rounded-lg border bg-white px-4 py-2 text-neutral-950 shadow-sm hover:bg-neutral-900 hover:text-white focus-visible:outline-neutral-500 active:bg-neutral-600"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}

function CategorySelect({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: TechnologyCategory | null;
  setSelectedCategory: (category: TechnologyCategory) => void;
}) {
  const categories = Object.values(TechnologyCategory);

  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      <ListboxButton
        className={clsx(
          'relative block rounded-lg border border-black py-1.5 pl-3 pr-8 text-left text-sm',
          'focus:outline-none focus:ring-2 focus:ring-white',
        )}
      >
        {selectedCategory || 'Select a category'}
        <ChevronDownIcon className="absolute right-2.5 top-2 h-5 w-5" aria-hidden="true" />
      </ListboxButton>

      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'rounded-xl border border-black bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
        )}
      >
        {categories.map((category) => (
          <ListboxOption
            id="category"
            key={category}
            value={category}
            className={({ selected }) =>
              clsx('cursor-pointer select-none px-5 py-2', selected ? 'font-semibold' : '')
            }
          >
            {({ selected }) => (
              <>
                {selected && <CheckIcon className="absolute left-2 h-5 w-5 text-white" />}
                {category}
              </>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

function RingSelect({
  selectedRing,
  setSelectedRing,
}: {
  selectedRing: Ring | null;
  setSelectedRing: (ring: Ring) => void;
}) {
  const rings = Object.values(Ring);

  return (
    <Listbox value={selectedRing} onChange={setSelectedRing}>
      <ListboxButton
        className={clsx(
          'relative block rounded-lg border border-black py-1.5 pl-3 pr-8 text-left text-sm',
          'focus:outline-none focus:ring-2 focus:ring-white',
        )}
      >
        {selectedRing || 'Select a ring'}
        <ChevronDownIcon className="absolute right-2.5 top-2 h-5 w-5" aria-hidden="true" />
      </ListboxButton>

      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'rounded-xl border border-black bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
        )}
      >
        {rings.map((ring) => (
          <ListboxOption
            id="ring"
            key={ring}
            value={ring}
            className={({ selected }) =>
              clsx('cursor-pointer select-none px-5 py-2', selected ? 'font-semibold' : '')
            }
          >
            {({ selected }) => (
              <>
                {selected && <CheckIcon className="absolute left-2 h-5 w-5 text-white" />}
                {ring}
              </>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
