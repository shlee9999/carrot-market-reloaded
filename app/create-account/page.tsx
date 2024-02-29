import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

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
        <FormButton text='Create account' loading={false} />
      </form>
      <SocialLogin />
    </div>
  );
}
