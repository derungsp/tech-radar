'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/utils/db';
import { Ring, TechnologyCategory } from '@prisma/client';

const TechnologySchema = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  publishedAt: z.date(),
  techDescription: z.string().nonempty(),
  ringDescription: z.string().nonempty(),
  ring: z.nativeEnum(Ring),
  category: z.nativeEnum(TechnologyCategory),
});

const CreateTechnology = TechnologySchema.omit({
  id: true,
});

const CreateTechnologyDraft = TechnologySchema.omit({
  id: true,
}).extend({
  ring: z.nativeEnum(Ring).nullable(),
  ringDescription: z.string().nullable(),
});

const UpdateTechnology = TechnologySchema.omit({
  id: true,
});

const UpdateTechnologyDraft = TechnologySchema.omit({
  id: true,
}).extend({
  ring: z.nativeEnum(Ring).nullable(),
  ringDescription: z.string().nullable(),
});

export async function createTechnology(prevState: State, formData: FormData) {
  const validatedFields = CreateTechnology.safeParse({
    name: formData.get('name'),
    techDescription: formData.get('techDescription'),
    ringDescription: formData.get('ringDescription'),
    ring: formData.get('ring'),
    category: formData.get('category'),
    publishedAt: formData.get('publishedAt')
      ? new Date(formData.get('publishedAt') as string)
      : null,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create technology.',
    };
  }

  const { name, techDescription, ringDescription, ring, category, publishedAt } =
    validatedFields.data;

  try {
    await db.technology.create({
      data: {
        name,
        techDescription,
        ringDescription,
        ring,
        category,
        publishedAt,
      },
    });
  } catch {
    return { message: 'Database Error: Failed to create technology.' };
  }

  revalidatePath('/technologies');
  redirect('/technologies');
}

export async function createTechnologyDraft(prevState: State, formData: FormData) {
  const validatedFields = CreateTechnologyDraft.safeParse({
    name: formData.get('name'),
    techDescription: formData.get('techDescription'),
    ringDescription: formData.get('ringDescription'),
    ring: formData.get('ring'),
    category: formData.get('category'),
    publishedAt: formData.get('publishedAt')
      ? new Date(formData.get('publishedAt') as string)
      : null,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create technology draft.',
    };
  }

  const { name, techDescription, ringDescription, ring, category, publishedAt } =
    validatedFields.data;

  try {
    await db.technology.create({
      data: {
        name,
        techDescription,
        ringDescription,
        ring,
        category,
        publishedAt,
      },
    });
  } catch {
    return { message: 'Database Error: Failed to create technology draft.' };
  }

  revalidatePath('/technologies');
  redirect('/technologies');
}

export async function updateTechnology(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateTechnology.safeParse({
    name: formData.get('name'),
    techDescription: formData.get('techDescription'),
    ringDescription: formData.get('ringDescription'),
    ring: formData.get('ring'),
    category: formData.get('category'),
    publishedAt: formData.get('publishedAt')
      ? new Date(formData.get('publishedAt') as string)
      : null,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update technology.',
    };
  }

  const { name, techDescription, ringDescription, ring, category, publishedAt } =
    validatedFields.data;

  try {
    await db.technology.update({
      where: { id },
      data: {
        name,
        techDescription,
        ringDescription,
        ring,
        category,
        publishedAt,
      },
    });
  } catch {
    return { message: 'Database Error: Failed to update technology.' };
  }

  revalidatePath('/technologies');
  redirect('/technologies');
}

export async function updateTechnologyDraft(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateTechnologyDraft.safeParse({
    name: formData.get('name'),
    techDescription: formData.get('techDescription'),
    ringDescription: formData.get('ringDescription'),
    ring: formData.get('ring'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update technology draft.',
    };
  }

  const { name, techDescription, ringDescription, ring, category } = validatedFields.data;

  try {
    await db.technology.update({
      where: { id },
      data: {
        name,
        techDescription,
        ringDescription,
        ring,
        category,
      },
    });
  } catch {
    return { message: 'Database Error: Failed to update technology draft.' };
  }

  revalidatePath('/technologies');
  redirect('/technologies');
}

export async function deleteTechnology(id: string) {
  try {
    await db.technology.delete({ where: { id } });
  } catch {
    return { message: 'Database Error: Failed to delete technology.' };
  }

  revalidatePath('/technologies');
  redirect('/technologies');
}

// Error State
export type State = {
  errors?: {
    name?: string[];
    techDescription?: string[];
    ringDescription?: string[];
    ring?: string[];
    category?: string[];
  };
  message?: string;
};
