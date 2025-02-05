'use server';

import { db } from '@/utils/db';
import z from 'zod';
import bcrypt from 'bcrypt';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long.',
    })
    .max(64, 'Password must be at most 64 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  firstname: z.string().min(3, {
    message: 'First name must be at least 3 characters long.',
  }),
  lastname: z.string().min(3, {
    message: 'Last name must be at least 3 characters long.',
  }),
});

const Register = UserSchema.omit({
  id: true,
});

export async function register(prevState: State, formData: FormData) {
  const validatedFields = Register.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register User.',
    };
  }

  const { email, password, firstname, lastname } = validatedFields.data;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        errors: {
          email: ['User already exists.'],
        },
        message: 'User already exists.',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstname,
        lastname,
      },
    });

    return {
      message: 'User created successfully.',
    };
  } catch {
    return { message: 'Database Error: Failed to Register User.' };
  }
}

// Error State
type State = {
  errors?: {
    email?: string[];
    password?: string[];
    firstname?: string[];
    lastname?: string[];
  };
  message?: string;
};
