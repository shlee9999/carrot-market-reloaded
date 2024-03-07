'use client';
import Input from '@/components/form-input';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { handleLogin } from './login';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(handleLogin, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2>Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input name='email' required type='email' placeholder='Email' />
        <Input
          name='password'
          required
          type='password'
          placeholder='Password'
          errors={state?.fieldErrors.password}
          minLength={4}
        />
      </form>
      <div className='w-full h-px bg-neutral-500' />
      <div>
        <Link
          className='primary-btn flex h-10 items-center justify-center gap-3'
          href='/sms'
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className='size-6' />
          </span>
          <span>Sign up with SNS</span>
        </Link>
      </div>
    </div>
  );
}
