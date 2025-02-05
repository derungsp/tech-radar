'use client';

import { createContext, useContext } from 'react';
import { Session } from 'next-auth';

interface AuthContextType {
  user: Session['user'] | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  user,
  children,
}: {
  user: Session['user'] | null;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
