'use client';
import { FaMixcloud, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleLogin = async () => {
    const body = getValues();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 60);
      document.cookie = `token=${response.data.token}; expires=${expirationTime.toUTCString()} path=/; SameSite=Strict`;
      router.push(`/home`);
    } catch (e) {
      if (e.status === 401) {
        setLoginErrorMessage('The username or password is incorrect');
      }
    }
  };

  return (
    <div className="w-screen h-screen inline md:flex ">
      <div className={'bg-tertiary w-full lg:w-1/2 py-32'}>
        <div
          className={
            'w-full h-full flex justify-center items-center flex-col text-white'
          }
        >
          <FaMixcloud className={'w-1/2 h-1/2 '} />
          <span className={' text-3xl lg:text-5xl font-bold'}>
            Cloud Storage
          </span>
        </div>
      </div>
      <div
        className={
          'w-full lg:w-1/2 flex flex-col justify-center items-center py-32'
        }
      >
        <div className={'flex flex-col gap-6 w-1/2'}>
          <div className={'w-full flex flex-col gap-2'}>
            <span className={'text-3xl font-bold'}>Login</span>
            <span className={'text-xl'}>Seamless Access to Your Files</span>
          </div>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className={'flex flex-col w-full gap-4'}
          >
            <span className={'font-bold'}>Username</span>
            <Input
              placeholder={'Username'}
              {...register('name', { required: true })}
              className={`focus:outline-none ${errors.name ? 'border-destructive' : 'border-normal'}`}
            />
            <span className={'font-bold'}>Password</span>
            <div className={'flex gap-2 relative'}>
              <Input
                placeholder={'Password'}
                type={isShowingPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                className={`focus:outline-none ${errors.password ? 'border-destructive' : 'border-normal'}`}
              />
              <div
                tabIndex={-1}
                className={
                  'absolute right-0 top-0 -translate-x-1/2 translate-y-1/2 '
                }
                onClick={() => setIsShowingPassword((prevState) => !prevState)}
              >
                {isShowingPassword ? (
                  <FaRegEyeSlash size={18} />
                ) : (
                  <FaRegEye size={18} />
                )}
              </div>
            </div>
            <span className={'text-destructive'}>{loginErrorMessage}</span>
            <Button className={'w-full font-bold mt-4'} onClick={handleLogin}>
              Login
            </Button>
            <span>
              Don&#39;t have an account?
              <Link href={'/register'} className={'text-blue-500'}>
                {' '}
                Register.
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
