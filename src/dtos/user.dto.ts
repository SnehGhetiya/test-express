import * as z from 'zod';

export const createUserDTO = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
