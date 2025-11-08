import mongoose from 'mongoose';
import { parsedEnv } from '@configs/env.config';
import { safeAsync } from '@utils/safeAsync';

const mongoUri = parsedEnv.MONGO_URI;
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const connection = await safeAsync(
    mongoose.connect(mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    }),
  );

  if (!connection.success) {
    throw new Error('Failed to connect to MongoDB');
  }

  isConnected = true;

  // eslint-disable-next-line no-console
  console.log('MongoDB connected successfully');

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    // eslint-disable-next-line no-console
    console.log('MongoDB disconnected');
  });

  return mongoose.connection;
};
