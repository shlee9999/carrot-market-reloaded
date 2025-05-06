'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import SocialLogin from '@/components/social-login';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  console.log(state);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2>Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='username'
          required
          type='text'
          placeholder='Username'
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
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
          minLength={4}
        />
        <Input
          name='confirm_password'
          required
          type='password'
          placeholder='Confirm Password'
          errors={state?.fieldErrors.confirm_password}
          minLength={4}
        />
        <Button text='Create account' />
      </form>
      <SocialLogin />
    </div>
  );
}
