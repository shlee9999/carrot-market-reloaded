import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CreateAccount() {
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2>Fill in the form below to join!</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <FormInput required type='text' placeholder='Username' errors={['']} />
        <FormInput required type='email' placeholder='Email' errors={['']} />
        <FormInput
          required
          type='password'
          placeholder='Password'
          errors={['']}
        />
        <FormInput
          required
          type='password'
          placeholder='Confirm Password'
          errors={[' ']}
        />
        <FormButton text='Create account' loading={true} />
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
