import * as z from 'zod';

export const envSchema = z.object({
  PORT: z.string().min(1),
  MONGO_URI: z.string().min(1),
});
