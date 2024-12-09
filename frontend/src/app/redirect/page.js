'use client';
import { BsExclamationTriangle } from 'react-icons/bs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams(); // This gives you a URLSearchParams object
  const status = searchParams.get('status');
  const message =
    status === '200'
      ? 'You are logged in! Redirecting to your dashboard...'
      : status === '401'
        ? 'You are not logged in. Redirecting to the login page...'
        : 'Unknown error, Redirecting to the login page...';

  const link = status === '200' ? '/home' : status === '401' ? '/' : null;

  useEffect(() => {
    setTimeout(() => router.push(link), 3000);
  }, []);
  return (
    <div
      className={
        ' bg-tertiary w-screen h-screen flex flex-col justify-center items-center gap-8'
      }
    >
      <BsExclamationTriangle size={400} className={'text-white'} />
      <span className={'text-5xl font-bold text-white'}>{message}</span>
    </div>
  );
}
