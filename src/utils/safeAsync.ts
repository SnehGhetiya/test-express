import { AppError } from './AppError';

export async function safeAsync<T = unknown>(
  promise: Promise<T>,
  message = 'Operation failed',
  statusCode = 500,
): Promise<{ success: true; data: T } | { success: false; error: AppError }> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (err) {
    let error: AppError;

    if (err instanceof AppError) {
      error = err;
    } else if (err instanceof Error) {
      error = new AppError(`${message}: ${err.message}`, statusCode);
    } else {
      error = new AppError(message, statusCode);
    }

    return { success: false, error };
  }
}
