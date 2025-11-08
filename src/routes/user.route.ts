import { createUserController } from '@controllers/user.controller';
import { createUserDTO } from '@dtos/user.dto';
import { validateBody } from '@middlewares/validateBody';
import express from 'express';

const router = express.Router();

router.post('/', validateBody(createUserDTO), createUserController);

export default router;
