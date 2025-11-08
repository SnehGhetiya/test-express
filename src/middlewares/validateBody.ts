import * as z from 'zod';
import type { NextFunction, Request, Response } from 'express';

export const validateBody =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          errors: z.flattenError(error),
        });
      }
      next(error);
    }
  };
