import { getServerSession, type NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import z from 'zod';
import bcrypt from 'bcrypt';

import { db } from '@/utils/db';
import { env } from '@/env.mjs';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import { logActivity } from './logger';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      role: UserRole;
      // ...other properties
    };
  }

  interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: UserRole;
    // ...other properties
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: UserRole;
    // ...other properties
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.role = user.role;
      }

      return Promise.resolve(token);
    },
    session: ({ session, token }) => {
      session.user.id = token.id;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
      session.user.email = token.email;
      session.user.role = token.role;

      return Promise.resolve(session);
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    /**
     * ...add more providers here.
     *
     * Discord provider requires less work than most providers.
     * For example, the GitHub provider requires you to add
     * the `refresh_token_expires_in` field to the Account model.
     * Refer to the NextAuth.js docs for the provider you want to use.
     *
     * @see https://next-auth.js.org/providers
     */

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            await logActivity({
              user: user.email,
              message: 'User logged in successfully',
            });

            return user;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (user) {
      return user;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
