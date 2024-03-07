'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsVerification } from './actions';

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsVerification, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Login</h1>
        <h2>Verify your phone number.</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          required
          type='number'
          placeholder='Phone number'
          errors={['']}
          name='phone_number'
        />
        <Input
          required
          type='number'
          placeholder='Verification Code'
          errors={['']}
          name='verification_code'
        />
        <Button text='Verify' />
      </form>
    </div>
  );
}
