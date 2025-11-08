import { createUserService } from '@services/user.service';
import type { NextFunction, Request, Response } from 'express';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
