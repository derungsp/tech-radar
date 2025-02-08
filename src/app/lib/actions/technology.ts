'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { db } from '@/utils/db';
import { Ring, TechnologyCategory } from '@prisma/client';

const booleanFromString = z.preprocess((val) => val === 'true', z.boolean());

const TechnologySchema = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  publishedAt: z.date().optional().nullable(),
  techDescription: z.string().nonempty(),
  ringDescription: z.string().nullable().optional(),
  ring: z.preprocess((val) => (val === '' ? null : val), z.nativeEnum(Ring).nullable().optional()),
  category: z.preprocess(
    (val) => (val === '' ? null : val),
    z.nativeEnum(TechnologyCategory).nullable(),
  ),
  isDraft: booleanFromString,
});

const ConditionalTechnologySchema = TechnologySchema.omit({
  id: true,
}).superRefine((data, ctx) => {
  if (!data.category) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['category'],
      message: 'Category is required.',
    });
  }

  if (!data.isDraft) {
    if (!data.ring) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ring'],
        message: 'Ring is required for published technologies.',
      });
    }

    if (!data.ringDescription || data.ringDescription.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ringDescription'],
        message: 'Ring description is required for published technologies.',
      });
    }
  }
});

export async function createTechnology(prevState: State, formData: FormData) {
  const validatedFields = ConditionalTechnologySchema.safeParse({
    name: formData.get('name'),
    techDescription: formData.get('techDescription'),
    ringDescription: formData.get('ringDescription'),
    ring: formData.get('ring'),
    category: formData.get('category'),
    publishedAt: formData.get('publishedAt')
      ? new Date(formData.get('publishedAt') as string)
      : null,
    isDraft: formData.get('isDraft'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create technology.',
    };
  }

  const { name, techDescription, ringDescription, ring, category, isDraft } = validatedFields.data;

  let { publishedAt } = validatedFields.data;

  if (!isDraft && !publishedAt) {
    publishedAt = new Date();
  }

  try {
    await db.technology.create({
      data: {
        name,
        techDescription,
        ringDescription,
        ring,
        category,
        publishedAt,
        isDraft,
      },
    });
  } catch {
    return { message: 'Database Error: Failed to create technology.' };
  }

  revalidatePath('/admin/technologies');
  return { message: 'Technology successfully created!', success: true };
}

export async function updateTechnology(id: string, prevState: State, formData: FormData) {
  const validatedFields = ConditionalTechnologySchema.safeParse({
    name: formData.get('name'),
    techDescription: formData.get('techDescription'),
    ringDescription: formData.get('ringDescription'),
    ring: formData.get('ring'),
    category: formData.get('category'),
    publishedAt: formData.get('publishedAt')
      ? new Date(formData.get('publishedAt') as string)
      : null,
    isDraft: formData.get('isDraft'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update technology.',
    };
  }

  const { name, techDescription, ringDescription, ring, category, isDraft } = validatedFields.data;

  let { publishedAt } = validatedFields.data;

  if (!isDraft && !publishedAt) {
    publishedAt = new Date();
  }

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
        isDraft,
      },
    });
  } catch {
    return { message: 'Database Error: Failed to update technology.' };
  }

  revalidatePath('/admin/technologies');
  return { message: 'Technology successfully edited!', success: true };
}

export async function deleteTechnology(id: string) {
  try {
    await db.technology.delete({ where: { id } });
  } catch {
    return { message: 'Database Error: Failed to delete technology.' };
  }

  revalidatePath('/admin/technologies');

  return { message: 'Technology successfully deleted!', success: true };
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
