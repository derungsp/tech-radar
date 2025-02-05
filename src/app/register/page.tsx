import { Metadata } from 'next';
import { getServerAuthSession } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { LoginPageButton } from '../_components/route-buttons';
import RegisterForm from '../_components/register/register-form';

export const metadata: Metadata = {
  title: 'Register',
};

export default async function RegisterPage() {
  const session = await getServerAuthSession();
  if (session) {
    redirect('/technologies');
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div>
        <LoginPageButton />
        <div className="flex flex-col items-center justify-center gap-8 rounded-lg border bg-white pt-10 shadow-sm lg:w-[400px]">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
