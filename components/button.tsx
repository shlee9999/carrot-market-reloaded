'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text?: string;
  children?: ReactNode;
}
export default function Button({
  text,
  children,
  className,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`primary-btn h-10 disabled:bg-neutral-400
       disabled:text-neutral-300 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {pending ? '로딩 중' : text}
      {text ? text : children}
    </button>
  );
}
