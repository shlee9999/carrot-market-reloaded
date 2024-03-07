'use client';
import Input from '@/components/input';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { useFormState } from 'react-dom';
import { handleLogin } from './login';
import SocialLogin from '@/components/social-login';
import Button from '@/components/button';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(handleLogin, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>Sign in</h1>
        <h2>Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='email'
          required
          type='email'
          placeholder='Email'
          errors={state?.fieldErrors.email}
        />
        <Input
          name='password'
          required
          type='password'
          placeholder='Password'
          errors={state?.fieldErrors.password}
        />
        <div className='w-full h-px bg-neutral-500' />
        <div>
          <Button className='flex items-center justify-center gap-2'>
            <ChatBubbleOvalLeftEllipsisIcon className='size-6' />
            Sign In
          </Button>
        </div>
      </form>

      <SocialLogin />
    </div>
  );
}
