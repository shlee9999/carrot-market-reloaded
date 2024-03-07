import { InputHTMLAttributes } from 'react';

interface FormInputProps {
  name: string;
  errors?: string[];
}
export default function Input({
  errors = [],
  name,
  ...rest // extraProps
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        name={name}
        className='bg-transparent rounded-md w-full 
                   h-10 focus:outline-none ring-2 focus:ring-4
                 ring-neutral-200 focus:ring-orange-500 border-none
                 placeholder:text-neutral-400 transition-shadoww'
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className='text-red-500'>
          {error}
        </span>
      ))}
    </div>
  );
}
