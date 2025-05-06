'use server';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';

const checkUsername = (username: string) => {
  return !username.includes('potato');
};
const checkPassword = (password: string, confirm_password: string) => {
  return password === confirm_password;
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Username must be a string!',
        required_error: 'Where is my username?????',
      })
      // .min(5, 'Way too short!!!')
      .max(10, 'That is too looooong!')
      .toLowerCase()
      .trim()
      // .transform((username) => `🔥${username}🔥`)
      .refine((username) => checkUsername(username), 'No potatoes allowed!')
      .refine(
        (username) => checkUniqueUsername(username),
        '이미 존재하는 username입니다!'
      ),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(
        (email) => checkUniqueEmail(email),
        '이미 존재하는 이메일입니다!'
      ),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(
    ({ password, confirm_password }) =>
      checkPassword(password, confirm_password), // 조건을 넣는다. (ex: password는 confirm_password와 같아야 하므로 password === confirm_password)
    {
      message: 'Both passwords should be the same!',
      path: ['confirm_password'], // formErrors에서 confirm_password fieldError로 넘겨준다.
    }
  );

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  // console.log(data);
  const result = await formSchema.safeParseAsync(data); // 모든 refine 함수에 대해 async 처리
  //* validation 실패 시
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
  //* validation 성공 시

  // username 이미 존재하는지 확인
  // 이메일 이미 존재하는지 확인
  // 비밀번호 해싱
  // user db에 저장
  // user 로그인
  // home으로 리다이렉트
}
