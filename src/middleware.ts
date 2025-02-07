import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    if (!req.nextauth.token) {
      if (pathname !== '/' && pathname !== '/api/auth/signin') {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ['/'],
};
