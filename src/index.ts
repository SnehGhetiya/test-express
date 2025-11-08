import { connectDB } from '@configs/db.config';
import { parsedEnv } from '@configs/env.config';
import { errorHandler } from '@middlewares/errorHandler';
import userRouter from '@routes/user.route';
import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = Number(parsedEnv.PORT);

await connectDB();

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);
app.use(express.json());
app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is 🚀 running on port ${PORT}`);
});
