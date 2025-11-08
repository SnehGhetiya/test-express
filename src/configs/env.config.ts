import { envSchema } from '@schemas/env.schema';
import dotenv from 'dotenv';
import * as z from 'zod';

dotenv.config();

try {
  envSchema.parse(process.env as unknown as z.infer<typeof envSchema>);
} catch (error) {
  if (error instanceof z.ZodError) {
    // eslint-disable-next-line no-console
    console.error(
      'Environment variables validation error: ',
      z.treeifyError(error),
    );
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.error('Unknown environment validation error occurred');
  process.exit(1);
}

export const parsedEnv = envSchema.parse(process.env);
