const formatError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  return new Error(String(error || "An unknown error occurred"));
};

const makeAsyncTask = <T>(task: () => T): Promise<T> => {
  let timerId: NodeJS.Timeout | null = null;

  return new Promise<T>((resolve, reject) => {
    try {
      timerId = setTimeout(() => {
        try {
          const result = task?.();
          resolve(result);
        } catch (error) {
          reject(formatError(error));
        } finally {
          if (timerId) {
            clearTimeout(timerId);
            timerId = null;
          }
        }
      }, 0);
    } catch (outerError) {
      reject(formatError(outerError));
    }
  });
};

export default makeAsyncTask;
