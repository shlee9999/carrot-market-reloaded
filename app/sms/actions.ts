'use server';
import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

// 하나씩 검증 -> filedErrors 배열로 반환하지 않고, formErrors 배열로 반환
const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    'Wrong phone format'
  );

const tokenSchema = z.coerce
  .number()
  .min(100000, '6자리 인증번호를 입력해주세요')
  .max(999999, '6자리 인증번호를 입력해주세요'); // coerce: string to number 변환 시도

interface ActionState {
  token: boolean;
  error?: string[];
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  //* 함수가 이전에 return했던 값이 prevState에 들어오게 된다.
  const phone = formData.get('phone');
  const token = formData.get('token');
  if (!prevState.token) {
    //* 폰번호 형식 검증
    console.log('phone', phone);
    console.log('token', token);
    const result = phoneSchema.safeParse(phone); // 폰번호 형식 검증.
    console.log('result', result);

    //* 폰번호 형식 검증 실패 시
    if (!result.success) {
      console.log(result.error.flatten());
      return {
        token: false, // 폰번호 형식 검증 실패 시
        error: result.error.flatten().formErrors,
      };
    } else {
      //* 폰번호 형식 검증 성공 시
      return {
        token: true,
      };
    }
  }
  //* 토큰 형식 검증
  const result = tokenSchema.safeParse(token);
  if (!result.success) {
    //* 토큰 형식 검증 실패 시
    return {
      token: true, //? 토큰 input을 지우지 않을 것이므로
      error: result.error.flatten().formErrors,
    };
  } else {
    //* 토큰 형식 검증 성공 시
    return redirect('/');
  }
}
