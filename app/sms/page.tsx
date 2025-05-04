'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogin } from './actions';

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  console.log(state);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Login</h1>
        <h2>Verify your phone number.</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        {state.token ? (
          <Input
            required
            type='number'
            placeholder='Verification Code'
            errors={state.error}
            name='token'
          />
        ) : (
          <Input
            required
            type='number'
            placeholder='Phone number'
            errors={state.error}
            name='phone'
          />
        )}
        <Button text={state.token ? 'Verify' : 'Send VerificationSMS'} />
      </form>
    </div>
  );
}
