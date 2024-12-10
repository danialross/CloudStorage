'use client';
import { BsExclamationTriangle } from 'react-icons/bs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams(); // This gives you a URLSearchParams object
  const status = searchParams.get('status');
  const message =
    status === '200'
      ? 'You’re already logged in. Redirecting to your dashboard...'
      : status === '401'
        ? 'You need to be logged in to access this page. Redirecting to the login page...'
        : status === '404'
          ? "Oops! The page you’re looking for doesn't exist. You’re being redirected shortly... "
          : 'An unexpected error occurred. Redirecting you to the login page...';

  useEffect(() => {
    const getRedirectLink = async () => {
      //for 404 error, redirect to login page or home page based on if logged in or not
      if (status === '404') {
        try {
          await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              withCredentials: true,
            },
          );
          //if nothing goes wrong then auth is verified
          return '/home';
        } catch (e) {
          return '/';
        }
      } else if (status === '200') {
        return '/home';
      } else {
        return '/';
      }
    };

    async function redirectUser() {
      setTimeout(async () => {
        // if the request does not resolve within 3 seconds, send user to login page
        const link = (await getRedirectLink()) || '/';
        router.push(link);
      }, 3000);
    }

    redirectUser();
  }, []);
  return (
    <div
      className={
        ' bg-tertiary w-screen h-screen flex flex-col justify-center items-center gap-8'
      }
    >
      <BsExclamationTriangle size={200} className={'text-white text-4xl'} />
      <span className={'text-lg lg:text-3xl text-center font-bold text-white'}>
        {message}
      </span>
    </div>
  );
}
