import type { createUserDTO } from '@dtos/user.dto';
import UserModel from '@models/user.model';
import { AppError } from '@utils/AppError';
import { safeAsync } from '@utils/safeAsync';
import * as z from 'zod';

export const createUserService = async (
  user: z.infer<typeof createUserDTO>,
) => {
  const isUserExist = await UserModel.findOne({ email: user.email });

  if (isUserExist) {
    throw new AppError('User already exists', 400);
  }

  const newUser = new UserModel(user);

  const savedUser = await safeAsync(newUser.save());

  if (!savedUser.success) {
    throw new AppError(savedUser.error.message, savedUser.error.statusCode);
  }

  return savedUser.data;
};
