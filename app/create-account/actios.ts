'use server';
import { z } from 'zod';

function checkUsername(username: string) {
  return !username.includes('potato');
}
function checkPassword(password: string, confirm_password: string) {
  return password === confirm_password;
}
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Username must be a string!',
        required_error: 'Where is my username?????',
      })
      .min(5, 'Way too short!!!')
      .max(10, 'That is too looooong!')
      .refine((username) => checkUsername(username), 'No potatoes allowed!'),
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
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
  console.log(data);
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
}
