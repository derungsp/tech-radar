import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const LogoutLink = () => {
  const router = useRouter();

  const logout = async () => {
    toast.promise(
      (async () => {
        await signOut({ redirect: false });
        router.push('/');
        router.refresh();
        return 'Logged out successfully!';
      })(),
      {
        loading: 'Logging out...',
        success: 'Logged out successfully!',
        error: 'Error while logging out',
      },
    );
  };

  return (
    <button className="text-red-500" onClick={logout}>
      Logout
    </button>
  );
};
