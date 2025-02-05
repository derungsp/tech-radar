import { Metadata } from 'next';
import LoginForm from '../_components/login/login-form';
import { RegisterPageButton } from '../_components/route-buttons';
import { getServerAuthSession } from '@/utils/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session) {
    redirect('/technologies');
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div>
        <RegisterPageButton />
        <div className="flex flex-col items-center justify-center gap-8 rounded-lg border bg-white pt-10 shadow-sm lg:w-[400px]">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
