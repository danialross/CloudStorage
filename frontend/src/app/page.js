'use client';
import { FaMixcloud, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { register, handleSubmit, errors } = useForm();
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const handleLogin = async () => {
    const body = { name: usernameInput, password: passwordInput };
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL,
        body,
      );
      const timeNow = new Date();
      const expirationDate = timeNow.getMinutes() + 60;
      document.cookie = `token=${response.data.token}; expires=${expirationDate.toUTCString()} path=/; SameSite=Strict`;
    } catch (e) {
      console.error(e.message);
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
          'w-full lg:w-1/2 flex flex-col justify-center items-center py-32 '
        }
      >
        <div className={'flex flex-col gap-8 w-1/2'}>
          <div className={'w-full flex flex-col gap-2'}>
            <span className={'text-3xl font-bold'}>Login</span>
            <span className={'text-xl'}>Seamless Access to Your Files</span>
          </div>
          {/*<form onSubmit={handleSubmit(handleLogin)}>*/}
          <div className={'flex flex-col w-full gap-2'}>
            <span className={'font-bold'}>Username</span>
            <Input
              placeholder={'Username'}
              {...register('name', { required: true })}
            />
          </div>
          <div className={'flex flex-col w-full gap-2'}>
            <span className={'font-bold'}>Password</span>
            <div className={'flex gap-2 relative'}>
              <Input
                placeholder={'Password'}
                type={isShowingPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
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
          </div>

          <div className={'flex flex-col w-full gap-4'}>
            <span>
              Don&#39;t have an account?
              <Link href={'/register'} className={'text-blue-500'}>
                {' '}
                Register.
              </Link>
            </span>
            <Button className={'w-full font-bold'} onClick={handleLogin}>
              Login
            </Button>
          </div>
          {/*</form>*/}
        </div>
      </div>
    </div>
  );
}
