import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === '/') {
        if (token) {
          return true;
        }
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/api/auth/signin', '/'],
};
