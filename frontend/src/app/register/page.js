'use client';
import { MdOutlineWavingHand } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { useState } from 'react';

export default function Page() {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isShowingRetyped, setIsShowingRetyped] = useState(false);

  const toggleVisibility = (setter) => {
    setter((prevState) => !prevState);
  };

  return (
    <div className="w-screen h-screen flex">
      <div
        className={'w-1/2 flex flex-col justify-center items-start p-64 gap-8'}
      >
        <div className={'flex flex-col gap-2'}>
          <span className={'text-3xl font-bold'}>Register</span>
          <span className={'text-xl'}>
            Sign Up to Store and Access Files Anywhere
          </span>
        </div>
        <div className={'flex flex-col w-full gap-2'}>
          <span className={'font-bold'}>Email</span>
          <Input placeholder={'Email'} />
        </div>
        <div className={'flex flex-col w-full gap-2'}>
          <span className={'font-bold'}>Password</span>
          <div className={'flex gap-2 relative'}>
            <Input
              placeholder={'Password'}
              type={isShowingPassword ? 'text' : 'password'}
            />
            <div
              tabIndex={-1}
              className={
                'absolute right-0 top-0 -translate-x-1/2 translate-y-1/2 '
              }
              onClick={() => toggleVisibility(setIsShowingPassword)}
            >
              {isShowingPassword ? (
                <FaRegEyeSlash size={18} />
              ) : (
                <FaRegEye size={18} />
              )}
            </div>
          </div>
        </div>
        <div className={'flex flex-col w-full gap-2'}>
          <span className={'font-bold'}>Re-typed Password</span>
          <div className={'flex gap-2 relative'}>
            <Input
              className={''}
              placeholder={'Re-typed Password'}
              type={isShowingRetyped ? 'text' : 'password'}
            />
            <div
              tabIndex={-1}
              className={
                'absolute right-0 top-0 -translate-x-1/2 translate-y-1/2 '
              }
              onClick={() => toggleVisibility(setIsShowingRetyped)}
            >
              {isShowingRetyped ? (
                <FaRegEyeSlash size={18} />
              ) : (
                <FaRegEye size={18} />
              )}
            </div>
          </div>
        </div>
        <div className={'flex flex-col w-full gap-4'}>
          <span>
            Already have an account?
            <Link href={'/'} className={'text-blue-500'}>
              {' '}
              Login.
            </Link>
          </span>
          <Button className={'w-full font-bold'}>Register</Button>
        </div>
      </div>
      <div className={'bg-tertiary w-1/2'}>
        <div
          className={
            'w-full h-full flex justify-center items-center flex-col text-white gap-8'
          }
        >
          <MdOutlineWavingHand className={'w-1/4 h-1/4'} />
          <span className={'text-5xl font-bold'}>Welcome</span>
        </div>
      </div>
    </div>
  );
}
